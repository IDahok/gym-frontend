<template>
  <div>
    <h4 class="mb-3">Entrar</h4>
    <b-form @submit.prevent="onSubmit">
          <b-form-group label="E-mail">
            <b-form-input v-model="email" type="email" required />
          </b-form-group>
          <b-form-group label="Senha">
            <b-form-input v-model="password" type="password" required />
          </b-form-group>
          <b-button type="submit" variant="primary" block :disabled="loading">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </b-button>
          <b-button variant="link" block @click="$router.push('/register')">Criar conta</b-button>
    </b-form>
    <b-alert variant="danger" :show="error" class="mt-3">{{ error }}</b-alert>
  </div>
</template>

<script>
export default {
  data: () => ({ email: '', password: '', loading: false, error: '' }),
  methods: {
    async onSubmit() {
      this.loading = true; this.error = '';
      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        this.$router.push('/');
      } catch (e) {
        const status = e?.response?.status;
        const msg = e?.response?.data?.message;
        if (status === 404) this.error = 'Usuário não registrado.';
        else if (status === 401) this.error = 'Senha incorreta.';
        else if (status === 400) this.error = 'Informe e-mail e senha.';
        else this.error = msg || 'Falha no login';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>


