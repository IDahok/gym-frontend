<template>
  <div>
    <h4 class="mb-3">Criar conta</h4>
    <b-form @submit.prevent="onSubmit">
          <b-form-group label="Nome">
            <b-form-input v-model="name" :state="nameState" required />
            <b-form-invalid-feedback>Informe seu nome.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="E-mail">
            <b-form-input v-model="email" type="email" :state="emailState" required />
            <b-form-invalid-feedback>E-mail inválido.</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Senha">
            <b-form-input v-model="password" type="password" :state="passwordState" required />
            <b-form-invalid-feedback>Senha deve ter pelo menos 6 caracteres.</b-form-invalid-feedback>
          </b-form-group>
          <b-button type="submit" variant="primary" block :disabled="loading">
            {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
          </b-button>
          <b-button variant="link" block @click="$router.push('/login')">Já tenho conta</b-button>
    </b-form>
    <b-alert variant="danger" :show="error" class="mt-3">{{ error }}</b-alert>
  </div>
</template>

<script>
export default {
  data: () => ({ name: '', email: '', password: '', loading: false, error: '' }),
  computed: {
    nameState() { return this.name.length > 0 ? true : null; },
    emailState() { return /.+@.+\..+/.test(this.email) ? true : (this.email ? false : null); },
    passwordState() { return this.password.length >= 6 ? true : (this.password ? false : null); }
  },
  methods: {
    async onSubmit() {
      this.loading = true; this.error = '';
      try {
        await this.$store.dispatch('register', { name: this.name, email: this.email, password: this.password });
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        this.$router.push('/');
      } catch (e) {
        const status = e?.response?.status;
        const msg = e?.response?.data?.message;
        if (status === 409) this.error = 'E-mail já cadastrado.';
        else if (status === 400) this.error = msg || 'Dados inválidos.';
        else this.error = msg || 'Falha no cadastro';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>


