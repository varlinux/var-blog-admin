<template>
  <div v-show="visible">
    <div class="detail-pop-box">
      <el-divider content-position="center">任务详情</el-divider>
      <slot></slot>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '标题'
      }
    }
  }
</script>

<style scoped>
  .mask-layer {
    position: absolute;
    float: top;
    left: 0;
    top: 0;
    width: 100%;
    height: 200%;
    background: #000;
    z-index: 1000;
    opacity: .5;
  }

  .detail-pop-box {
    position: absolute;
    top: 2rem;
    left: 50%;
    width: 30rem;
    transform: translate(-50%);
    background-color: #fff;
    z-index: 1001;
    padding: 2rem;
  }
</style>
