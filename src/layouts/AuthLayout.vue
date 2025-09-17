<template>
  <div :class="['d-flex align-items-center justify-content-center', isDark ? 'gm-dark' : '']" style="min-height:100vh; background: var(--gm-color-bg);">
    <b-card style="max-width: 420px; width: 100%;" class="p-3">
      <div class="text-center mb-3">
        <div style="font-size:32px">🏋️</div>
        <h4 class="mt-2" style="color: var(--gm-color-primary)">Academia</h4>
      </div>
      <router-view />
      <div class="text-center mt-3">
        <b-button size="sm" variant="outline-secondary" @click="toggleTheme">{{ isDark ? 'Modo claro' : 'Modo escuro' }}</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  computed: { isDark() { return this.$store.getters.isDark; } },
  methods: { toggleTheme() { this.$store.commit('toggleDark'); } }
}
</script>


