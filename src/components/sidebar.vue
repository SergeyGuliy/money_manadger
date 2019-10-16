<template>
  <ul class="sidenav app-sidenav">
    <router-link
              v-for="item in navItems"
              v-bind:key= "item.url"
              tag="li"
              active-class="active"
              v-bind:to="item.url"
              v-bind:exact="item.exact">
      <a href="#" class="pointer">{{item.name}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'sidebar',
  data: function () {
    return {
      navItems: [
        { name: 'Счет', url: '/', exact: true },
        { name: 'История', url: '/history' },
        { name: 'Планирование', url: '/planning' },
        { name: 'Новая запись', url: '/record' },
        { name: 'Категории', url: '/categories' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
