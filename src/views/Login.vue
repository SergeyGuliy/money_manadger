<template>
  <form class="card auth-card" v-on:submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title center">Вход в домашнюю бухгалтерию</span>
      <div class="input-field">
        <input
                  id="email"
                  type="text"
                  v-model.trim="email"
                  v-bind:class="{invalid: (!this.$v.email.required || !this.$v.email.email)}">
        <label for="email">Email</label>
        <small
                  class="helper-text invalid"
                  v-if="(!$v.email.required)"
        >Поле Email недолжно быть пустым</small>
        <small
                  class="helper-text invalid"
                  v-else-if="(!$v.email.email)"
        >Введите коректный Email</small>
      </div>
      <div class="input-field">
        <input
                  id="password"
                  type="password"
                  v-model.trim="password"
                  v-bind:class="{invalid: (!this.$v.password.required || !this.$v.password.minLength || !this.$v.password.maxLength)}">
        <label for="password">Пароль</label>
        <small
                  class="helper-text invalid"
                  v-if="(!$v.password.required)"
        >Введите пароль</small>
        <small
                  class="helper-text invalid"
                  v-else-if="(!$v.password.minLength)"
        >Пародь должен иметь 8 знаков и более</small>
        <small
                  class="helper-text invalid"
                  v-else-if="(!$v.password.maxLength)"
        >Пароль не может быть длинее 12 знаков</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn auth-submit top" type="submit" v-bind:class="{disabled: ((!this.$v.email.required || !this.$v.email.email) || (!this.$v.password.required || !this.$v.password.minLength || !this.$v.password.maxLength))}">Войти
          <i class="material-icons right">send</i>
        </button>
        <router-link to="/registration" class="btn auth-submit">Зарегистрироваться
          <i class="material-icons right">send</i>
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
import { email, required, minLength, maxLength } from 'vuelidate/lib/validators'
import messages from '../plagins/messages'
export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: { email, required },
    password: { minLength: minLength(8), maxLength: maxLength(12), required }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formDataLogin = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formDataLogin)
        this.$router.push('/')
      } catch (e) {
      }
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  }
}
</script>

<style scoped lang="stylus">
  button.btn.top
    margin-bottom 10px
</style>
