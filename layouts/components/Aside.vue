<template>
    <div>
        <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
            <!--<el-radio-button :label="false">展开</el-radio-button>-->
            <!--<el-radio-button :label="true">收起</el-radio-button>-->
        <!--</el-radio-group>-->
        <!--<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">-->
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">文章</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="goTo('/admin/article/articleWriter')">写文章</el-menu-item>
                    <el-menu-item index="/article/list" @click="goTo('/admin/article/articleList')">列表
                    </el-menu-item>
                    <el-menu-item index="1-4">模板</el-menu-item>
                    <el-menu-item index="1-2">模板</el-menu-item>
                    <el-menu-item index="1-3">回收站</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-collection-tag"></i>
                    <span slot="title">标签</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" @click="goTo('/admin/tag/tagList')">列表</el-menu-item>
                    <el-menu-item index="2-2">样式</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-chat-square"></i>
                    <span slot="title">留言</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1">列表</el-menu-item>
                    <el-menu-item index="3-2">已回复</el-menu-item>
                    <el-menu-item index="3-3">黑名单</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="4-1" @click="goTo('/admin/sys/menuTree')">导航栏</el-menu-item>
                    <el-menu-item index="4-2">图片</el-menu-item>
                    <el-menu-item index="4-3">样式</el-menu-item>
                    <el-menu-item index="4-4">日志</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span slot="title">数据</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="5-1">文章</el-menu-item>
                    <el-menu-item index="5-2">爬虫</el-menu-item>
                    <el-menu-item index="5-3">系统</el-menu-item>
                    <el-menu-item index="5-4">第三方</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-attract"></i>
                    <span slot="title">爬虫</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="6-1">列表</el-menu-item>
                    <el-menu-item index="6-2">设置</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">第三方</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="7-1">天气</el-menu-item>
                    <el-menu-item index="7-2">地图</el-menu-item>
                    <el-menu-item index="7-3">机器人</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8">
                <template slot="title">
                    <i class="el-icon-picture"></i>
                    <span slot="title">图片</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="8-1" @click="goTo('/admin/pic/picGithub')">Github</el-menu-item>
                    <el-menu-item index="8-2">系统</el-menu-item>
                    <el-menu-item index="8-3">文章</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9">
                <template slot="title">
                    <i class="el-icon-notebook-1"></i>
                    <span slot="title">任务</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="8-1" @click="goTo('/admin/task/list')">前台</el-menu-item>
                    <el-menu-item index="8-2" @click="goTo('/admin/task/admin')">回收站</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(uri) {
      return this.$router.push(uri)
    }
  }
}
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
