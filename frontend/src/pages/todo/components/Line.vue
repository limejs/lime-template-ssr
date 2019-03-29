<template>
  <li class="todo-item">
    <input v-show="!isEditing" id="1" type="checkbox" @click="toggleFinish" class="todo-item-checkbox" v-model="task.isFinish">
    <label v-show="!isEditing" for="1" class="text" @click.self.prevent="toggleFinish" :style="labelStyle">
      {{task.text}}
    </label>
    <input
      @keyup.enter="edit"
      v-show="isEditing"
      v-focus="isEditing"
      type="text"
      class="input-line-edit"
      v-model="newText">
    <button v-show="!task.isFinish" class="button-edit pure-button" @click="edit">{{editBtnText}}</button>
    <button class="button-del pure-button" @click="del">删除</button>
  </li>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      require: true,
      default: {}
    }
  },
  data() {
    return {
      newText: '',
      isEditing: false
    }
  },
  computed: {
    editBtnText() {
      return this.isEditing ? '保存' : '编辑'
    },
    labelStyle() {
      return {
        'text-decoration': this.task.isFinish ? 'line-through' : 'none'
      }
    }
  },
  methods: {
    toggleFinish() {
      console.log('转换')
      this.task.isFinish = !this.task.isFinish
    },
    del() {
      this.$emit('del', this.task.id)
    },
    edit() {
      if (this.isEditing) {
        // save
        this.save()
      }
      else {
        // edit
        this.isEditing = true
        this.newText = this.task.text
      }
    },
    save() {
      this.$emit('save', {
        id: this.task.id,
        text: this.newText
      })
      this.newText = ''
      this.isEditing = false
    }
  },
  directives: {
    focus: {
      bind(el, binding) {
        console.log('bind', el, binding)
      },
      update (el, binding) {
        console.log('update', el, binding)
        if (binding.value === true && binding.value != binding.oldValue) {
          el.focus()
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.todo-item {
  list-style: none;
  display: flex;
  align-items: center;
  padding: .4em 0;
}
.todo-item-checkbox, .todo-item label {
  cursor: pointer;
}
.todo-item input[type=checkbox] {
  width: auto;
}
.todo-item .text {
  padding: 0 .4em;
  flex 1
  color: white;
  font-weight: normal;
  font-size: 1em;
  vertical-align: sub;
}
.pure-form input.input-line-edit {
  color: #3c3c3c;
  padding: .2em .4em;
  margin-right: 1em;
  border: 1px solid #ccc;
  border-radius: 2px;
}
</style>
