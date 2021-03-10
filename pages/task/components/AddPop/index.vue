<template>
  <pop-box>
    <el-form ref="form" :model="dataForm" label-width="80px" size="mini">
      <el-form-item label="名称">
        <el-input v-model="dataForm.site_task_name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="dataForm.site_task_desc"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="dataForm.site_task_type" size="medium">
          <el-radio :label="1">前台</el-radio>
          <el-radio :label="2">后台</el-radio>
          <el-radio :label="3">服务器</el-radio>
          <el-radio :label="4">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="dataForm.site_task_icon"></el-input>
      </el-form-item>
      <el-form-item label="优先级">
        <el-input v-model="dataForm.site_task_level"></el-input>
      </el-form-item>
      <el-form-item label="进度">
        <el-steps :active="dataForm.site_task_progress" finish-status="success">
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
        <el-button type="primary" @click="handleSubmit(dataForm)">保存</el-button>
        <el-button @click="closeDetail">取消</el-button>
      </el-form-item>
    </el-form>
  </pop-box>
</template>

<script>
  import PopBox from '@/components/PopBox'
  export default {
    name: "AddPopBox",
    inject: ['reload'],
    data() {
      return {
        dataForm: {
          site_task_name: "",
          site_task_desc: "",
          site_task_type: 1,
          site_task_icon: "",
          site_task_level: 0,
          site_task_progress: 0,
        }
      }
    },
    components: {
      PopBox
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '添加任务'
      }
    },
    methods: {
      next() {
        if (this.dataForm.site_task_progress++ > 3) this.dataForm.site_task_progress = 0;
      },
      closeDetail() {
        this.$parent.$data.isShowAdd = false
      },
      handleSubmit(data) {
        console.log(`data : `, data)
        this.$store.dispatch('insertTask', {
          taskList: [data]
        }).then(res => {
          if (res) {
            this.$message.success('任务添加成功')
            this.reload()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
