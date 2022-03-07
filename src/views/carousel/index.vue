<template>
  <div>
    <div>
      <div style="margin-left: 20px;margin-top: 20px;font-weight: bold;font-size: 20px;">轮播图管理</div>
      <el-carousel indicator-position="outside" style="text-align: center">
        <el-carousel-item v-for="item in list" :key="item.id" >
          <img
            preview="111"
            :src="item.imgUrl"
            style="height: 100%;cursor: pointer" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="margin: 10px;">
      <el-button icon="el-icon-plus" type="primary" @click="handleOpenDialog">添加轮播图</el-button>
    </div>
    <div>
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="80">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="imgUrl"
          label="图片"
          width="120">
          <template slot-scope="scope">
            <img :preview="scope.row.id + scope.row.imgUrl" :src="scope.row.imgUrl" style="width: 50px;cursor: pointer" />
          </template>
        </el-table-column>
        <el-table-column prop="product" label="所属保险">
          <el-table-column
            prop="product.name"
            label="保险名称">
          </el-table-column>
          <el-table-column
            prop="product.price"
            label="保险价格（元）">
          </el-table-column>
          <el-table-column
            prop="product.category.name"
            label="所属分类">
          </el-table-column>
          <el-table-column
            prop="product.scope"
            label="销售地域">
          </el-table-column>
          <el-table-column
            prop="product.form"
            label="保单形式">
          </el-table-column>
          <el-table-column
            prop="product.planImgUrl"
            label="图片介绍">
            <template slot-scope="scope">
              <img :preview="scope.row.product.planImgUrl + scope.row.product.id" style="width: 50px;cursor: pointer" :src="scope.row.product.planImgUrl">
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEditData(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加轮播图"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item prop="imgUrl" label="图片">
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
        <el-form-item prop="product" label="对应产品" style="margin-top: 60px;">
          <el-select v-model="form.product.id" placeholder="请选择...">
            <el-option
              v-for="(item,index) in products"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return{
      rules:{
        imgUrl: [{required: true,message: '请上传轮播图图片或等待轮播图上传完毕！',trigger: 'blur'}],
        product: [{required: true,message: '请选择轮播图对应的产品！',trigger: 'blur'}]
      },
      headers: {
        satoken: window.sessionStorage.getItem('satoken')
      },
      list: [],
      dialogVisible: false,
      form: {
        imgUrl: '',
        product: {
          id: null
        }
      },
      products: []
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData(){
      this.getRequest('/carousel/all').then(resp => {
        if(resp){
          this.list = resp.data;
        }
      })
      this.getRequest('/product/all').then(resp => {
        if(resp){
          console.log(resp);
          this.products = resp.data;
        }
      })
    },
    handleEditData(data){
      console.log(data);
    },
    handleDelete(data){
      const id = data.id;
      this.$confirm('此操作将永久删除此轮播图，确认继续？','警告',{
        confirmButtonText: '继 续',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/carousel/' + id).then(resp => {
          if(resp){
            this.initData();
          }
        })
      }).catch(() => {
        this.$message.info('已取消');
      })
    },
    handleSuccessUpload(res,file,fileList) {
      const url = res.data.data.url;
      this.form.imgUrl = url;
    },
    handleErrorUpload(err,file,fileList){
      this.$message.error('文件上传失败，请联系管理员！');
    },
    handleRemovePic(file,fileList) {
      this.form.imgUrl = url;
    },
    handleOpenDialog() {
      this.dialogVisible = true;
      this.$notify({
        type: 'warning',
        title: '提示',
        message: '请等待图片提示上传成功后，再点击保存！',
        duration: -1
      });
    },
    handleConfirm(){
      this.$refs.form.validate((valid) => {
        if(valid){
          if(this.form.product.id === null){
            this.$message.error('请选择轮播图对应的产品！');
            return false;
          }
          this.postRequest('/carousel',this.form).then(resp =>{
            if(resp){
              console.log(resp);
              this.initData();
              this.$message.success('添加成功！');
              this.dialogVisible = false;
            }
          })
        }else{
          return false;
        }
      })
    }
  }

}
</script>

<style scoped>
</style>
