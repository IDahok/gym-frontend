<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Planos</h3>
      <b-button variant="primary" @click="openModal()">Novo Plano</b-button>
    </div>
    <b-table :items="items" :fields="fields" small bordered responsive class="bg-white">
      <template #cell(actions)="{ item }">
        <b-button size="sm" variant="warning" @click="openModal(item)">Editar</b-button>
        <b-button size="sm" variant="danger" class="ml-2" @click="remove(item)">Excluir</b-button>
      </template>
    </b-table>

    <b-modal v-model="show" title="Plano" @hide="reset">
      <b-form @submit.prevent="save">
        <b-form-group label="Nome"><b-form-input v-model="form.name" required /></b-form-group>
        <b-form-group label="Duração (meses)"><b-form-input v-model.number="form.duration_months" type="number" min="1" required /></b-form-group>
        <b-form-group label="Preço"><b-form-input v-model.number="form.price" type="number" step="0.01" min="0" required /></b-form-group>
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
    items: [], show: false,
    form: { id: null, name: '', duration_months: 1, price: 0 },
    fields: [
      { key: 'name', label: 'Nome' },
      { key: 'duration_months', label: 'Meses' },
      { key: 'price', label: 'Preço' },
      { key: 'actions', label: 'Ações' }
    ]
  }),
  created() { this.load(); },
  methods: {
    async load() {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/plans', { headers: { Authorization: `Bearer ${token}` } });
      this.items = data;
    },
    openModal(item) { this.show = true; if (item) this.form = { ...item }; },
    reset() { this.form = { id: null, name: '', duration_months: 1, price: 0 }; },
    async save() {
      const token = localStorage.getItem('token');
      if (this.form.id) await axios.put(`/api/plans/${this.form.id}`, this.form, { headers: { Authorization: `Bearer ${token}` } });
      else await axios.post('/api/plans', this.form, { headers: { Authorization: `Bearer ${token}` } });
      this.show = false; this.reset(); this.load();
    },
    async remove(item) {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/plans/${item.id}`, { headers: { Authorization: `Bearer ${token}` } });
      this.load();
    }
  }
}
</script>


