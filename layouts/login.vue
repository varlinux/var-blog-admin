<template>
  <div class="app-wrapper">
    <Nuxt />
  </div>
</template>

<script>
import Header from './components/Header'
import Aside from './components/Aside'
import AppMain from "./AppMain"

export default {
  name: "login",
  components: {
    Header,
    Aside,
    AppMain
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
