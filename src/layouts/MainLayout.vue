<template>
  <div :class="['d-flex', isDark ? 'gm-dark' : '']">
    <Sidebar />
    <div class="flex-fill" style="min-height: 100vh;">
      <Topbar :isDark="isDark" @toggle-theme="toggleTheme" />
      <div class="container mt-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import Topbar from '../components/Topbar.vue';
export default {
  components: { Sidebar, Topbar },
  computed: { isDark() { return this.$store.getters.isDark; } },
  methods: { toggleTheme() { this.$store.commit('toggleDark'); } }
}
</script>


