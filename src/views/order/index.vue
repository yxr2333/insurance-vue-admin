<template>
  <div style="margin: 15px">
    <div class="header">
      <div>
        <el-input
          auto-complete="false"
          v-model="orderId"
          style="width: 180px; margin-right: 10px"
          placeholder="请输入订单编号..."
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" :icon="advBtuIcon" @click="handleAdvSearch">高级搜索</el-button>
        <el-collapse-transition>
          <div v-show="iconFlag" style="margin-top: 10px;">
            <el-form ref="form" :model="form" label-width="80px" :inline="true">
              <el-form-item label="订单状态" prop="status">
                <el-select v-model="form.status" placeholder="请选择订单状态...">
                  <el-option value="-1" label="已支付"></el-option>
                  <el-option value="0" label="进行中"></el-option>
                  <el-option value="1" label="已完成"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="支付方式" prop="channel">
                <el-select v-model="form.channel" placeholder="请选择支付渠道...">
                  <el-option label="微信支付" value="微信支付"></el-option>
                  <el-option label="支付宝" value="支付宝"></el-option>
                </el-select>
              </el-form-item>
              <el-button @click="$refs.form.resetFields();initData();">重 置</el-button>
              <el-button type="primary" @click="handleConfirmAdvSearch">查询</el-button>
            </el-form>
          </div>
        </el-collapse-transition>
      </div>
      <div>
        <el-button icon="el-icon-plus" @click="addDialogVisible = true">新建订单</el-button>
        <el-button icon="el-icon-upload" @click="handleImport" type="primary">导入数据</el-button>
        <el-button icon="el-icon-download" @click="handleExport" type="primary">导出数据</el-button>
      </div>
    </div>
    <div class="main">
      <el-table
            style="width: 100%"
            v-loading="loading"
            :data="orderData"
            :border="true"
            :stripe="true"
            :lable-width="80">
            <el-table-column
              type="selection"
              fixed="left">
            </el-table-column>
            <el-table-column
              fixed="left"
              prop="orderId"
              label="订单编号">
            </el-table-column>
            <el-table-column
              prop="user.name"
              label="购买人">
            </el-table-column>
            <el-table-column
              width="150"
              prop="user.phone"
              label="联系电话">
            </el-table-column>
            <el-table-column
              prop="products"
              width="150"
              label="购买产品">
              <template slot-scope="scope">
                <el-tag type="primary" v-if="scope.row.products.length >= 2">...</el-tag>
                <el-tag type="primary" v-else>{{ scope.row.products[0].name }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              width="100"
              label="订单金额">
            </el-table-column>
            <el-table-column
              prop="address"
              width="250"
              label="收货地址">
            </el-table-column>
            <el-table-column
              width="120"
              prop="channel"
              label="支付渠道">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.channel === '微信支付'" type="success">微信支付</el-tag>
                <el-tag v-else-if="scope.row.channel === '支付宝'" type="primary">支付宝</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="订单状态">
              <template slot-scope="scope">
                <el-tag type="primary" v-if="scope.row.status === -1">已支付</el-tag>
                <el-tag type="warning" v-else-if="scope.row.status === 0">进行中</el-tag>
                <el-tag type="success" v-else>已完成</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="buyTime"
              label="购买时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="finishTime"
              label="完成时间"
              width="200">
              <template slot-scope="scope">
                <el-tag type="warning" v-if="scope.row.finishTime === null">进行中</el-tag>
                <div v-else>{{ scope.row.finishTime }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="200">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
  </div>
</template>

<script>
export default {
  name: "Order",
  data(){
    return{
      form: {
        status: null,
        channel: null
      },
      advBtuIcon: 'el-icon-arrow-down',
      iconFlag: false,
      orderId: null,
      loading: false,
      orderData: [],
      addDialogVisible: false,
      pageNum: 1,
      pageSize: 10,
      total: -1
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.loading = true;
      let url = '/order/all?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
      this.getRequest(url).then((resp) => {
        if(resp){
          console.log(resp);
          this.total = resp.data.total;
          this.orderData = resp.data.data;
        }
      });
      setInterval(() => {this.loading = false;},500);
    },
    handleAdvSearch(){
      if(!this.iconFlag){
        this.advBtuIcon = 'el-icon-arrow-up';
      }else{
        this.advBtuIcon = 'el-icon-arrow-down'
      }
      this.iconFlag = !this.iconFlag;
    },
    handleSearch() {
      if(this.orderId === ''){
        this.initData();
      }else if(this.orderId !== null){
        this.loading = true;
        this.getRequest('/order/' + this.orderId).then(resp => {
          if(resp){
            this.orderData = resp.data;
          }
        });
        setInterval(() => {this.loading = false;},500);
      }
    },
    handleImport() {

    },
    handleExport() {
      window.open('http://localhost:8081/file/download/excel/order');
    },
    handleEdit(data) {
      this.$message.success('编辑订单');
    },
    handleDetele(data) {
      this.$message.success('删除订单');
    },
    handleConfirmAdvSearch() {
      console.log(this.form);
      this.postRequest('/order/get',this.form).then(resp => {
        if(resp){
          this.orderData = resp.data;
        }
      })
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
};
</script>

<style scoped>
.header{
    display: flex;
    justify-content: space-between;
}
.main{
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
