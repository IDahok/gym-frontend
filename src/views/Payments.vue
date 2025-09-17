<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Pagamentos</h3>
      <b-button variant="primary" @click="openModal()">Novo Pagamento</b-button>
    </div>
    <b-form inline class="mb-3" @submit.prevent="load">
      <b-form-select v-model="status" :options="statusOptions" class="mr-2" />
      <b-button type="submit" variant="secondary">Filtrar</b-button>
    </b-form>
    <b-table :items="items" :fields="fields" small bordered responsive class="bg-white">
      <template #cell(actions)="{ item }">
        <b-button size="sm" variant="warning" @click="openModal(item)">Editar</b-button>
        <b-button size="sm" variant="danger" class="ml-2" @click="remove(item)">Excluir</b-button>
      </template>
    </b-table>

    <b-modal v-model="show" title="Pagamento" @hide="reset">
      <b-form @submit.prevent="save">
        <b-form-group label="Aluno ID"><b-form-input v-model="form.student_id" required /></b-form-group>
        <b-form-group label="Plano ID"><b-form-input v-model="form.plan_id" required /></b-form-group>
        <b-form-group label="Valor"><b-form-input v-model.number="form.amount" type="number" step="0.01" required /></b-form-group>
        <b-form-group label="Status">
          <b-form-select v-model="form.status" :options="statusOptions" />
        </b-form-group>
        <b-form-group label="Vencimento">
          <b-form-input v-model="form.due_date" type="date" required />
        </b-form-group>
        <b-form-group label="Pago em">
          <b-form-input v-model="form.paid_at" type="datetime-local" />
        </b-form-group>
        <div class="text-right">
          <b-button type="submit" variant="primary">Salvar</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    items: [], show: false, status: '',
    statusOptions: [
      { value: '', text: 'Todos' },
      { value: 'pago', text: 'Pago' },
      { value: 'pendente', text: 'Pendente' },
      { value: 'atrasado', text: 'Atrasado' }
    ],
    form: { id: null, student_id: '', plan_id: '', amount: 0, status: 'pendente', due_date: '', paid_at: '' },
    fields: [
      { key: 'student_id', label: 'Aluno' },
      { key: 'plan_id', label: 'Plano' },
      { key: 'amount', label: 'Valor' },
      { key: 'status', label: 'Status' },
      { key: 'due_date', label: 'Vencimento' },
      { key: 'paid_at', label: 'Pago em' },
      { key: 'actions', label: 'Ações' }
    ]
  }),
  created() { this.load(); },
  methods: {
    async load() {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/payments', { params: { status: this.status || undefined }, headers: { Authorization: `Bearer ${token}` } });
      this.items = data;
    },
    openModal(item) { this.show = true; if (item) this.form = { ...item }; },
    reset() { this.form = { id: null, student_id: '', plan_id: '', amount: 0, status: 'pendente', due_date: '', paid_at: '' }; },
    async save() {
      const token = localStorage.getItem('token');
      if (this.form.id) await axios.put(`/api/payments/${this.form.id}`, this.form, { headers: { Authorization: `Bearer ${token}` } });
      else await axios.post('/api/payments', this.form, { headers: { Authorization: `Bearer ${token}` } });
      this.show = false; this.reset(); this.load();
    },
    async remove(item) {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/payments/${item.id}`, { headers: { Authorization: `Bearer ${token}` } });
      this.load();
    }
  }
}
</script>


