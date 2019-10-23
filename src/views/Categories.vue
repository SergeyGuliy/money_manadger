<template>
  <main class="app-content">
    <div class="app-page">

      <div>
        <div class="page-title">
          <h3>Категории</h3>
        </div>
        <section>
            <Loader v-if="loading"></Loader>
          <div v-else class="row">
              <categoryCreate v-on:createdCategory="addNewCategory"></categoryCreate>
              <categoryChange v-if="categories.length" v-bind:categories="categories" v-on:changedCategory="updateCategories" v-on:deleteCategory="deleteCategory" v-bind:key="categories.length + updateCount"></categoryChange>
              <p class="center" v-else>Категорий пока что нет</p>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import categoryChange from '../components/categoryChange'
import categoryCreate from '../components/categoryCreate'
export default {
  name: 'Categories',
  data () {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    categoryChange, categoryCreate
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].moneyAmount = category.moneyAmount
      this.updateCount++
    },
    deleteCategory (category) {
      const idx = this.categories.findIndex(c => c.id === category)
      this.categories.splice(idx, 1)
    }
  }
}
</script>

<style scoped>

</style>
