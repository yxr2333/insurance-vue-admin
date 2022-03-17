<template>
  <div>
    <div class="header">
      <div class="header-left">
        <el-input v-model="searchName" placeholder="请输入姓名进行查询..." style="width: 200px;margin-right: 5px;"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="header-right">
        <el-button type="primary" icon="el-icon-download">导出数据</el-button>
      </div>
    </div>
    <div style="margin: 20px;">
      <el-form ref="form" :model="form" label-width="80px" label-position="left">
        <el-row >
          <el-col :span="5">
            <el-form-item label="用户">
              <el-input v-model="form.name" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="IP地址">
              <el-input v-model="form.ip" class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="IP来源">
              <el-input v-model="form.ip_address" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="5">
            <el-form-item label="操作系统">
              <el-input v-model="form.os" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="浏览器">
              <el-input v-model="form.browser" class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备类型">
              <el-input v-model="form.type" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="margin: 20px;display: flex;flex-direction: column;align-items: flex-end;">
      <el-table
        border
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="selection"
          fixed="left">
        </el-table-column>
        <el-table-column
          prop="user.username"
          label="用户">
        </el-table-column>
        <el-table-column
          prop="time"
          label="登陆时间">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="登录ip">
        </el-table-column>
        <el-table-column
          prop="address"
          label="ip来源">
        </el-table-column>
        <el-table-column
          prop="os"
          label="操作系统">
        </el-table-column>
        <el-table-column
          prop="browser"
          label="浏览器">
        </el-table-column>
        <el-table-column
          prop="deviceType"
          label="设备类型">
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
  </div>
</template>

<script>
export default {
  name: "Logger",
  data() {
    return {
      loading: false,
      searchName: '',
      form: {
        name: '',
        ip: '',
        ip_address: '',
        os: '',
        browser: '',
        type: ''
      },
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: -1
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData(){
      this.loading = true;
      let url = '/logger/all?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
      this.getRequest(url).then(resp => {
        if(resp){
          this.total = resp.data.total;
          this.tableData = resp.data.data;
        }
      });
      // this.loading = false;
      setTimeout(() => {this.loading = false;},800);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.initData();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.initData();
    }
  }
}
</script>

<style type="less">
.header{
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.my-input{
  width: 200px;
}
</style>
