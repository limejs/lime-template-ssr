<template>
  <div class="left-tips">
    任务剩余: {{counts}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      counts: 0
    }
  }
}
</script>

<style lang="stylus">
.left-tips
    background: #ff0808db;
    color: white;
    font-size: .8em;
    border-radius: 3em;
    padding: .1em 1em;
    position: absolute;
    right: 2em;
    top: 5.8em;
    line-height: 2em;
</style>
