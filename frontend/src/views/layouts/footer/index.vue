<template>
  <footer class="footer">
    {{name}} &copy; 2016-{{year}}
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        year: (new Date()).getFullYear()
      }
    }
  }
</script>

