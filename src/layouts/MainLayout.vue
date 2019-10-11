<template>
  <div class="main-layout">
    <navbar v-on:click="isOpen != isOpen"></navbar>
    <sidebar></sidebar>
    <router-view />
    <fixedButton></fixedButton>
  </div>
</template>

<script>
  import navbar from "../components/navbar";
  import fixedButton from "../components/fixedButton";
  import sidebar from "../components/sidebar";
  export default {
      name: "MainLayout",
      data: function(){
          return {
              isOpen: true
          }
      },
      components: {
          navbar, fixedButton, sidebar
      }
  }
</script>

<style scoped>

</style>
