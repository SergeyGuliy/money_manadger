<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Создать</h4>
            </div>

            <form v-on:submit.prevent="submitHandler">
                <div class="input-field">
                    <input id="name" type="text" v-model.trim="title" v-bind:class="{invalid: (!this.$v.title.required)}">
                    <label for="name">Название</label>
                    <span v-if="!this.$v.title.required" class="helper-text invalid">Введите название категории</span>
                </div>

                <div class="input-field">
                    <input id="limit" type="number" v-model.number="moneyAmount" v-bind:class="{invalid: !this.$v.moneyAmount.minValue || !this.$v.moneyAmount.minLength}">
                    <label for="limit">Лимит</label>
                    <span v-if="!this.$v.moneyAmount.minValue || !this.$v.moneyAmount.minLength" class="helper-text invalid">Минимальная величина 10 грв</span>
                </div>

                <button class="btn auth-submit top" type="submit" v-bind="{disabled: ((!this.$v.title.required) || (!this.$v.moneyAmount.minValue || !this.$v.moneyAmount.minLength))}">
                    Создать
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { required, minValue, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'categoryCreate',
  data () {
    return {
      title: '',
      moneyAmount: 10
    }
  },
  validations: {
    title: { required },
    moneyAmount: { minValue: minValue(10), minLength: minLength(2) }
  },
  mounted () {
    M.updateTextFields()
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          moneyAmount: this.moneyAmount
        })
        this.$message(`Вы создали категорию: ${this.title}`)
        this.title = ''
        this.moneyAmount = 10
        this.$v.$reset()
        this.$emit('createdCategory', category)
      } catch (e) {}
    }
  }
}
</script>

<style scoped>

</style>
