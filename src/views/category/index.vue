<template>
  <div style="margin: 20px;">
    <div style="margin: 10px;font-weight: bold;font-size: 40px;">保险分类管理</div>
    <div>
      <el-table
        :data="cateList"
        style="width: 100%">
        <el-table-column
          type="selection"
        >
        </el-table-column>
        <el-table-column
          prop="cateName"
          label="分类编号"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="中文名称"
        >
        </el-table-column>
        <el-table-column
          prop="parent"
          label="父级分类">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.parent === null">无父级菜单</el-tag>
            <el-popover
              v-else
              placement="right-start"
              title="详情"
              width="200"
              trigger="click">
              <el-form label-width="80">
                <el-form-item label="父级分类编号:">
                  <div>{{ detailData.cateName }}</div>
                </el-form-item>
                <el-form-item label="父级分类名称：">
                  <div>{{ detailData.name }}</div>
                </el-form-item>
              </el-form>
              <el-tag type="success" style="cursor: pointer;" slot="reference" @click="handleLookDetail(scope.row.parent)">查看详情</el-tag>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return{
      loading: false,
      activeName: 1,
      cateList: [],
      detailData: {
        cateName: '',
        name: ''
      }
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData(){
      this.loading = true;
      this.getRequest('/category/all').then(resp => {
        if(resp){
          this.cateList = resp.data;
        }
      })
      this.loading = false;
    },
    handleLookDetail(data) {
      this.detailData.cateName = data.cateName;
      this.detailData.name = data.name;
    }
  }
}
</script>

<style>
.el-collapse-item__header{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 30px!important;
}
</style>
