<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Formas de Pagamento</h3>
      <b-button variant="primary" @click="openModal()" v-if="isAdmin">Nova Forma</b-button>
    </div>
    <b-table :items="items" :fields="fields" small bordered responsive class="bg-white">
      <template #cell(active)="{ item }">
        <b-badge :variant="item.active ? 'success' : 'danger'">{{ item.active ? 'Ativa' : 'Inativa' }}</b-badge>
      </template>
      <template #cell(actions)="{ item }">
        <b-button size="sm" variant="warning" @click="openModal(item)" v-if="isAdmin">Editar</b-button>
        <b-button size="sm" variant="danger" class="ml-2" @click="remove(item)" v-if="isAdmin">Excluir</b-button>
      </template>
    </b-table>

    <b-modal v-model="show" title="Forma de Pagamento" @hide="reset">
      <b-form @submit.prevent="save">
        <b-form-group label="Nome"><b-form-input v-model="form.name" required /></b-form-group>
        <b-form-group label="Ativa"><b-form-checkbox v-model="form.active" :value="1" :unchecked-value="0">Sim</b-form-checkbox></b-form-group>
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
    form: { id: null, name: '', active: 1 },
    fields: [
      { key: 'name', label: 'Nome' },
      { key: 'active', label: 'Status' },
      { key: 'actions', label: 'Ações' }
    ]
  }),
  computed: { isAdmin() { try { const t = JSON.parse(atob(localStorage.getItem('token').split('.')[1])); return t.role === 'admin'; } catch { return false; } } },
  created() { this.load(); },
  methods: {
    auth() { const token = localStorage.getItem('token'); return { headers: { Authorization: `Bearer ${token}` } }; },
    async load() { const { data } = await axios.get('/api/payment-methods', this.auth()); this.items = data; },
    openModal(item) { this.show = true; if (item) this.form = { ...item }; },
    reset() { this.form = { id: null, name: '', active: 1 }; },
    async save() {
      if (this.form.id) await axios.put(`/api/payment-methods/${this.form.id}`, this.form, this.auth());
      else await axios.post('/api/payment-methods', this.form, this.auth());
      this.show = false; this.reset(); this.load();
    },
    async remove(item) { await axios.delete(`/api/payment-methods/${item.id}`, this.auth()); this.load(); }
  }
}
</script>


