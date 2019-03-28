<template>
  <div>
    <header></header>
    <router-view></router-view>
    <footer></footer>
  </div>
</template>

<script>
  import Header from "./header"
  import Footer from "./footer"

  export default {
    components: {
      "v-header": Header,
      "v-footer": Footer,
    },
    computed: {
    }
  }
</script>
