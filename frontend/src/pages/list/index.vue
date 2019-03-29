<template>
  <ul>
    <li v-for="item in lists" :key="item.id">{{text}}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {text: '列表1', id: 1},
        {text: '列表2', id: 2}
      ]
    }
  }
}
</script>

