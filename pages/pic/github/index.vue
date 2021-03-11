<template>
  <div class="wrapper">
    <div class="content-header">
      <el-button class="el-icon-upload" @click="uploadPic">上传图片</el-button>
    </div>
    <el-table
        v-loading="loading"
        :data="picList"
        :default-sort="{prop: 'atc_create_time', order: 'atc_id'}"
        border
        style="width: 100%">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          fixed
          label="缩略图"
          width="125">
        <template slot-scope="scope">
          <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.img_url ? scope.row.img_url : ''">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          prop="img_name"
          label="图片名称"
          width="300">
      </el-table-column>
      <el-table-column
          prop="img_create_time"
          sortable
          label="创建日期"
          width="160">
      </el-table-column>
      <el-table-column
          prop="type_align"
          label="图片类型"
          width="100">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="150">
        <template slot-scope="scope">
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
    <upload-pop-box v-show="isShowPicUploadBox" :visible.sync="isShowPicUploadBox" />
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import UploadPopBox from "../components/UploadPop"
export default {
  name: 'ArticleList',
  data() {
    return {
      isShowPicUploadBox: false,
      loading: true,
      restaurants: [],
      state: '',
      timeout: null,
      currentPage4: 1,
      picList: []
    }
  },
  computed: {
    imgList: function () {
      return function (img) {
        return Array.from(img)
      }
    }
  },
  components: {
    UploadPopBox
  },
  mounted() {
    this.selectAllImg()
  },
  methods: {
    ...mapActions([
      'img/getAllImg',
      'img/deleteImg'
    ]),
    uploadPic() {
      this.isShowPicUploadBox = true
    },
    selectBy() {},
    selectAllImg() {
      const typeObj = {
        '1': 'Server',
        '2': 'Issue',
        '3': 'Other',
      }
      this.$store.dispatch('img/getAllImg').then(res => {
        if (res._code === 200) {
          this.picList = res._data
          this.picList.forEach(item => {
            item.type_align = typeObj[item.img_type]
          })
          console.log(`res._data : `, res._data)
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
        this.$store.dispatch('img/deleteImg', row.img_name).then(res => {
          let msgType = res._code === 200 ? 'success' : 'error'
          this.$message({
            message: res._msg,
            type: msgType
          })
          this.picList = this.picList.filter(item => item.img_name !== row.img_name)
        })
      })
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
