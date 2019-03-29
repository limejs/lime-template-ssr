export default {
  beforeCreate() {
    if (this.$store && typeof(this.$store.registerModule) === 'function' && this.$options.storeModules) {
      this.$store.registerModules(this.$options.storeModules);
    }
  },
  destroyed() {
    if (this.$store && typeof(this.$store.registerModules) === 'function') {
      this.$store.unregisterModules(this.$options.storeModules);
    }
  }
}
