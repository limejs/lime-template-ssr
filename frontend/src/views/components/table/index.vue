<template>
  <div>
    <table>
      <tr>
        <th v-for="(item, index) in lists.header" :key="index">{{item}}</th>
      </tr>
      <tr v-for="(row, index) in lists.body" :key="index">
        <td v-for="(col, index) in row" :key="index">{{col}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Object,
      default: []
    }
  }
}
</script>
