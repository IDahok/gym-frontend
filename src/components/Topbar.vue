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
      <b-button size="sm" variant="outline-secondary" class="mr-2">⚙️</b-button>
      <b-avatar variant="light">A</b-avatar>
    </div>
  </div>
</template>

<script>
export default {
  props: { isDark: { type: Boolean, default: false } }
};
</script>

<style scoped>
.gm-topbar { height: 64px; background: var(--gm-topbar-bg); border-bottom: 1px solid var(--gm-border); }
.gm-search { width: 260px; }
</style>


