<template>
  <pop-box v-show="visible" :title="title">
    <el-form ref="form" :model="curData" label-width="80px" size="mini">
      <el-form-item label="编号">
        <el-input v-model="curData._id" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="curData.site_task_name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="curData.site_task_desc"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="curData.site_task_type" size="medium">
          <el-radio :label="1">前台</el-radio>
          <el-radio :label="2">后台</el-radio>
          <el-radio :label="3">服务器</el-radio>
          <el-radio :label="4">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="curData.site_task_icon"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-tooltip :content="'Switch value: ' + curData.site_task_status" placement="top">
          <el-switch
              v-model="curData.site_task_status"
              active-color="#13ce66"
              inactive-color="rgb(176,176,176)"
              active-value="1"
              inactive-value="0">
          </el-switch>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="优先级">
        <el-input v-model="curData.site_task_level"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
            type="daterange"
            readonly
            range-separator="至"
            :start-placeholder="curData.site_task_create_time"
            :end-placeholder="curData.site_task_edit_time">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="进度">
        <el-steps :space="200" :active="curData.site_task_progress" finish-status="success">
          <el-step title="未开始"></el-step>
          <el-step title="进行中"></el-step>
          <el-step title="已完成"></el-step>
          <el-step title="已结束"></el-step>
        </el-steps>
        <el-button type="success"
                   @click="next"
                   size="mini"
                   round>下一阶段</el-button>
      </el-form-item>
      <el-form-item size="large" class="tac">
        <el-button type="primary" @click="handleSubmit(curData)">保存</el-button>
        <el-button @click="closeDetail">取消</el-button>
      </el-form-item>
    </el-form>
  </pop-box>
</template>

<script>
  import PopBox from '@/components/PopBox'

  export default {
    name: "DetailPopBox",
    inject: ['reload'],
    watch: {
      visible: function (old, now) {
        console.log(`old : `, old, `now : `, now)
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      curData: {
        type: Object,
        default: {}
      },
      title: {
        type: String,
        default: '任务详情'
      }
    },
    components: {
      PopBox
    },
    mounted() {
      console.log(`this.isShow : `, this.isShow)
      console.log(`this.curData : `, this.curData)
    },
    methods: {
      next() {
        if (this.curData.site_task_progress++ > 3) this.curData.site_task_progress = 0;
      },
      closeDetail() {
        this.$parent.$data.isShowDetail = false
      },
      handleSubmit(data) {
        this.$store.dispatch('updateTask', data).then(res => {
          if (res) {
            if (res) {
              this.$message.success('任务更新成功')
              this.reload()
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
