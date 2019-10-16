<template>
  <div class="main-layout">
    <navbar v-on:clickedhamburger="deformate"></navbar>
    <sidebar v-bind:class="{'open' : isOpen}"></sidebar>
    <router-view v-bind:class="{'full' : !isOpen}"/>
    <fixedButton></fixedButton>
  </div>
</template>

<script>
import navbar from '../components/navbar'
import fixedButton from '../components/fixedButton'
import sidebar from '../components/sidebar'
export default {
  name: 'MainLayout',
  data: function () {
    return {
      isOpen: true
    }
  },
  methods: {
    deformate () {
      this.isOpen = !this.isOpen
    }
  },
  components: {
    navbar, fixedButton, sidebar
  }
}
</script>

<style scoped>

</style>
