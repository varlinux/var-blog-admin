<template>
  <div class="app-wrapper">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <Aside></Aside>
        <AppMain></AppMain>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header'
import Aside from './components/Aside'
import AppMain from "./AppMain"

export default {
  name: "layout",
  components: {
    Header,
    Aside,
    AppMain
  },
  mounted() {
  }
}
</script>

<style scoped>
* {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.el-header {
  padding: 0 0 !important;
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
