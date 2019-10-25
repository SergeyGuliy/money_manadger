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
				<Loader v-if="loading"></Loader>
				<p class="center" v-else-if="!records.length">Список записей пуст <router-link to="/record">Добавьте первую</router-link></p>
				<historyTable v-else v-bind:records="records"></historyTable>
			</div>
		</div>
	</main>
</template>

<script>
import historyTable from "../components/historyTable";
export default {
  name: 'Histor',
	components: {historyTable},
	data(){
      return{
          loading: true,
		  records: [],
		  categories: []
	  }
	},
	async mounted(){
        // this.records = await this.$store.dispatch('fetchRecords')
        const records= await this.$store.dispatch('fetchRecords')
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
	}
}
</script>

<style scoped></style>
