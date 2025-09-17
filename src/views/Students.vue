<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Alunos</h3>
      <b-button variant="primary" @click="openModal()">Novo Aluno</b-button>
    </div>
    <b-input-group class="mb-3">
      <b-form-input v-model="q" placeholder="Buscar por nome ou e-mail" />
      <b-input-group-append>
        <b-button @click="load" variant="secondary">Buscar</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-table :items="items" :fields="fields" small bordered responsive class="bg-white">
      <template #cell(actions)="{ item }">
        <b-button size="sm" variant="warning" @click="openModal(item)">Editar</b-button>
        <b-button size="sm" variant="danger" class="ml-2" @click="remove(item)">Excluir</b-button>
      </template>
    </b-table>

    <b-modal v-model="show" title="Aluno" @hide="reset">
      <b-form @submit.prevent="save">
        <b-form-group label="Nome"><b-form-input v-model="form.name" required /></b-form-group>
        <b-form-group label="E-mail"><b-form-input v-model="form.email" type="email" /></b-form-group>
        <b-form-group label="Telefone"><b-form-input v-model="form.phone" /></b-form-group>
        <b-form-group label="Ativo"><b-form-checkbox v-model="form.active" :value="1" :unchecked-value="0">Sim</b-form-checkbox></b-form-group>
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
    items: [], q: '', show: false,
    form: { id: null, name: '', email: '', phone: '', active: 1 },
    fields: [
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
      { key: 'phone', label: 'Telefone' },
      { key: 'active', label: 'Ativo' },
      { key: 'actions', label: 'Ações' }
    ]
  }),
  created() { this.load(); },
  methods: {
    async load() {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/students', { params: { q: this.q }, headers: { Authorization: `Bearer ${token}` } });
      this.items = data;
    },
    openModal(item) {
      this.show = true;
      if (item) this.form = { ...item };
    },
    reset() {
      this.form = { id: null, name: '', email: '', phone: '', active: 1 };
    },
    async save() {
      const token = localStorage.getItem('token');
      if (this.form.id) {
        await axios.put(`/api/students/${this.form.id}`, this.form, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post('/api/students', this.form, { headers: { Authorization: `Bearer ${token}` } });
      }
      this.show = false; this.reset(); this.load();
    },
    async remove(item) {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/students/${item.id}`, { headers: { Authorization: `Bearer ${token}` } });
      this.load();
    }
  }
}
</script>


