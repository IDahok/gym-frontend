<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Produtos</h3>
      <b-button variant="primary" @click="openModal()" v-if="isAdmin">Novo Produto</b-button>
    </div>
    <b-table :items="items" :fields="fields" small bordered responsive class="bg-white">
      <template #cell(actions)="{ item }">
        <b-button size="sm" variant="warning" @click="openModal(item)" v-if="isAdmin">Editar</b-button>
        <b-button size="sm" variant="danger" class="ml-2" @click="remove(item)" v-if="isAdmin">Excluir</b-button>
      </template>
      <template #cell(price)="{ item }">
        R$ {{ Number(item.price).toFixed(2) }}
      </template>
    </b-table>

    <b-modal v-model="show" title="Produto" @hide="reset">
      <b-form @submit.prevent="save">
        <b-form-group label="Nome"><b-form-input v-model="form.name" required /></b-form-group>
        <b-form-group label="Preço"><b-form-input v-model.number="form.price" type="number" step="0.01" required /></b-form-group>
        <b-form-group label="Estoque"><b-form-input v-model.number="form.stock" type="number" min="0" /></b-form-group>
        <div class="text-right"><b-button type="submit" variant="primary">Salvar</b-button></div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    items: [], show: false,
    form: { id: null, name: '', price: 0, stock: 0 },
    fields: [
      { key: 'name', label: 'Nome' },
      { key: 'price', label: 'Preço' },
      { key: 'stock', label: 'Estoque' },
      { key: 'actions', label: 'Ações' }
    ]
  }),
  computed: { isAdmin() { try { const t = JSON.parse(atob(localStorage.getItem('token').split('.')[1])); return t.role === 'admin'; } catch { return false; } } },
  created() { this.load(); },
  methods: {
    async load() { const { data } = await axios.get('/api/products', this.auth()); this.items = data; },
    openModal(item) { this.show = true; if (item) this.form = { ...item }; },
    reset() { this.form = { id: null, name: '', price: 0, stock: 0 }; },
    async save() {
      if (this.form.id) await axios.put(`/api/products/${this.form.id}`, this.form, this.auth());
      else await axios.post('/api/products', this.form, this.auth());
      this.show = false; this.reset(); this.load();
    },
    async remove(item) { await axios.delete(`/api/products/${item.id}`, this.auth()); this.load(); },
    auth() { const token = localStorage.getItem('token'); return { headers: { Authorization: `Bearer ${token}` } }; }
  }
}
</script>


