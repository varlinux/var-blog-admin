<template>
  <!--  todo 待解决刷新当前页面数据没有回显问题-->
  <div class="wrapper">
    <el-button class="refresh-btn"
               size="mini"
               icon="el-icon-refresh"
               @click="init">刷新</el-button>
    <el-form ref="form" :model="form" label-width="80px" v-loading="loading">
      <el-input v-model="form.title" placeholder="输入标题..."></el-input>
      <mavon-editor v-model="form.content"
                    ref="md"
                    @imgAdd="$imgAdd"
                    :boxShadow="false"></mavon-editor>
      <el-form-item label="文章类型">
        <el-radio-group v-model="form.type">
          <el-radio
              v-for="item in artTypes"
              :key="item._id"
              :label="item.art_type_id">{{item.art_type_name}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
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
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {isExistInArray} from '@/utils/ArrayUtils'
  import {isNullForObject} from '@/utils/ObjectUtils'
  import {reverseTrans} from '@/utils/CharacterUtils'

  export default {
    name: "ArticleWriter",
    inject: ['reload'],
    data() {
      return {
        isShowTagInput: true,
        inputTagVal: '',
        formType: 'add',
        curTags: [],
        artTypes: [],
        markdownOption: {
          subfield: false
        },
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
          type: 0
        },
        loading: false
      }
    },
    mounted() {
      /**
       * 获取所有标签
       */
      this.$store.dispatch('tag/getAllTag').then(res => {
        if (res._code === 200) {
          this.curTags = res._data
          // 标签数据回显
          this.refreshTag()
        }
      })
      this.$store.dispatch('sys/artype/getArtypes', {}).then(res => {
        if (res) {
          this.artTypes = res._data
        }
      })
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
    },
    watch: {
      $route(to, from) {
        this.reload()
      }
    },
    methods: {
      // 表单初始化
      init() {
        // 页面从编辑按钮传递过来需要接收参数
        if (!isNullForObject(this.$route.query)) {
          let data = this.$route.query
          let tempKey
          for (let _key in data) {
            tempKey = _key.indexOf('atc_') === -1 ? _key : _key.slice(4)
            this.form[tempKey] = data[_key]
            if (_key === 'atc_content') {
              const newContent = reverseTrans(data[_key])
              this.form[tempKey] = reverseTrans(newContent)
            }
          }
          this.formType = "update"
          this.refreshTag()
        }
      },
      refreshTag() {
        this.form.dynamicTags = []  // 标签清空
        // 标签数据回显
        let existIndex = -1
        this.form.tag_ids.split(',').forEach(tagId => {
          existIndex = this.curTags.findIndex(item => item.tag_id === tagId)
          existIndex !== -1 ? this.form.dynamicTags.push(this.curTags[existIndex]) : ''
        })
      },
      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        const formdata = new FormData()
        formdata.append('image', $file)
        this.$store.dispatch('img/addImageToServer', formdata).then((res) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          if (res._code === 200) {
            // this.$vm.$img2Url(pos, data.url);
            this.$refs.md.$img2Url(pos, res._data.url)
          }
        })
      },
      onSubmit() {
        this.loading = true
        let _this = this
        _this.form.blog_user_id = this.userInfo.user_id
        _this.form.author = this.userInfo.user_name
        let methodType = this.formType === 'update' ? 'updateArticle' : 'addArticle'
        this.$store.dispatch('article/' + methodType, _this.form).then(res => {
          if (res._code === 200) {
            this.$message({
              type: 'success',
              message: "文章保存成功"
            })
            this.$router.push('/article/list')
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
        const isExist = isExistInArray(tags, 'tag_name', newTag.tag_name)
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
  .refresh-btn {
    margin-bottom: 0.5rem;
    border: 0;
    float: right;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .markdown-body {
    margin: 20px 0;
    width: calc(100vw - 250px);
  }

  .el-tag, .autocomplete-inline-input {
    margin-left: 10px;
  }
</style>
