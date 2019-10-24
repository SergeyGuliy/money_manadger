<template>
  <main class="app-content">
    <div class="app-page">

      <div>
        <div class="page-title">
          <h3>Новая запись</h3>
        </div>
        <Loader v-if="loading"></Loader>
          <p v-else-if='!categories.length' class="center">Категорий пока что нет <router-link to="/categories">Добавить категорию</router-link></p>
        <form v-else class="form" v-on:submit.prevent="submitHandler">
          <div class="input-field">
            <select ref="select" v-model="category">
              <option v-for="cat in categories" v-bind:key="cat.id" v-bind:value="cat.id">{{cat.title}}</option>
            </select>
            <label>Выберите категорию</label>
          </div>

          <p>
            <label>
              <input class="with-gap" name="type" type="radio" value="income" v-model="type"/>
              <span>Доход</span>
            </label>
          </p>

          <p>
            <label>
              <input class="with-gap" name="type" type="radio" value="outcome" v-model="type"/>
              <span>Расход</span>
            </label>
          </p>

          <div class="input-field">
            <input id="amount" type="number" v-model.number="amount" v-bind:class="{invalid: !this.$v.amount.minValue}">
            <label for="amount">Сумма</label>
            <span class="helper-text invalid" v-if="!this.$v.amount.minValue">Минимально 10 грв</span>
              <span class="helper-text invalid" v-if="!haveEnaughtMoney">У вас нехватает денег</span>
          </div>

          <div class="input-field">
            <input id="description" type="text" v-model="description">
            <label for="description">Введите описание по желанию</label>
          </div>

          <button class="btn auth-submit" type="submit" v-bind:class="{disabled: (!this.$v.amount.minValue || !haveEnaughtMoney)}">
            Создать
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>

    </div>
  </main>
</template>

<script>
import { minValue } from 'vuelidate/lib/validators'
export default {
  name: 'Record',
  data () {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: 'outcome',
      amount: 10,
      description: ''
    }
  },
  validations: {
    amount: { minValue: minValue(10) }
  },
  computed: {
    moneyAmount () {
      return this.$store.getters.info.bill
    },
    haveEnaughtMoney () {
      if (this.amount > this.moneyAmount && this.type === 'outcome') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.touch()
        return
      }
      try {
        const formData = {
          Id: this.category,
          type: this.type,
          amount: this.amount,
          description: this.description,
          dateCreated: new Date().toJSON()
        }
        let bill
        if (formData.type === 'outcome' && !this.haveEnaughtMoney) {
          this.$message(`Вам не хватает ${-(this.moneyAmount - formData.amount)} грв`)
          return
        } else if (formData.type === 'outcome') {
          this.$message(`Вы ввели расход на ${formData.amount} грв`)
          bill = +(this.moneyAmount - formData.amount)
        } else if (formData.type === 'income') {
          this.$message(`Вы ввели доход на ${formData.amount} грв`)
          bill = +(this.moneyAmount + formData.amount)
        }
        await this.$store.dispatch('updateInfo', { bill })
        await this.$store.dispatch('createNewRecord', formData)
        this.$v.$reset()
        this.amount = 10
        this.description = ''
      } catch (e) {}
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)

    if (this.categories.length) {
      this.category = this.categories[0].id
    }
  },
  beforeDestroy () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>

</style>
