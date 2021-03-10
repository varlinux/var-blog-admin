<template>
  <div class="wrapper">
    <div class="content-header">
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
        :data="articleList"
        :default-sort="{prop: 'atc_create_time', order: 'atc_id'}"
        border
        style="width: 100%">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          fixed
          prop="atc_create_time"
          sortable
          label="创建日期"
          width="160">
      </el-table-column>
      <el-table-column
          fixed
          prop="atc_edit_time"
          sortable
          label="更新日期"
          width="160">
      </el-table-column>
      <el-table-column
          prop="atc_author"
          label="作者"
          width="120">
      </el-table-column>
      <el-table-column
          prop="atc_title"
          label="标题"
          width="300">
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
import {mapActions} from 'vuex'

export default {
  name: 'ArticleList',
  data() {
    return {
      loading: true,
      restaurants: [],
      state: '',
      timeout: null,
      currentPage4: 1,
      articleList: []
    }
  },
  watch: {
    $route(to, from) {
      if (from.path === '/article/articleWriter') {
        this.selectArticles()
      }
    }
  },
  mounted() {
    this.selectArticles()
  },
  methods: {
    ...mapActions([
      'getAllArticle', 'deleteArticle'
    ]),
    selectBy() {},
    selectArticles() {
      this.getAllArticle().then(res => {
        if (res._code === 200) {
          this.articleList = res._data
          this.loading = false
        }
      })
    },
    /**
     * 删除文章
     * @param row 文章对象
     */
    deleteBy(row) {
      this.$confirm('您确认要删除吗？' || 'Error', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteArticle(row.atc_id).then(res => {
          let msgType = 'error'
          if (res && res._data) {
            const {_code} = res
            if (_code === 200) {
              this.articleList = this.articleList.filter(item => item.atc_id !== row.atc_id)
              msgType = 'success'
            }
          }
          this.$message({
            message: res._msg || '操作失败，请重新尝试',
            type: msgType,
            duration: 1000
          })
        })
      })
    },
    /**
     * 跳转到文章编辑页面
     * @param row
     */
    updateBy(row){
      this.$router.push({
        path: '/admin/article/articleWriter',
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
