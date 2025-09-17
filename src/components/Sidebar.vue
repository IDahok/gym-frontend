<template>
  <div class="gm-sidebar d-flex flex-column">
    <div class="gm-brand d-flex align-items-center px-3 py-3">
      <span class="gm-logo mr-2">🏋️</span>
      <strong>Academia</strong>
    </div>
    <b-nav pills vertical class="px-2">
      <b-nav-item :to="{ name: 'dashboard' }" exact>Dashboard</b-nav-item>
      <b-nav-item :to="{ name: 'students' }">Alunos</b-nav-item>
      <b-nav-item :to="{ name: 'plans' }">Planos</b-nav-item>
      <b-nav-item :to="{ name: 'attendance' }">Presenças</b-nav-item>
      <b-nav-item :to="{ name: 'payments' }">Pagamentos</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.gm-sidebar { width: 240px; background: var(--gm-sidebar-bg); border-right: 1px solid var(--gm-border); min-height: 100vh; }
.gm-brand { color: var(--gm-color-primary); font-size: 1.05rem; }
.gm-logo { font-size: 1.25rem; }
.nav-pills .nav-link { color: var(--gm-text-muted); border-radius: 8px; }
.nav-pills .nav-link.active, .nav-pills .nav-link.router-link-exact-active { background: var(--gm-pill-active-bg); color: var(--gm-pill-active-text); }
</style>


