<template>
  <div class="gm-topbar d-flex align-items-center justify-content-between px-3">
    <div class="d-flex align-items-center">
      <b-form-input size="sm" class="gm-search" placeholder="Buscar (Ctrl+/)" />
    </div>
    <div class="d-flex align-items-center">
      <b-button size="sm" variant="outline-secondary" class="mr-2" @click="$emit('toggle-theme')">
        <span v-if="!isDark">🌙</span>
        <span v-else>☀️</span>
      </b-button>
      <b-button size="sm" variant="outline-secondary" class="mr-2" @click="$router.push({ name: 'settings' })">⚙️</b-button>
      <b-dropdown right text="Conta" variant="outline-secondary" size="sm">
        <b-dropdown-item @click="$router.push({ name: 'profile' })">Perfil</b-dropdown-item>
        <b-dropdown-item @click="logout">Sair</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: { isDark: { type: Boolean, default: false } },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.gm-topbar { height: 64px; background: var(--gm-topbar-bg); border-bottom: 1px solid var(--gm-border); }
.gm-search { width: 260px; }
</style>


