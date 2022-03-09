<template>
  <div style="margin: 20px;">
    <div class="header-text">保险分类管理</div>
    <div>
      <div style="display: flex;justify-content: flex-end;">
        <div>
          <el-button icon="el-icon-plus" @click="handleAdd">添加分类</el-button>
          <el-button type="primary" icon="el-icon-upload">导入数据</el-button>
          <el-button type="primary" icon="el-icon-download" @click="handleExport">导出数据</el-button>
        </div>
      </div>
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
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="form" :model="editData" label-width="80px" :rules="rules">
        <el-form-item prop="cateName" label="分类编号">
          <el-input v-model="editData.cateName" disabled></el-input>
        </el-form-item>
        <el-form-item prop="name" label="分类名称">
          <el-input v-model="editData.name" placeholder="请输入分类名称..."></el-input>
        </el-form-item>
        <el-form-item prop="parent" v-if="editData.parent !== null" label="父级菜单">
          <el-select v-model="editData.parent.cateName" placeholder="请选择父级菜单...">
            <el-option
              v-for="(item,index) in cateList"
              :key="index"
              :label="item.name"
              :value="item.cateName"
              v-if="item.parent === null">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="父级菜单">
          <el-tag type="warning">无</el-tag>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="addDialogVisible"
      width="30%">
      <el-form ref="addForm" :model="addData" label-width="80px" :rules="rules">
        <el-form-item prop="cateName" label="分类编号">
          <el-input v-model="addData.cateName" disabled></el-input>
        </el-form-item>
        <el-form-item prop="name" label="分类名称">
          <el-input v-model="addData.name" placeholder="请输入分类名称..."></el-input>
        </el-form-item>
        <el-form-item prop="check" label="根菜单">
          <el-switch v-model="isRootCate" active-color="#13ce66" inactive-color="#ff4949" @change="calcBySwitch"></el-switch>
        </el-form-item>
        <el-form-item prop="parent" label="父级菜单" v-if="!isRootCate">
          <el-select v-model="addData.parent.cateName" placeholder="请选择父级菜单" @change="calcHead">
            <el-option
              v-for="(item,index) in cateList"
              v-if="item.parent === null"
              :key="index"
              :value="item.cateName"
              :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return{
      rules:{
        name: [{required: true,message: '分类名称不可为空！',trigger: 'blur'}]
      },
      loading: false,
      activeName: 1,
      cateList: [],
      detailData: {
        cateName: '',
        name: ''
      },
      addDialogVisible: false,
      dialogVisible: false,
      editData: {
        cateName: '',
        name: '',
        parent: {}
      },
      isRootCate: false,
      addData: {
        cateName: '',
        name: '',
        parent: {
          cateName: ''
        }
      }
    }
  },
  computed: {
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
    calcHead(){
      let list = [];
      this.cateList.forEach((item,index) => {
        if(item.parent !== null && item.parent.cateName === this.addData.parent.cateName){
          list.push(item);
        }
      })
      this.addData.cateName = this.addData.parent.cateName.substr(0,6) + '_' + (list.length + 1);
    },
    handleExport(){
      window.open('http://localhost:8081/file/download/excel/category');
    },
    handleLookDetail(data) {
      this.detailData.cateName = data.cateName;
      this.detailData.name = data.name;
    },
    handleDelete(data){
      this.$confirm('该操作将删除[' + data.name + ']分类，确认继续？','警告',{
        confirmButtonText: '确 认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/category/' + data.cateName).then(resp => {
          this.initData();
        })
      }).catch(() => {
        this.$message.info('已取消');
      })
    },
    handleEdit(data){
      this.dialogVisible = true;
      console.log(data);
      this.editData = JSON.parse(JSON.stringify(data));
    },
    handleConfirm(){
      this.$refs.form.validate((valid) => {
        if(valid){
          // todo: 后端设置更新信息之后，对数据的编号进行处理
          this.putRequest('/category',this.editData).then(resp => {
            if(resp){
              this.dialogVisible = false;
              this.initData();
            }
          })
        }else{
          this.$message.error('请检查输入是否有误！');
          return false;
        }
      })
    },
    handleAdd() {
      this.addDialogVisible = true;
    },
    handleConfirmAdd() {
      console.log(this.addData);
      this.$refs.addForm.validate((valid) => {
        if(valid){
          this.postRequest('/category',this.addData).then(resp => {
            if(resp){
              this.addDialogVisible = false;
              this.initData();
            }
          })
        }else{
          return false;
        }
      })
    },
    calcBySwitch(data) {
      if(data){
        let list = [];
        this.cateList.forEach((item,index) => {
          if(item.parent === null){
            list.push(item);
          }
        })
        this.addData.cateName = 'cate_' + (list.length + 1);
        this.addData.parent = null;
      }else{
        this.addData.cateName = '';
        this.addData.parent = {
          cateName:  ''
        };
      }
    }
  }
}
</script>

<style>
.el-collapse-item__header{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 30px!important;
}
.header-text{
  margin: 10px;
  font-weight: bold;
  font-size: 40px;
}
</style>
