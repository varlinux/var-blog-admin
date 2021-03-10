<template>
  <el-card class="menu-tree-container">
    <div class="custom-tree-container">
      <h3>Ming Blog首页</h3>
      <el-tree
          :data="data"
          node-key="dir_menu_order"
          default-expand-all
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.data.dir_menu_name }}</span>
            <span>
              <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-top"
                  @click="() => appendTop(data)">
                前方添加
              </el-button>
              <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-bottom"
                  @click="() => appendBottom(data)">
                后方添加
              </el-button>
              <el-button
                  v-show="data._id"
                  type="text"
                  size="mini"
                  icon="el-icon-document-add"
                  @click="() => appendChild(data)">
                添加子菜单
              </el-button>
              <el-button
                  v-show="data._id"
                  type="text"
                  size="mini"
                  icon="el-icon-edit"
                  @click="() => rename(data)">
                重命名
              </el-button>
              <el-button
                  v-show="!data.dir_menu_url && data._id"
                  type="text"
                  size="mini"
                  icon="el-icon-unlock"
                  @click="() => activeMenu(data)">
                激活
              </el-button>
              <el-button
                  v-show="data._id"
                  type="text"
                  size="mini"
                  icon="el-icon-key"
                  @click="() => getUrl(data)">
                查看权限
              </el-button>
              <el-button
                  v-show="data._id"
                  type="text"
                  size="mini"
                  icon="el-icon-delete"
                  @click="() => remove(node, data)">
                删除
              </el-button>
            </span>
          </span>
      </el-tree>
    </div>
    <div class="custom-tree-container-footer">
      <el-button
          type="primary"
          @click="() => saveMenu()">
        保存
      </el-button>
      <el-button
          @click="() => reset()">
        重置
      </el-button>
    </div>
  </el-card>
</template>

<script>
  let id = 1000;

  export default {
    inject: ['reload'],
    data() {
      return {
        data: [],
        newMenuCount: 1
      }
    },
    mounted() {
      this.$store.dispatch('getIndexMenu').then(res => {
        if (res) {
          const {_data} = res
          this.data = _data.sort((item1, item2) => {
            return item1.dir_menu_order - item2.dir_menu_order
          })
          console.log(`_data : `, _data)
        }
      })
    },
    methods: {
      saveMenu() {
        console.log()
        this.$store.dispatch('insertMenu', {
          menuList: this.data,
          type: 1
        }).then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
          }
        })
      },
      reset() {
        this.reload()
      },
      activeMenu(data) {
        this.$prompt('请输入权限路径', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          try {
            data.dir_menu_url = value // 变更权限路径
            this.$store.dispatch('updateMenu', data).then(res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: '权限路径: ' + value + ' 激活成功！'
                })
              }
            })
          } catch (e) {
            this.$message({
              type: 'error',
              message: '激活失败，请稍后尝试'
            })
          }
        })
      },
      getUrl(data) {
        this.$alert('权限查看', '权限', {
          confirmButtonText: '确定',
          message: `权限路径为: ${ data.dir_menu_url }`
        });
      },
      appendTop(data) {
        this.data = this.addFn('top', this.data, data)
        console.log(`this.data : `, this.data)
      },
      appendBottom(data) {
        this.data = this.addFn('bottom', this.data, data)
        console.log(`this.data : `, this.data)
      },
      addFn(type, _d, _n) {
        _d = Array.from(_d)
        const _index = _d.indexOf(_n) + (type === 'top' ? 0 : 1)
        _d.splice(_index, 0, {
          dir_menu_name: '新菜单' + this.newMenuCount++,
          dir_menu_parent_id: _n.dir_menu_parent_id,
          dir_menu_order: 0
        })
        _d.forEach((item, index) => {
          item.dir_menu_order = index
        })
        return _d
      },
      appendChild(data) {
        const newChild = {
          dir_menu_order: 1,
          dir_menu_name: '新菜单' + this.newMenuCount++,
          dir_menu_parent_id: data._id
        }
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        console.log(`appendChild : `, newChild)
        data.children.push(newChild);
      },
      rename(data) {
        this.$prompt('请输入新的菜单名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          try {
            let methodName = ''
            let formData = Object.create(null)
            data.dir_menu_name = value // 变更名称
            if (data._id) {
              methodName = 'updateMenu'
              formData = {menuObj: data}
            } else {
              methodName = 'insertMenu'
              formData = {menuList: [data], type: 1}
            }
            console.log(`this.data: `, this.data, `methodName`, methodName, formData)
            this.$store.dispatch(methodName, formData).then(res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: '更新完成！新菜单名称: ' + value
                })
              }
            })
          } catch (e) {
            this.$message({
              type: 'error',
              message: '更新失败，请稍后尝试'
            })
          }
        })
      },
      remove(node, data) {
        this.$confirm(`此操作将删除 "${data.dir_menu_name}", 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === data.id)
          children.splice(index, 1)
          this.$store.dispatch('deleteMenu', data._id).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
      }
    }
  };
</script>

<style scoped>
  .menu-tree-container {
    min-width: 70vw;
    text-align: center;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .custom-tree-container-footer {
    margin-top: 30px;
  }
</style>
