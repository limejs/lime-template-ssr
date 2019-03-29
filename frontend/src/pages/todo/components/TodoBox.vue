<template>
  <div class="todo-box pure-form">
    <div class="todo-input">
      <input
        type="text"
        @keyup.enter="add"
        autofocus
        placeholder="你想要做些什么?"
        class="pure-input-rounded"
      >
    </div>
    <ul class="todo-list">
      <todo-line
        v-for="task in tasks"
        :task="task"
        :key="task.id" 
        @save="save"
        @del="del">
      </todo-line>
    </ul>
  </div>
</template>

<script>
import TodoLine from "./Line"
let id = 0

export default {
  components: {
    TodoLine
  },
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    add(e) {
      console.log(e.target.value)
      this.tasks.unshift({
        id: id++,
        text: e.target.value,
        isFinish: false
      })
      e.target.value = ''
    },
    save(task) {
      // ajax to save. and then update the tasks
      let curTask = this.tasks.find(item => item.id === task.id)
      curTask.text = task.text
    },
    del(id) {
      let index = this.tasks.findIndex(item => item.id === id)
      if (index >= 0) {
        this.tasks.splice(index, 1)
      }
    }
  }
};
</script>



<style lang="stylus">
.todo-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 70%;
  border-radius: 5px;
  color: white;
  width: 80%;
  margin: 0 auto;
  padding: 2em 1em 1em;
  background: #6f6f6f;
  opacity: 0.8;
  box-shadow: 1px 1px 3px 1px #a9a9a9a6;
}

.todo-input input[type=text] {
  color: #191919;
  font-size: 1.2em;
}

.todo-list {
  flex: 1;
  overflow: scroll;
  font-size: 1.2em;
  line-height: 1.8em;
  margin: 0;
  padding: 1em;
}
</style>
