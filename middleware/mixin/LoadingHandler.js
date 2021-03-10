export default {
  methods: {
    loadingStart (ele) {
      this.loading = this.$loading({
        target: ele || document.getElementsByClassName('app-container')[0],
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    loadingEnd () {
      this.loading.close()
    },
  }
}
