<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Funcionários</h3>
      <b-button variant="primary" @click="openModal()" v-if="isAdmin">Novo Funcionário</b-button>
    </div>
    <b-table :items="items" :fields="fields" small bordered responsive class="bg-white">
      <template #cell(actions)="{ item }">
        <b-button size="sm" variant="warning" @click="openModal(item)" v-if="isAdmin">Editar</b-button>
        <b-button size="sm" variant="danger" class="ml-2" @click="remove(item)" v-if="isAdmin">Excluir</b-button>
      </template>
    </b-table>

    <b-modal v-model="show" title="Funcionário" @hide="reset">
      <b-form @submit.prevent="save">
        <b-form-group label="User ID"><b-form-input v-model="form.user_id" required /></b-form-group>
        <b-form-group label="Nome"><b-form-input v-model="form.name" required /></b-form-group>
        <b-form-group label="E-mail"><b-form-input v-model="form.email" type="email" required /></b-form-group>
        <b-form-group label="Função">
          <b-form-select v-model="form.role" :options="roles" />
        </b-form-group>
        <b-form-group label="Telefone"><b-form-input v-model="form.phone" /></b-form-group>
        <b-form-group label="Avatar URL"><b-form-input v-model="form.avatar_url" /></b-form-group>
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
    form: { id: null, user_id: '', name: '', email: '', role: 'colaborador', phone: '', avatar_url: '' },
    roles: [
      { value: 'colaborador', text: 'Colaborador' },
      { value: 'admin', text: 'Administrador' }
    ],
    fields: [
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'E-mail' },
      { key: 'role', label: 'Função' },
      { key: 'phone', label: 'Telefone' },
      { key: 'actions', label: 'Ações' }
    ]
  }),
  computed: { isAdmin() { try { const t = JSON.parse(atob(localStorage.getItem('token').split('.')[1])); return t.role === 'admin'; } catch { return false; } } },
  created() { this.load(); },
  methods: {
    async load() { const { data } = await axios.get('/api/employees', this.auth()); this.items = data; },
    openModal(item) { this.show = true; if (item) this.form = { ...item }; },
    reset() { this.form = { id: null, user_id: '', name: '', email: '', role: 'colaborador', phone: '', avatar_url: '' }; },
    async save() {
      if (this.form.id) await axios.put(`/api/employees/${this.form.id}`, this.form, this.auth());
      else await axios.post('/api/employees', this.form, this.auth());
      this.show = false; this.reset(); this.load();
    },
    async remove(item) { await axios.delete(`/api/employees/${item.id}`, this.auth()); this.load(); },
    auth() { const token = localStorage.getItem('token'); return { headers: { Authorization: `Bearer ${token}` } }; }
  }
}
</script>


