<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>

            <form v-on:submit.prevent="submitHandler">
                <div class="input-field">
                    <select ref="select" v-model="currentCategory">
                        <option v-for="c in categories" v-bind:key="c.id" v-bind:value="c.id">{{c.title}}</option>
                    </select>
                    <label>Выберите категорию</label>
                </div>

                <div class="input-field">
                    <input type="text" id="name" v-model="title" v-bind:class="{invalid: (!this.$v.title.required)}">
                    <label for="name">Название</label>
                    <span v-if="!this.$v.title.required" class="helper-text invalid">Введите название категории</span>
                </div>

                <div class="input-field">
                    <input id="limit" type="number" v-model="moneyAmount" v-bind:class="{invalid: !this.$v.moneyAmount.minValue }">
                    <label for="limit">Лимит</label>
                    <span v-if="!this.$v.moneyAmount.minValue" class="helper-text invalid">Минимальная величина 10 грв</span>
                </div>

                <button class="btn auth-submit top" type="submit" v-bind="{disabled: !this.$v.title.required || !this.$v.moneyAmount.minValue}">
                    Обновить
                    <i class="material-icons right">send</i>
                </button>
                <button class="btn auth-submit top" type="button" v-on:click="deleteCategoryHandler">
                    Удалить категорию
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  name: 'categoryChange',
  data () {
    return {
      select: null,
      title: '',
      moneyAmount: 10,
      currentCategory: null
    }
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  validations: {
    title: { required },
    moneyAmount: { minValue: minValue(10) }
  },
  watch: {
    currentCategory (catId) {
      const { title, moneyAmount } = this.categories.find(c => c.id === catId)
      this.title = title
      this.moneyAmount = moneyAmount
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.touch()
        return
      }
      try {
        const categoryNewData = {
          id: this.currentCategory,
          title: this.title,
          moneyAmount: this.moneyAmount
        }
        await this.$store.dispatch('updateCategory', categoryNewData)
        this.$emit('changedCategory', categoryNewData)
        this.$message(`Вы отредактировали категорию: ${this.title}`)
      } catch (e) {}
    },
    async deleteCategoryHandler () {
      try {
        const categoryId = this.currentCategory
        await this.$store.dispatch('deleteCategory', categoryId)
        this.$emit('deleteCategory', categoryId)
        this.$message(`Вы удалили категорию: ${this.title}`)
      } catch (e) {}
    }
  },
  created () {
    const { id, title, moneyAmount } = this.categories[0]
    this.currentCategory = id
    this.title = title
    this.moneyAmount = moneyAmount
  },
  mounted () {
    M.updateTextFields()
    this.select = M.FormSelect.init(this.$refs.select)
  },
  beforeDestroy () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped lang="stylus">
    button.btn.top
        margin-bottom 10px
</style>
