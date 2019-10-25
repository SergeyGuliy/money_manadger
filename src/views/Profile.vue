<template>
  <main class="app-content">
    <div class="app-page">

      <div>
        <div class="page-title">
          <h3>Профиль</h3>
        </div>

        <form class="form" v-on:submit.prevent="submitHandler">
          <div class="input-field">
            <input id="description" type="text" v-model="name" v-bind:class="{invalid: (!this.$v.name.required || !this.$v.name.minLength || !this.$v.name.maxLength || !this.$v.name.alpha)}">
			  <label for="description">Имя</label>
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

          <button class="btn" type="submit" v-bind:class="{disabled: (!this.$v.name.required || !this.$v.name.minLength || !this.$v.name.maxLength || !this.$v.name.alpha)}">
            Обновить
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>

    </div>
  </main>
</template>

<script>
import { required, minLength, maxLength, alpha } from 'vuelidate/lib/validators'
export default {
  name: 'Profile',
  data () {
    return {
      	name: ''
	  }
  },
  validations: {
    name: { minLength: minLength(2), maxLength: maxLength(10), required, alpha }
  },
  computed: {
    nameOld () {
      return this.$store.getters.info.name
	  }
  },
  mounted () {
    this.name = this.nameOld
    setTimeout(function () {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    async submitHandler () {
      await this.$store.dispatch('updateInfo', { name: this.name })
    }
  }
}
</script>

<style scoped>

</style>
