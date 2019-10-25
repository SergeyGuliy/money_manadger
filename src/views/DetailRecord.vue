<template>
	<main class="app-content">
		<div class="app-page">
			<Loader v-if="loading"></Loader>
			<div v-else-if="record">
				<div>
					<div class="breadcrumb-wrap">
						<router-link to="/history" class="breadcrumb">История</router-link>
						<a class="breadcrumb">
							{{record.type === 'income'? 'Доход' : 'Расход'}}
						</a>
					</div>
					<div class="row">
						<div class="col s12 m6">
							<div class="card" v-bind:class="{'red': record.type === 'outcome', 'green': record.type === 'income'}">
								<div class="card-content white-text">
									<p v-if="record.description != ''">
										Описание: {{ record.description }}
									</p>
									<p>Сумма: {{ record.amount | currency("UAH") }}</p>
									<p>Категория: {{ record.categoryName }}</p>

									<small>{{ record.dateCreated | date("datetime") }}</small>
								</div>
							</div>
								<button
										class="btn modal-trigger auth-submit"
										data-target="modal1"
										v-on:click="openModal"
								>
									Удалить запись
								</button>

							<div id="modal1" class="modal">
								<div class="modal-content">
									<h5 class="center">Вы уверены что хотите удалить запись?</h5>
								</div>
								<div class="modal-footer btn-containet">
									<button href="#!" class="modal-close btn">Закрыть</button>
									<button href="#!" class="modal-close btn red" v-on:click="deleteRecord">
										Удалить запись
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<p v-else class="center">Запись с id {{ $route.params.id }} не найдена</p>
		</div>
	</main>
</template>

<script>
export default {
  name: 'DetailRecord',
  data () {
    return {
      record: null,
      loading: true,
      modal: null
    }
  },
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.Id)
    this.loading = false
    this.record = {
      ...record,
      categoryName: category.title
    }
    const options = {
      opacity: 0.5
    }
    const elems = document.querySelectorAll('.modal')
    this.modal = M.Modal.init(elems, options)
  },
  beforeDestroy () {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy()
    }
  },
  methods: {
    openModal () {
      M.Modal.init(document.querySelectorAll('.modal'))
    },
    deleteRecord () {
		    this.$store.dispatch('deleteRecord', this.$route.params.id)
      this.$router.push('/history')
    }
  }
}
</script>

<style scoped lang="stylus">
.btn-containet
	display flex
	justify-content space-around
	flex-flow row wrap
.btn-containet>button
	width 45%
</style>
