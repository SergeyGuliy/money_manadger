<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Курс валют</span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Валюта</th>
                        <th>Курс</th>
                        <th>Дата</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="cur in currencies" v-bind:key="cur">
                        <td>{{cur}}</td>
                        <td>{{(1 / rates[cur] * rates['UAH']).toFixed(2)}}</td>
                        <td>{{date | date('date')}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'homeCurrency',
  props: ['rates', 'date'],
  data () {
    return {
      currencies: ['USD', 'EUR']
    }
  }
}
</script>

<style scoped>

</style>
