<template>
	<main class="app-content">
		<div class="app-page">
			<div>
				<div class="page-title">
					<h3>Планирование</h3>
					<h4>{{bill | currency('UAH')}}</h4>
				</div>
				<Loader v-if="loading"></Loader>
				<p class="center" v-else-if="!categoriesOutcome.length">Категорий пока нет <router-link to="/categories">Добавить категорию</router-link> </p>
				<section v-else>
					<div v-for="cat in categoriesOutcome" v-bind:key="cat.Id">
						<p>
							<strong>{{cat.title}}</strong>
							{{cat.spend | currency('UAH')}} из {{cat.moneyAmount | currency('UAH')}}
						</p>
						<div class="progress" v-tooltip="cat.tooltip">
							<div class="determinate" v-bind:style="{width: cat.progressPercent +'%'}" v-bind:class="[cat.progressColor]"></div>
						</div>
					</div>
				</section>
			</div>
		</div>
	</main>
</template>

<script>
import record from '../store/record'
import currencyFilter from '../filters/currency.filter'
export default {
  name: 'Planning',
  data () {
    return {
      loading: true,
      categoriesOutcome: [],
      records: []
    }
  },
  computed: {
	    bill () {
	        return this.$store.getters.info.bill
    }
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    this.categoriesOutcome = categories.map(cat => {
		    const spend = records.filter(r => r.Id === cat.id).filter(r => r.type === 'outcome').reduce((total, record) => {
		        return total += +record.amount
      }, 0)
      const percent = 100 * spend / cat.moneyAmount
      const progressPercent = percent > 100 ? 100 : percent
      let progressColor
      const tooltipValue = cat.moneyAmount - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на ' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
		    if (percent < 60) {
        progressColor = 'green'
      } else if (percent < 100) {
        progressColor = 'yellow'
      } else {
        progressColor = 'red'
      }
		    return {
		        ...cat, progressPercent, progressColor, spend, tooltip
      }
    })
  }
}
</script>

<style scoped></style>
