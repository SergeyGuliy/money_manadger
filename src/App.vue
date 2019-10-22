<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'
export default {
  name: 'App',
  computed: {
    layout () {
      return (this.$route.meta.layout)
    }
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>

<style lang="stylus">
  @import "~materialize-css/dist/css/materialize.min.css"
  @import "assets/index.styl"
</style>
