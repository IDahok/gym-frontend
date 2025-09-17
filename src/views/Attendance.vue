<template>
  <div>
    <h3>Presenças</h3>
    <b-form inline class="mb-3" @submit.prevent="load">
      <b-form-input v-model="student_id" placeholder="ID do aluno" class="mr-2" />
      <b-button type="submit" variant="secondary">Filtrar</b-button>
    </b-form>
    <div class="mb-3">
      <b-button variant="success" class="mr-2" @click="check('checkin')">Check-in</b-button>
      <b-button variant="danger" @click="check('checkout')">Check-out</b-button>
    </div>
    <b-table :items="items" :fields="fields" small bordered responsive class="bg-white" />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    items: [],
    student_id: '',
    fields: [
      { key: 'student_id', label: 'Aluno' },
      { key: 'type', label: 'Tipo' },
      { key: 'timestamp', label: 'Quando' }
    ]
  }),
  created() { this.load(); },
  methods: {
    async load() {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/attendance', { params: { student_id: this.student_id || undefined }, headers: { Authorization: `Bearer ${token}` } });
      this.items = data;
    },
    async check(type) {
      if (!this.student_id) return alert('Informe o ID do aluno');
      const token = localStorage.getItem('token');
      await axios.post(`/api/attendance/${type}`, { student_id: this.student_id }, { headers: { Authorization: `Bearer ${token}` } });
      this.load();
    }
  }
}
</script>


