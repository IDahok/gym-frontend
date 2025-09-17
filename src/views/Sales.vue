<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Vendas</h3>
      <b-button variant="primary" @click="openModal()">Nova Venda</b-button>
    </div>
    <b-table :items="items" :fields="fields" small bordered responsive class="bg-white">
      <template #cell(total)="{ item }">
        R$ {{ Number(item.total).toFixed(2) }}
      </template>
    </b-table>

    <b-modal v-model="show" title="Nova Venda" @hide="reset" size="lg">
      <div class="d-flex">
        <div class="flex-fill pr-3">
          <b-form-group label="Produto">
            <b-form-select v-model="selectedProduct" :options="productOptions" />
          </b-form-group>
          <b-form-group label="Quantidade">
            <b-form-input v-model.number="quantity" type="number" min="1" />
          </b-form-group>
          <b-form-group label="Desconto (R$)">
            <b-form-input v-model.number="discount" type="number" min="0" step="0.01" />
          </b-form-group>
          <b-button variant="secondary" @click="addItem">Adicionar</b-button>
        </div>
        <div class="flex-fill">
          <h5>Itens</h5>
          <ul>
            <li v-for="(it, idx) in cart" :key="idx">{{ it.name }} x{{ it.quantity }} - R$ {{ (it.unit_price*it.quantity).toFixed(2) }}</li>
          </ul>
          <b-form-group label="Forma de pagamento">
            <b-form-select v-model="payment_method_id" :options="paymentOptions" />
          </b-form-group>
          <div class="text-right font-weight-bold">Total: R$ {{ total.toFixed(2) }}</div>
          <div class="text-right mt-2"><b-button variant="primary" @click="save">Finalizar</b-button></div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    items: [], show: false,
    products: [], productOptions: [], selectedProduct: '', quantity: 1,
    cart: [],
    paymentMethods: [], paymentOptions: [], payment_method_id: '',
    discount: 0,
    fields: [
      { key: 'id', label: 'ID' },
      { key: 'total', label: 'Total' },
      { key: 'created_at', label: 'Data' }
    ]
  }),
  computed: {
    total() { const subtotal = this.cart.reduce((a, it) => a + it.unit_price * it.quantity, 0); return Math.max(0, subtotal - Number(this.discount || 0)); }
  },
  created() { this.load(); },
  methods: {
    auth() { const token = localStorage.getItem('token'); return { headers: { Authorization: `Bearer ${token}` } }; },
    async load() {
      const [sales, products, methods] = await Promise.all([
        axios.get('/api/sales', this.auth()),
        axios.get('/api/products', this.auth()),
        axios.get('/api/payment-methods', this.auth())
      ]);
      this.items = sales.data;
      this.products = products.data;
      this.productOptions = this.products.map(p => ({ value: p.id, text: `${p.name} (R$ ${Number(p.price).toFixed(2)})` }));
      this.paymentMethods = methods.data;
      this.paymentOptions = this.paymentMethods.filter(m => m.active).map(m => ({ value: m.id, text: m.name }));
    },
    openModal() { this.show = true; },
    reset() { this.cart = []; this.selectedProduct=''; this.quantity=1; },
    addItem() {
      const p = this.products.find(x => x.id === this.selectedProduct);
      if (!p) return;
      this.cart.push({ product_id: p.id, name: p.name, quantity: this.quantity, unit_price: Number(p.price) });
      this.selectedProduct=''; this.quantity=1;
    },
    async save() {
      if (this.cart.length === 0) return;
      await axios.post('/api/sales', { items: this.cart, payment_method_id: this.payment_method_id, discount_total: this.discount }, this.auth());
      this.show = false; this.reset(); this.load();
    }
  }
}
</script>


