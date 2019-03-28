<template>
  <div class="pc-main-cnt">
    <h1>首页</h1>
    <lime-table :lists="tableData"></lime-table>
  </div>
</template>
<style lang="scss" src='./sass/index.scss'></style>
<script>
  import Table from '@components/table'
  // api
  import getUserInfo from '@apis/get-user-info'

  export default {
    components: {
      'lime-table': Table
    },
    metaInfo() {
      return {
        title: '首页标题',
        titleTemplate: '%s',
        meta: [
          { name: 'keywords', content: '首页,关键字' },
          { name: 'description', content: '这是基于 LIME 的 lime-template-ssr 模板' }
        ]
      }
    },
    data() {
      return {
        tableData: {
          header: [
            '姓名', '年龄'
          ],
          body: [
            ['sheldon', 28],
            ['cating', 29]
          ]
        }
      }
    },
    asyncData({ store, route }) {
      const data = await getUserInfo()
      store.commit('')
    }
  }
</script>

<style lang="scss" src='./sass/index.scss'></style>
