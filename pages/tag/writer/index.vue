<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="80px" v-loading="loading">
      <el-input v-model="form.title" placeholder="输入标题..."></el-input>
      <mavon-editor v-model="form.content"
                    :boxShadow="false"></mavon-editor>
      <el-form-item label="标签">
        <el-tag
            :key="tag.tag_id"
            v-for="tag in this.form.dynamicTags"
            closable
            :disable-transitions="false"
            @close="removeTag(tag)">
          {{tag.tag_name}}
        </el-tag>
        <el-autocomplete
            class="autocomplete-inline-input"
            v-model="inputTagVal"
            v-show="isShowTagInput"
            value-key="tag_name"
            :minlength="100"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            placeholder="请输入标签名称"
            @select="tagSelect"
            @keydown.enter.native="addNewTag"
        ></el-autocomplete>
      </el-form-item>
      <!-- todo blog定时发布待补充-->
      <!--<el-form-item label="定时">-->
      <!--<el-switch v-model="form.delivery"></el-switch>-->
      <!--</el-form-item>-->
      <!--<transition name="fade">-->
      <!--<el-form-item v-show="form.delivery" label="活动时间">-->
      <!--<el-col :span="11">-->
      <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date1"-->
      <!--style="width: 100%;"></el-date-picker>-->
      <!--</el-col>-->
      <!--<el-col class="line" :span="2">-</el-col>-->
      <!--<el-col :span="11">-->
      <!--<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
      <!--</el-col>-->
      <!--</el-form-item>-->
      <!--</transition>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <!--todo 保存草稿功能需要增加文章表增加一个状态属性，用来判断当前文章是什么状态:草稿、完成、删除-->
        <!--<el-button>保存草稿</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import {isExistInArray} from '@/utils/ArrayUtils'
  import {isNullForObject} from '@/utils/ObjectUtils'

  export default {
    name: "ArticleWriter",
    data() {
      return {
        isShowTagInput: true,
        inputTagVal: '',
        formType: 'add',
        curTags: [],
        form: {
          author: '',
          content: '',
          create_time: '',
          edit_time: '',
          id: '',
          status: '',
          title: '',
          blog_user_id: '',
          tag_ids: '',
          dynamicTags: [],
        },
        loading: false
      }
    },
    mounted() {
      /**
       * 获取所有标签
       */
      this.getAllTag().then(async res => {
        if (res._code === 200) {
          this.curTags = await res._data
          // 标签数据回显
          let existIndex = -1
          this.form.tag_ids.split(',').forEach(tagId => {
            existIndex = this.curTags.findIndex(item => item.tag_id === tagId)
            existIndex !== -1 ? this.form.dynamicTags.push(this.curTags[existIndex]): ''
          })
        }
      })
      // 页面从编辑按钮传递过来需要接收参数
      if (isNullForObject(this.$route.query)) {
        let data = this.$route.query
        let tempKey
        for (let _key in data) {
          tempKey = _key.indexOf('atc_') === -1 ? _key : _key.slice(4)
          this.form[tempKey] = data[_key]
        }
        this.formType = "update"
      }
      console.log(`this.form : `, this.form)
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
    },
    methods: {
      ...mapActions([
        'addArticle',
        'getAllTag',
        'insertTag',
        'updateArticle'
      ]),
      onSubmit() {
        this.loading = true
        let _this = this
        _this.form.blog_user_id = this.userInfo.user_id
        this[this.formType === 'update' ? 'updateArticle' : 'addArticle'](_this.form).then(res => {
          if (res._code === 200) {
            this.$message({
              type: 'success',
              message: "文章保存成功"
            })
            this.$router.push('/admin/article/articleList')
          } else {
            this.$message({
              type: 'warning',
              message: "文章保存失败"
            })
          }
          this.loading = false
        })
      },
      removeTag(tag) {
        let tags = this.form.dynamicTags
        tags.splice(tags.indexOf(tag), 1);
        this.isShowTagInput = true
      },
      tagSelect(item) {
        this.addDynamicTags(item)
      },
      addNewTag() {
        this.addDynamicTags(this.inputTagVal)
      },
      addDynamicTags(tag) {
        let tags = this.form.dynamicTags
        let newTag = typeof tag === "string" ? {tag_name: tag} : tag
        console.log(`newTag : `, newTag, typeof tag)
        const isExist = isExistInArray(tags, 'tag_name', newTag.tag_name)
        console.log(`isExist : ${isExist}`)
        if (!isExist) {
          // 判断增加的标签是否是新生成的，如果不是，封装成对象，如果没有封装对象则不会显示该标签
          tags.push(newTag)
          this.inputTagVal = "" // 清空tag输入搜索框
        } else {
          this.$message({
            message: "标签已存在",
            type: "warning"
          })
        }
        // 标签超过5个自动隐藏标签输入框
        tags.length >= 5 ? this.isShowTagInput = false : ''
      },
      querySearch(queryString, cb) {
        let list = this.curTags;
        let results = queryString ? list.filter(this.createFilter(queryString)) : list;
        cb(results);
      },
      createFilter(queryString) {
        return (item) => {
          return (item.tag_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .markdown-body {
    margin: 20px 0;
  }

  .el-tag, .autocomplete-inline-input {
    margin-left: 10px;
  }
</style>
