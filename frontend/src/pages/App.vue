<template>
  <div>
    <div class="header">
      <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
        <a class="pure-menu-heading" href>超酷清单</a>
        <ul class="pure-menu-list">
          <li class="pure-menu-item pure-menu-selected">
            <router-link to="/" class="pure-menu-link">首页</router-link>
          </li>
          <li class="pure-menu-item">
            <router-link to="/todo" class="pure-menu-link">清单</router-link>
          </li>
          <li class="pure-menu-item">
            <a href="#" class="pure-menu-link">登录</a>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
    <cool-footer></cool-footer>
  </div>
</template>

<script>
import CoolFooter from '@components/Footer'

export default {
  components: {
    CoolFooter
  },
  data() {
    return {
      msg: "hello world"
    };
  }
};
</script>

<style lang="stylus">
/* This is the class used for the footer */
.footer {
  background: #111;
  position: fixed;
  bottom: 0;
  width: 100%;
}

@media (min-width: 48em) {
  /* We can align the menu header to the left, but float the
  menu items to the right. */
  .home-menu {
    text-align: left;
  }

  .home-menu ul {
    float: right;
  }
}
</style>


