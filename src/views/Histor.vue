<template>
	<main class="app-content">
		<div class="app-page">
			<div>
				<div class="page-title">
					<h3>История записей</h3>
				</div>

				<div class="history-chart">
					<canvas></canvas>
				</div>
				<div v-if="loading">
					<Loader></Loader>
				</div>
				<p class="center" v-else-if="!records.length">
					Список записей пуст
					<router-link to="/record">Добавьте первую</router-link>
				</p>
				<div v-else>
					<historyTable v-bind:records="items"></historyTable>
					<Paginate
							v-model="page"
						:page-count="pageCount"
						:click-handler="pageChangeHandler"
						:prev-text="'Назад'"
						:next-text="'Вперед'"
						:container-class="'pagination'"
						:page-class="'page-item'"
						:margin-pages="2"
					/>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import historyTable from '../components/historyTable'
import paginationMixin from '../mixins/pagination.mixin'
export default {
  name: 'Histor',
  components: { historyTable },
  mixins: [paginationMixin],
  data () {
    return {
      loading: true,
      records: [],
      categories: []
    }
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.Id).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.loading = false
    this.setupPagination(this.records)
  }
}
</script>

<style scoped></style>
