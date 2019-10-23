<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Счет</h3>
          <button class="btn waves-effect waves-light btn-small" v-on:click="refresh">
            <i class="material-icons">refresh</i>
          </button>
        </div>
          <Loader v-if="loading" />
        <div v-else class="row">
          <homeBill v-bind:rates="currency.rates"></homeBill>
          <homeCurrency v-bind:rates="currency.rates" v-bind:date="currency.date"></homeCurrency>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import homeBill from '../components/homeBill'
import homeCurrency from '../components/homeCurrency'
export default {
  name: 'home',
  components: { homeBill, homeCurrency },
  data () {
    return {
      loading: true,
      currency: null
    }
  },
  async mounted () {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
}
</script>
<style>

</style>
