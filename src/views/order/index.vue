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
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data(){
      return{
        orderId: null,
        loading: false,
        orderData: [],
        addDialogVisible: false,
        pageNum: 1,
        pageSize: 10,
        count: -1
      }
  },
  mounted() {
    this.initData();
  },
  methods: {
      initData() {
        let url = '/order/all?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
        this.getRequest(url).then((resp) => {
          if(resp){
            console.log(resp);
            this.count = resp.data.total;
            this.orderData = resp.data.data;
          }
        });
      },
      handleSearch() {
        this.$message.info('搜索');
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
}
</style>
