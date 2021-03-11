<template>
  <div class="pic-upload-container">
    <div class="upload-main-content">
      <el-divider content-position="center">图片上传</el-divider>
<!--      todo 增加上传图片类型选择-->
      <el-upload
          ref="upload"
          action="#"
          list-type="picture-card"
          accept="image/*"
          :http-request="uploadImg"
          :limit="limit"
          :file-list="fileList"
          :on-exceed="onExceed"
          :auto-upload="true">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail"
               :src="file.url" alt="">
          <span class="el-upload-list__item-actions">
            <span v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file, $event)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <div class="upload-btn-content">
        <el-button @click="resetUpload">重置</el-button>
        <el-button type="primary" @click="close">关闭</el-button>
      </div>
    </div>
    <div class="mask-layer"/>
  </div>
</template>

<script>
  export default {
    name: "UploadPopBox",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        fileList: [],
        limit: 10 // 图片单次最大上传数量
      }
    },
    methods: {
      beforeUpload(file) {
        console.log(`this.beforeUpload : `, file)
      },
      resetUpload() {
        return this.$refs.upload.clearFiles()
      },
      handleRemove(file, event) {
        const curEle = event.target.parentNode.parentNode.parentNode.parentNode
        console.log(`curEle : `, curEle.querySelector('img').src)
        const imgName = curEle.querySelector('img').src.match(/(?<=\/)\w*$/gi)[0]
        console.log(`imgName : `, imgName)
        this.$store.dispatch('img/deleteImg', imgName).then(res => {
          const { _code, _data } =  res
          if (_code === 200) {
            this.$message({
              type: 'success',
              message: '图片删除成功'
            })
            return curEle.remove()
          } else {
            this.$message({
              type: 'error',
              message: '图片删除失败'
            })
          }
        })
        return null
      },
      close() {
        this.$emit('update:visible', false)
      },
      uploadImg(params) {
        // 第一步.将图片上传到服务器.
        const formData = new FormData()
        console.log(`file : `, params)
        console.log(`file : `, params.file)
        formData.append('image', params.file)
        this.$store.dispatch('img/addImageToServer', formData).then(res => {
          const {_code, _data} = res
          if (_code === 200) {
            this.$message({
              type: 'success',
              message: '图片上传成功'
            })
            this.fileList.push(_data)
          } else {
            this.$message({
              type: 'error',
              message: '图片上传失败'
            })
          }
        })
      },
      /**
       * 上传数量超出触发函数
       */
      onExceed() {
        this.$message({
          type: 'warning',
          message: '一次性最多上传10张图片'
        })
      }
    }
  }
</script>

<style scoped>
  .upload-main-content {
    position: absolute;
    top: 10vh;
    width: 800px;
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    z-index: 1001;
  }

  .mask-layer {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 1000;
  }

  /deep/ .el-upload--picture-card {
    border: 1px dashed #000;
    width: 100px;
    height: 100px;
    line-height: 100px;
  }

  /deep/ .el-divider--horizontal {
    width: 60%;
    margin: 24px auto;
  }

  .upload-btn-content {
    width: 100%;
    margin: 20px auto 0;
    text-align: center;
  }

  .upload-btn-content .el-button {
    margin: 0 20px;
  }
</style>
