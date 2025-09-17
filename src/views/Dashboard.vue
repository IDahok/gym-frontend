<template>
  <div>
    <h3>Dashboard</h3>
    <b-row>
      <b-col md="3" v-for="c in cards" :key="c.label" class="mb-3">
        <b-card class="text-left">
          <small class="gm-kpi-label">{{ c.subtitle }}</small>
          <div class="d-flex align-items-center mt-1">
            <div class="gm-kpi-value mr-2">{{ c.value }}</div>
            <b-badge :variant="c.trend > 0 ? 'success' : 'danger'" pill>{{ c.trend > 0 ? '+' : '' }}{{ c.trend }}%</b-badge>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6" class="mb-3">
        <b-card title="Check-ins Semanais" class="bg-white">
          <apexchart type="line" height="180" :options="lineOptions" :series="lineSeries" />
        </b-card>
      </b-col>
      <b-col md="6" class="mb-3">
        <b-card title="Distribuição de Vendas" class="bg-white">
          <apexchart type="donut" height="180" :options="donutOptions" :series="donutSeries" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import VueApexCharts from 'vue-apexcharts';
export default {
  components: { apexchart: VueApexCharts },
  data: () => ({
    cards: [
      { label: 'Alunos Totais', subtitle: 'Total de alunos', value: 0, trend: 0 },
      { label: 'Ativos', subtitle: 'Alunos ativos', value: 0, trend: 0 },
      { label: 'Inadimplentes', subtitle: 'Em atraso', value: 0, trend: 0 },
      { label: 'Pendentes', subtitle: 'Pendências', value: 0, trend: 0 }
    ],
    lineOptions: {
      chart: { toolbar: { show: false }, sparkline: { enabled: true } },
      stroke: { curve: 'smooth', width: 3 },
      colors: ['#10B981'],
      grid: { show: false },
      xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { show: false }
    },
    lineSeries: [{ name: 'Check-ins', data: [10, 14, 13, 18, 16, 22, 20] }],
    donutOptions: { labels: ['Vestuário', 'Eletrônicos', 'Alimentos', 'Outros'], legend: { show: false }, colors: ['#1E3A8A','#10B981','#F97316','#9CA3AF'] },
    donutSeries: [35, 25, 20, 20]
  }),
  async created() {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/api/reports/summary', { headers: { Authorization: `Bearer ${token}` } });
    this.cards = [
      { label: 'Alunos Totais', subtitle: 'Total de alunos', value: data.totalStudents, trend: 12 },
      { label: 'Ativos', subtitle: 'Alunos ativos', value: data.activeStudents, trend: 5 },
      { label: 'Inadimplentes', subtitle: 'Em atraso', value: data.delinquent, trend: -4 },
      { label: 'Pendentes', subtitle: 'Pendências', value: data.pending, trend: -1 }
    ];
  }
}
</script>


