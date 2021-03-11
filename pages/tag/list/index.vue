<template>
  <div class="wrapper">
    <div class="content-header">
<!--      todo：删除标签，还要删除数据库中所有使用该标签的数据-->
      <el-button class="el-icon-delete" @click="">删除</el-button>
      <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="搜索内容"
          @select="handleSelect">
      </el-autocomplete>
    </div>
    <el-table
        v-loading="loading"
        :data="tagList"
        :default-sort="{prop: 'atc_create_time', order: 'atc_id'}"
        border
        style="width: 100%">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          fixed
          prop="tag_id"
          label="标签编号"
          width="320">
      </el-table-column>
      <el-table-column
          prop="tag_name"
          label="标签名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="tag_create_time"
          sortable
          label="创建日期"
          width="160">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="selectBy(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="updateBy(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteBy(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "TagList",
    data() {
      return {
        loading: true,
        restaurants: [],
        state: '',
        timeout: null,
        currentPage4: 1,
        tagList: []
      }
    },
    mounted() {
      this.$store.dispatch('tag/getAllTag').then(res => {
        if (res._code === 200) {
          this.tagList = res._data
          this.loading = false
        }
      })
    },
    methods: {
      /**
       * 删除标签
       * @param row 标签对象
       */
      deleteBy(row) {
        this.$confirm('您确认要删除吗？' || 'Error', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('tag/deleteTag', row.tag_id).then(res => {
            let msgType = 'error'
            if (res._code === 200) {
              msgType = 'success'
              this.tagList = this.tagList.filter(item => item.tag_id !== row.tag_id)
            }
            this.$message({
              message: res._msg,
              type: msgType
            })
          })
        })
      },
      /**
       * 跳转到标签编辑页面
       * @param row
       */
      updateBy(row){
        this.$router.push({
          path: '/tag/writer',
          query: row
        })
      },
      querySearchAsync(queryString, cb) {
        const restaurants = this.restaurants;
        const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style scoped>
  /*list-content*/
  .content-header {
    margin-bottom: 8px;
  }

  .el-autocomplete {
    float: right;
  }

  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
</style>
