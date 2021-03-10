<template>
  <div class="wrapper">
    <div class="content-header">
      <el-button class="el-icon-circle-plus-outline" @click="addTask">添加任务</el-button>
    </div>
    <div class="content-main">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for="item in collapseList"
                          :key="item.id"
                          :title="item.title"
                          :name="item.name">
          <el-table
              v-loading="loading"
              :data="item.dataList"
              :default-sort="{prop: 'site_task_create_time', order: '_id'}"
              border
              style="width: 100%">
            <el-table-column
                prop="site_task_level"
                fixed
                sortable
                label="优先级"
                width="100">
            </el-table-column>
            <el-table-column
                prop="site_task_name"
                label="任务名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="site_task_desc"
                label="任务描述"
                width="400">
            </el-table-column>
            <el-table-column
                prop="site_task_edit_time"
                sortable
                label="修改日期"
                width="160">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="selectBy(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteBy(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <detail-pop-box v-show="isShowDetail" :cur-data="curData"/>
    <add-pop-box v-show="isShowAdd" />
  </div>
</template>

<script>
  import DetailPopBox from '../components/DetailPop'
  import AddPopBox from '../components/AddPop'

  export default {
    name: 'ArticleList',
    inject: ['reload'],
    data() {
      return {
        activeNames: [],
        loading: false,
        taskList: [],
        isShowDetail: false,
        isShowAdd: false,
        curData: {},
        collapseList: [
          {
            id: 1,
            title: 'Blog首页任务排期',
            name: 'index',
            dataList: []
          },{
            id: 2,
            title: 'Blog后台任务管理任务排期',
            name: 'admin',
            dataList: []
          },{
            id: 3,
            title: '服务器任务排期',
            name: 'server',
            dataList: []
          },{
            id: 4,
            title: '其他任务排期',
            name: 'other',
            dataList: []
          }
        ]
      }
    },
    components: {
      DetailPopBox,
      AddPopBox
    },
    computed: {
      imgList: function () {
        return function (img) {
          return Array.from(img)
        }
      }
    },
    mounted() {
      this.selectAllTask()
    },
    methods: {
      handleChange(val) {
        console.log(val)
      },
      addTask() {
        this.isShowAdd = true
      },
      selectBy(data) {
        console.log(`selectBy`)
        this.isShowDetail = true
        this.curData = data
      },
      selectAllTask() {
        const dataForm = {
          site_task_status: 1
        }
        this.$store.dispatch('getTasks', dataForm).then(res => {
          if (res) {
            const {_data} = res
            _data.forEach(item => {
              this.collapseList[item.site_task_type - 1].dataList.push(item)
            })
          }
        })
      },
      /**
       * 删除文章
       * @param data 文章对象
       */
      deleteBy(data) {
        this.$confirm('您确认要删除吗？' || 'Error', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteTask', data._id).then(res => {
            let msgType = res._code === 200 ? 'success' : 'error'
            this.$message({
              message: res._msg,
              type: msgType
            })
            this.reload()
          })
        }).catch(() => {})
      }
    },
  }
</script>

<style scoped>
  /*list-content*/
  .content-header {
    margin-bottom: 8px;
  }
</style>
