<template>
  <div>
    <h3>Perfil</h3>
    <b-card class="mb-3">
      <b-media>
        <template #aside>
          <b-avatar :src="form.avatar_url" size="6rem"></b-avatar>
        </template>
        <h5 class="mt-0">{{ form.name }}</h5>
        <div class="text-muted">{{ form.email }} • {{ form.role }}</div>
      </b-media>
    </b-card>
    <b-card>
      <b-form @submit.prevent="save">
        <b-form-group label="Nome"><b-form-input v-model="form.name" /></b-form-group>
        <b-form-group label="Avatar URL"><b-form-input v-model="form.avatar_url" /></b-form-group>
        <div class="text-right"><b-button type="submit" variant="primary">Salvar</b-button></div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({ form: { id: '', name: '', email: '', role: '', avatar_url: '' } }),
  created() { this.load(); },
  methods: {
    auth() { const token = localStorage.getItem('token'); return { headers: { Authorization: `Bearer ${token}` } }; },
    async load() { const { data } = await axios.get('/api/profile', this.auth()); this.form = data; },
    async save() { await axios.put('/api/profile', { name: this.form.name, avatar_url: this.form.avatar_url }, this.auth()); this.load(); }
  }
}
</script>


