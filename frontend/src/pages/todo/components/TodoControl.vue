<template>
  <div class="control pure-g">
    <div class="status pure-u-1 pure-u-md-1-4 pure-u-lg-1-4">状态: {{status}}</div>
    <div class="buttons pure-u-1 pure-u-md-3-4 pure-u-lg-3-4">
      <button class="pure-button button-todo">
        <i class="fa fa-cog"></i>
        所有
      </button>
      <button class="pure-button button-todo">
        <i class="fa fa-shopping-cart"></i>
        已完成
      </button>
      <button class="pure-button button-todo">
        <i class="fa fa-shopping-cart"></i>
        未完成
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 'ok'
    }
  }
}
</script>


<style lang="stylus">
.control {
  width: 80%;
  margin: 0 auto;
  line-height 3em;
  height  3em;
  color: white;
  margin-top: 1em;
}
.control .buttons, .control .status
  text-align center

@media (min-width: 48em)  {
  .control .buttons {
    text-align: right
  }
  .control .status {
    text-align: left
  }
}
</style>

