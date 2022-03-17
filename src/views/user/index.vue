<template>
  <div style="margin: 20px;">
    <div style="display: flex;justify-content: space-between">
      <div>
        <el-input
          style="width: 200px;margin-right: 5px;"
          placeholder="请输入用户名.."
          v-model="inputName"
          @keydown.enter.native="handleSearch">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch" >搜索</el-button>
        <el-button :icon="advSearchBtnIcon" type="primary" @click="handleAdvSearch">高级搜索</el-button>
        <el-collapse-transition style="height: 100px">
          <div v-show="advanceSearchVisible">
            <el-empty description="暂未完成，静候更新"></el-empty>
          </div>
        </el-collapse-transition>

      </div>
      <div>
        <el-button icon="el-icon-plus" @click="handleAddUser">添加</el-button>
        <el-button icon="el-icon-upload" type="primary" @click="handleImport">导入表格</el-button>
        <el-button icon="el-icon-download" type="primary" @click="handleExport">导出表格</el-button>
      </div>
    </div>
    <div style="margin-top: 15px;display: flex;flex-direction: column;align-items: flex-end;">
      <el-table
        v-loading="loading"
        :data="tableData"
        :border="true"
        :stripe="true"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55"
          fixed="left">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.gender === '男' ? 'primary' : 'danger'">{{ scope.row.gender }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="80">
        </el-table-column>
        <el-table-column
          prop="faceIcon"
          label="头像"
          width="100">
          <template slot-scope="scope">
            <img :src="scope.row.faceIcon" alt="" :preview="scope.row.id" style="width: 50px;border-radius: 50%;cursor: pointer;">
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="200">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="220">
        </el-table-column>
        <el-table-column
          prop="userStatus"
          label="状态"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleChangeStatus(scope.row)"
              v-model="scope.row.userStatus"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="修改时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roles"
          label="角色"
          width="100">
          <template slot-scope="scope">
            <el-tag type="primary" v-for="item in scope.row.roles" :key="item.id">{{ item.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleEditUser(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button @click="handleDeleteUser(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5,10,20,30,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%">
      <el-form ref="form" :model="addUserData" label-width="80px" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="addUserData.username" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserData.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="addUserData.name" autocomplete="off" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="addUserData.gender" placeholder="请选择性别">
            <el-option value="男" label="男"></el-option>
            <el-option value="女" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserData.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelAddUser">取 消</el-button>
        <el-button type="primary" @click="handleSubmitAddUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="50%">
      <el-form ref="editUserForm" :model="editForm" label-width="80px" :rules="editRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" placeholder="请输入用户名..."></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入姓名..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"  type="password" placeholder="请输入密码..."></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="faceIcon"style="cursor: pointer">
          <div @click="handleChangeAvatar">
            <el-avatar :src="editForm.faceIcon" ></el-avatar>
          </div>
          <my-upload field="file"
                     @crop-success="cropSuccess"
                     @crop-upload-success="cropUploadSuccess"
                     @crop-upload-fail="cropUploadFail"
                     v-model="avatarShow"
                     :width="300"
                     :height="300"
                     :headers="headers"
                     url="/file/upload"
                     img-format="png">
          </my-upload>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="editForm.gender" placeholder="请选择性别...">
            <el-option value="男" label="男"></el-option>
            <el-option value="女" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editForm.age" placeholder="请输入年龄..."></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone" placeholder="请输入联系电话..."></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" placeholder="请输入邮箱..."></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address" placeholder="请输入地址..."></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="address">
          <el-select v-model="editForm.roles[0].id">
            <el-option v-for="item in roleData" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitEditUser('editUserForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload/upload-2";
import fileDownload from 'js-file-download';
import axios from "axios";
export default {
  name: "control",
  components: {
    'my-upload': myUpload
  },
  data(){
    return {
      avatarShow: false,
      headers: {
        satoken: window.sessionStorage.getItem('satoken')
      },
      roleData: [],
      editForm: {
        roles: [
          {
            id: 1
          }
        ]
      },
      editDialogVisible: false,
      advSearchBtnIcon: "el-icon-arrow-down",
      advCheckFlag: false,
      tableData: [],
      loading: false,
      pageNum: 1,
      pageSize: 10,
      inputName: '',
      addUserData: {
        username: '',
        name: '',
        password: '',
        gender: '',
        email: ''
      },
      total: null,
      addDialogVisible: false,
      rules: {
        username:[
          {required: true,message: '请输入账号名', trigger: 'blur'},
          {min: 4, max: 20,message: '长度在4到20个字符之间',trigger: 'blur'}
        ],
        password: [
          {required: true,message: '请输入用户的密码', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入用户的真实姓名',trigger: 'blur'},
          {min: 2, max: 15,message: '长度在2到15个字符之间',trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择用户的性别', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入用户的邮箱地址', trigger: 'blur'},
          {type: 'email', message: '邮箱地址不正确'}
        ]
      },
      editRules: {
        username:[
          {required: true,message: '请输入账号名', trigger: 'blur'},
          {min: 4, max: 20,message: '长度在4到20个字符之间',trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入用户的真实姓名',trigger: 'blur'},
          {min: 2, max: 15,message: '长度在2到15个字符之间',trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择用户的性别', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入用户的密码',trigger: 'blur'}
        ]
      },
      advanceSearchVisible: false
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    handleSubmitEditUser(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.putRequest('/user',this.editForm).then(resp => {
            if(resp){
              this.initData();
              this.editDialogVisible = false;
            }
          })
        }else{
          return false;
        }
      })
    },
    toggleShow(){
      this.avatarShow = !this.avatarShow;
    },
    cropSuccess(imgDataUrl,field){
      this.$message.success('裁剪完成');
    },
    cropUploadSuccess(jsonData,field){
      console.log(jsonData);
      const code = jsonData.code;
      if(code === 200){
        this.$notify({
          type: 'success',
          title: '上传成功',
          message: '图片已成功上传至后台仓库'
        })
        this.editForm.faceIcon = jsonData.data;
      } else{
        this.$notify({
          type: 'error',
          title: '上传失败',
          message: '图片上传失败，请联系管理员'
        })
      }
    },
    cropUploadFail(status,field){
      this.$notify({
        type: 'error',
        title: '错误',
        message: '后端接口调用失败，请联系管理员或检查网络是否通畅！'
      })
    },
    handleChangeAvatar(){
      console.log('111');
      this.toggleShow();
    },
    handleChangeStatus(data){
      if(data !== null){
        let str = data.userStatus ? '启用' : '封禁';
        this.$confirm('此操作将' + str +  '：[' + data.name + ']用户，是否继续？','警告',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.putRequest('/user',data).then(resp => {
            if(resp){
              this.initData();
            }
          })
        }).catch(() => {
          data.userStatus = !data.userStatus;
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    handleSizeChange(val){
      this.pageSize = val;
      this.initData();
    },
    handleCurrentChange(val){
      this.pageNum = val;
      this.initData();
    },
    handleCancelAddUser(){
      this.$refs['form'].resetFields();
      this.addDialogVisible = false;
    },
    handleSubmitAddUser(){
      this.$refs['form'].validate((valid) => {
        if(valid){
          this.postRequest('/user',this.addUserData).then(resp => {
            if(resp){
              this.addDialogVisible = false;
              this.$refs['form'].resetFields();
              this.initData();
            }
          })
        }else{
          this.$notify.error({
            title: '添加失败',
            message: '请检查输入是否有误！'
          });
          return false;
        }
      });
    },
    handleSearch(){
      let url = '/user?name=' + this.inputName;
      this.getRequest(url).then(resp => {
        if(resp){
          console.log(resp);
          this.tableData = resp.data;
        }
      })
    },
    handleDeleteUser(data){
      if(data !== null){
        this.$confirm('此操作将删除：[' + data.name + ']用户，是否继续？','警告',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/user/' + data.id).then(resp => {
            if(resp){
              this.initData();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    handleEditUser(row){
      console.log(row);
      this.editDialogVisible = true;
      this.editForm = JSON.parse(JSON.stringify(row));
    },
    handleAdvSearch(){
      this.advSearchBtnIcon = this.advCheckFlag ? 'el-icon-arrow-down' : 'el-icon-arrow-up';
      this.advCheckFlag = !this.advCheckFlag
      this.advanceSearchVisible = !this.advanceSearchVisible;
    },
    handleAddUser(){
      this.addDialogVisible = true;
    },
    handleImport(){

    },
    handleExport(){
      window.open('http://localhost:8081/file/download/excel/user');
      this.$notify({
        type: 'success',
        title: '导出成功',
        dangerouslyUseHTMLString: true,
        message: '部分信息显示可能不全，<strong>请尝试调整每一列的宽度来解决此问题</strong>',
        duration: 0
      })
    },
    initData() {
      this.loading = true;
      let url = '/user/all'
      if(this.pageSize !== null && this.pageNum !== null){
        url = '/user/all?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
      }
      this.getRequest(url).then(resp => {
        if(resp){
          this.tableData = resp.data.data;
          this.total = resp.data.total;
          this.loading = false;
        }
      })
      const roles = window.sessionStorage.getItem("roles");
      if(roles === undefined || roles === null){
        this.getRequest('/role/all').then(resp => {
          if(resp){
            this.roleData = resp.data;
            window.sessionStorage.setItem("roles",JSON.stringify(this.roleData));
          }
        })
      }else{
        this.roleData = JSON.parse(roles);
      }
    }
  }
}
</script>

<style scoped>

</style>
