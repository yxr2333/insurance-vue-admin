<template>
  <div style="margin: 20px;">
    <div class="header-helper">
      <div>
        <el-input v-model="searchProductName" placeholder="请输入产品名称..." style="width: 200px;margin-right: 5px;" @keydown.enter.native="handleSearchViaName"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearchViaName">搜索</el-button>
        <el-button type="primary" :icon="advSearchBtnIcon" @click="handleAdvSearch">高级搜索</el-button>
        <el-collapse-transition>
          <div v-show="advSearchVisible">
            <el-empty description="暂未完成，静候更新"></el-empty>
          </div>
        </el-collapse-transition>
      </div>
      <div>
        <el-button icon="el-icon-plus" @click="addDialogVisible = true" >添加</el-button>
        <el-button icon="el-icon-upload" type="primary">导入数据</el-button>
        <el-button icon="el-icon-download" type="primary" @click="handleExport">导出数据</el-button>
      </div>
    </div>
    <div>
      <el-table
        v-loading = loading
        :data="productTableData"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="80">
        </el-table-column>
        <el-table-column
          prop="id"
          label="产品编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="保险名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="intro"
          label="介绍"
          width="80">
          <template slot-scope="scope">
            <el-tag
              style="cursor: pointer"
              type="primary"
              v-if="scope.row.intro !== null && scope.row.intro !== '' && scope.row.intro !== undefined"
              @click="handleOpenIntroDialog(scope.row)">...</el-tag>
            <el-tag type="warning" v-else>暂无介绍</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格(元)"
          width="80">
        </el-table-column>
        <el-table-column
          prop="category.name"
          label="所属分类"
          width="120">
        </el-table-column>
        <el-table-column
          prop="time"
          label="有效期限(年)"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="suitPeople"
          label="适用人群"
          width="150">
        </el-table-column>
        <el-table-column
          prop="scope"
          label="销售区域"
          width="120">
        </el-table-column>
        <el-table-column
          prop="form"
          label="保单形式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="planImgUrl"
          label="计划图片"
          width="100">
          <template slot-scope="scope">
            <img :preview="scope.row.id + scope.row.name" :src="scope.row.planImgUrl" style="width: 50px;cursor: pointer">
          </template>
        </el-table-column>
        <el-table-column
          prop="productUrlList"
          label="产品图鉴"
          width="100">
          <template slot-scope="scope">
            <img
              v-show="item.id === 1"
              v-for="item in scope.row.productUrlList"
              :key="item.id"
              style="width: 50px;cursor: pointer;"
              :preview="scope.row.id"
              :src="item.imgUrl" />
          </template>
        </el-table-column>
        <el-table-column
          prop="questions"
          label="产品问答">
          <template slot-scope="scope">
            <el-tag
              type="primary"
              v-if="scope.row.questions !== null && scope.row.questions !== undefined && scope.row.questions.length !== 0"
              @click="handleOpenQuesDialog(scope.row)">
              查看详情
            </el-tag>
            <el-tag type="warning" v-else>暂无信息</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          header-align="center"
          align="center"
          width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEditData(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDeleteData(scope.row)">删除</el-button>
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
      title="介绍"
      :visible.sync="productDialogVisible"
      width="30%">
      <div>保险名称： {{ productIntroData.name }}</div>
      <div>保险介绍：{{productIntroData.intro}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="productDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="问题详情"
      :visible.sync="productQuesDialogVisible"
      width="30%">
      <el-form label-width="80px">
        <div v-for="item in questions" :key="item.id">
          <el-form-item label="问题：">
            <div>{{item.question}}</div>
          </el-form-item>
          <el-form-item label="回答：">
            <div>{{ item.ans }}</div>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="productQuesDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加产品"
      :visible.sync="addDialogVisible"
      width="50%">
      <el-form ref="addForm" :model="formData" label-width="80px">
        <el-form-item label="保险名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入保险名..."></el-input>
        </el-form-item>
        <el-form-item label="保险介绍" prop="intro">
          <el-input v-model="formData.intro" placeholder="请输入保险介绍..."></el-input>
        </el-form-item>
        <el-form-item label="保险价格" prop="price">
          <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formData.price" placeholder="请输入价格..."></el-input>
        </el-form-item>
        <el-form-item label="保险分类" prop="category">
          <el-select v-model="formData.category.cateName" placeholder="请选择...">
            <el-option-group
              v-for="(item1,index1) in cateList"
              v-if="item1.parent === null"
              :key="index1"
              :label="item1.name">
              <el-option
                v-for="(item2,index2) in cateList"
                :key="index2"
                :value="item2.cateName"
                :label="item2.name"
                v-show="item2.parent !== null && item2.parent.cateName === item1.cateName">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="保险时长" prop="time">
          <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="formData.time" placeholder="请输入保险时长..."></el-input>
        </el-form-item>
        <el-form-item label="适用人群" prop="suitPeople">
          <el-input v-model="formData.suitPeople" placeholder="适用人群"></el-input>
        </el-form-item>
        <el-form-item label="销售地区" prop="scope">
          <el-select v-model="formData.scope">
            <el-option value="中国大陆" label="中国大陆"></el-option>
            <el-option value="台湾地区" label="台湾地区"></el-option>
            <el-option value="港澳地区" label="港澳地区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保单形式" prop="form">
          <el-select v-model="formData.form">
            <el-option value="电子保单" label="电子保单形式"></el-option>
            <el-option value="纸质保单" label="纸质保单形式"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保险计划" prop="plan">
          <el-upload
            :limit="2"
            :drag="true"
            :headers="headers"
            action="/file/upload"
            list-type="picture-card"
            :on-success="handleSuccessUpload"
            :on-error="handleErrorUpload"
            :on-remove="handleRemovePic"
            ref="fileUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
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
  name: "Product",
  data(){
    return{
      pageNum: 1,
      pageSize: 10,
      total: 0,
      headers: {
        satoken: window.sessionStorage.getItem('satoken')
      },
      addDialogVisible: false,
      loading: false,
      productQuesDialogVisible: false,
      productDialogVisible: false,
      questions: [],
      productTableData: [],
      productIntroData: {
        name: '',
        intro: ''
      },
      searchProductName: '',
      advSearchBtnIcon: 'el-icon-caret-bottom',
      advSearchVisible: false,
      formData: {
        name: '',
        intro: '',
        price: 0.0,
        category: {
          cateName: ''
        },
        time: 0,
        suitPeople: '',
        scope: '',
        form: '',
        planImgUrl: ''
      },
      cateList: [],
    }
  },
  methods: {
    initData(){
      this.loading = true;
      this.getRequest('/product/all?pageNum='+this.pageNum+'&pageSize=' + this.pageSize).then(resp => {
        if(resp){
          this.productTableData = resp.data.data;
          this.total = resp.data.total;
        }
          this.loading = false;
      })
      this.getRequest('/category/all').then(resp => {
        if(resp){
          this.cateList = resp.data;
        }
      })
    },
    handleSearchViaName(){
      this.loading = true;
      this.getRequest('/product?name=' + this.searchProductName).then(resp => {
        if(resp){
          this.productTableData = resp.data;
        }
          this.loading = false;
      })
    },
    handleAdvSearch() {
      this.advSearchBtnIcon =  this.advSearchVisible ? 'el-icon-caret-bottom' : 'el-icon-caret-top';
      this.advSearchVisible = !this.advSearchVisible;
    },
    handleOpenIntroDialog(data){
      this.productDialogVisible = true;
      this.productIntroData.name = data.name;
      this.productIntroData.intro = data.intro;
    },
    handleOpenQuesDialog(data) {
      this.productQuesDialogVisible = true;
      this.questions = data.questions;
    },
    handleEditData(data) {
      this.$notify({
        type: 'success',
        title: '编辑',
        message: '编辑' + data.name + '产品'
      })
    },
    handleDeleteData(data) {
      console.log(data);
      this.$confirm('此操作将删除：[' + data.name + ']产品，是否继续？','警告',{
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let id = data.id;
        this.deleteRequest('/product/' + id).then(resp => {
          if(resp){
            this.initData();
          }
        })
      }).catch(() => {
        this.$message.info('已取消');
      })
    },
    handleExport() {
      window.open('http://localhost:8081/file/download/excel/product');
    },
    handleSuccessUpload(res,file,fileList) {
      const url = res.data.data.url;
      this.formData.planImgUrl = url;
    },
    handleErrorUpload(err,file,fileList){
      this.$message.error('文件上传失败，请联系管理员！');
    },
    handleRemovePic(file,fileList) {
      this.formData.planImgUrl = '';
    },
    handleConfirmAdd() {
      console.log(this.formData);
      this.loading = true;
      this.postRequest('/product',this.formData).then(resp => {
        if(resp){
          this.loading = false;
          this.addDialogVisible = false;
          this.initData();
        }
      })
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.initData();
    },
    handleCurrentChange(num) {
      this.pageNum = num;
      this.initData();
    }
  },
  mounted(){
    this.initData();
  }
}
</script>

<style scoped>
  .header-helper{
    display: flex;
    justify-content: space-between;
  }
</style>
