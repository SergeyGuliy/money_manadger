<template>
	<main class="app-content">
		<div class="app-page">
			<div>
				<div class="page-title">
					<h3>История записей</h3>
				</div>

				<div class="history-chart">
					<canvas ref="canvas"></canvas>
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
import { Pie } from 'vue-chartjs'
export default {
  name: 'Histor',
  extends: Pie,
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
    this.renderChart({
      labels: this.categories.map(c => c.title),
      datasets: [{
        label: 'Расходы по категориям',
        data: this.categories.map(c => {
          return this.records.reduce((total, r) => {
            if (r.Id === c.id && r.type === 'outcome') {
              total += r.amount
					  }
            return total
				  }, 0)
			  }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    })
    this.loading = false
    this.setupPagination(this.records)
  }
}
</script>

<style scoped></style>
