<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-submenu index="door">
      <template slot="title">传送门</template>
      <el-menu-item index="2-1" @click="goTo('/admin/article/articleWriter')">写文章</el-menu-item>
      <el-menu-item index="2-2">消息列表</el-menu-item>
      <el-menu-item index="2-3" @click="logout">退出</el-menu-item>
    </el-submenu>
    <el-menu-item index="message">
      <i class="el-icon-message-solid"></i>
    </el-menu-item>
    <el-menu-item class="header-icon">
      <el-image
          style="width: 100px; height: 50px"
          :src="iconUrl"></el-image>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {clearSession} from '@/plugins/sessionStorage'
export default {
  name: "Header",
  data() {
    return {
      activeDoor: 'door',
      iconUrl: require('@/assets/img/icon/ming-black.png'),
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(uri) {
      return this.$router.push(uri)
    },
    logout() {
      clearSession() // 删除本地保存token的sessionStorage键值对
      return this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.el-menu--horizontal > .el-menu-item, .el-menu--horizontal > .el-submenu {
  float: right;
}

.header-icon {
  float: left !important;
}
</style>
