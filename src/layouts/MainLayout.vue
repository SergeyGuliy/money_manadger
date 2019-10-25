<template>
  <div>
      <Loader v-if="loading"/>
      <div v-else class="main-layout">
          <navbar v-on:clickedhamburger="deformate"></navbar>
          <sidebar v-bind:class="{'open' : isOpen}"></sidebar>
          <router-view v-bind:class="{'full' : !isOpen}"/>
          <fixedButton></fixedButton>
      </div>
  </div>
</template>

<script>
import navbar from '../components/navbar'
import fixedButton from '../components/fixedButton'
import sidebar from '../components/sidebar'
import messages from '../plagins/messages'
export default {
  name: 'MainLayout',
  data: function () {
    return {
      isOpen: true,
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  methods: {
    deformate () {
      this.isOpen = !this.isOpen
    }
  },
  components: {
    navbar, fixedButton, sidebar
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      this.$error(messages[fbError.code] || 'Что то пошло не так')
    }
  }
}
</script>

<style scoped>

</style>
