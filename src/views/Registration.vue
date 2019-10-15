<template>
  <form class="card auth-card" v-on:submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title center">Регистрация в домашней бухгалтерие</span>
      <div class="input-field">
        <input
                  id="email"
                  type="text"
                  v-model="email"
                  v-bind:class="{invalid: ($v.email.$dirty && (!$v.email.required || !$v.email.email))}">
        <label for="email">Email</label>
        <small
                  class="helper-text invalid"
                  v-if="!$v.email.required"
        >Поле Email недолжно быть пустым</small>
        <small
                  class="helper-text invalid"
                  v-else-if="!$v.email.email"
        >Введите коректный Email</small>
      </div>
      <div class="input-field">
        <input
                  id="password"
                  type="password"
                  v-model="password"
                  v-bind:class="{invalid: ($v.password.$dirty && (!$v.password.required || !$v.password.minLength || !$v.password.maxLength))}">
        <label for="password">Пароль</label>
        <small
                  class="helper-text invalid"
                  v-if="!$v.password.required"
        >Введите пароль</small>
        <small
                  class="helper-text invalid"
                  v-else-if="!$v.password.minLength"
        >Пародь должен иметь 8 знаков и более</small>
        <small
                  class="helper-text invalid"
                  v-else-if="!$v.password.maxLength"
        >Пароль не может быть длинее 12 знаков</small>
      </div>
      <div class="input-field">
        <input
                  id="passwordRepeat"
                  type="password"
                  v-model="passwordRepeat"
                  v-bind:class="{invalid: ($v.password.$dirty && (!$v.password.required || !$v.passwordRepeat.samePassword))}">
        <label for="passwordRepeat">Повторите пароль</label>
        <small
                  class="helper-text invalid"
                  v-if="!$v.password.required"
        >Повторите пароль</small>
        <small
                  class="helper-text invalid"
                  v-else-if="!$v.passwordRepeat.samePassword"
        >Пароли должны быть идентичны</small>
      </div>
      <div class="input-field">
        <input
                  id="name"
                  type="text"
                  v-model="name"
        v-bind:class="{invalid: ($v.name.$dirty && (!$v.name.required || !$v.name.minLength || !$v.name.maxLength || !$v.name.alpha))}">
        <label for="name">Имя</label>
        <small
                  class="helper-text invalid"
                  v-if="!$v.name.required"
        >Введите ваше имя</small>
        <small
                  class="helper-text invalid"
                  v-else-if="!$v.name.alpha"
        >Имя должно содержать только латинские быквы</small>
        <small
                  class="helper-text invalid"
                  v-else-if="!$v.name.minLength"
        >Слишком короткое имя</small>
        <small
                  class="helper-text invalid"
                  v-else-if="!$v.name.maxLength"
        >Слишком длинное имя</small>
      </div>
      <p>
        <label>
          <input
                    type="checkbox"
                    v-model="agreement"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
      <small
                class="helper-text invalid"
                v-if="!agreement"
      >Вам нежно согласиться с проавилами пользования</small>
    </div>
    <div class="card-action">
      <div>
        <button class="btn auth-submit top" type="submit">Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
        <router-link to="/login" class="btn auth-submit">Войти
          <i class="material-icons right">send</i>
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
  import {email, required, minLength, maxLength, alpha, sameAs} from 'vuelidate/lib/validators'
    export default {
        name: "Registration",
        data: function () {
            return {
                email: '',
                password: '',
                passwordRepeat: '',
                name: '',
                agreement: false,
            }
        },
        validations: {
            email: {email, required},
            password: {minLength: minLength(8), maxLength: maxLength(12), required},
            passwordRepeat: {samePassword: sameAs("password")},
            name: {minLength: minLength(2), maxLength: maxLength(10), required, alpha},
            agreement: {checked: v => v}
        },
        methods:{
            submitHandler(){

                if (this.$v.$invalid){
                    this.$v.$touch();
                    return
                }
                this.$router.push('/');
                const formDataRegister = {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    agreement: this.agreement
                };
                console.log(formDataRegister)
            }
        }
    }
</script>

<style scoped lang="stylus">
  button.btn.top
    margin-bottom 10px
</style>
