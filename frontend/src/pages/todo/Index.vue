<template>
  <div>
    <!-- 头部 -->
    <div class="todo-bg"></div>
    <div class="todo-wrapper">
      <todo-header></todo-header>
      <todo-box></todo-box>
      <todo-control></todo-control>
      <todo-tips></todo-tips>
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeaders";
import TodoBox from "./components/TodoBox";
import TodoControl from './components/TodoControl'
import TodoTips from './components/TodoTips'

export default {
  components: {
    TodoHeader,
    TodoBox,
    TodoControl,
    TodoTips
  }
};
</script>

<style lang="stylus">
.todo-bg, .todo-wrapper {
  height: 100%;
  width: 100%;
  position: absolute;
  padding-top: 70px;
  padding-bottom: 100px;
}

.todo-bg {
  background: url('./img/bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(4px);
  opacity: 0.6;
}

.todo-wrapper {
  display flex
  flex-direction column
}

// todo按钮组件
.button-todo {
  background: #ccc;
  background: #808080;
  border: 1px solid #cecece;
  box-shadow: black;
  box-shadow: 0 0 1px 0px #cacacacf;
}

.button-todo.active {
  background: #ababab;
}
</style>

