<template>
  <div>
    <div v-if="listData.length === 0" class="middle">
      <img src="https://cn.vuejs.org/images/logo.svg" alt="" style="width: 200px;">
      <div class="text">
        <div>当前暂无订单需要发货！</div>
        <div>休息一下吧~</div>
      </div>
    </div>
    <div v-else style="margin: 20px;">
      <el-descriptions
        title="订单信息"
        v-for="(item,index) in listData"
        :key="index"
        border
        style="margin-bottom: 20px;">
        <template slot="extra">
          <el-button type="primary" size="small" @click="handleConfirm(item)">发货</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <div>
              <svg-icon icon-class="number" class-name="des-icon"/>
              <span>订单编号</span>
            </div>
          </template>
          <span>{{item.orderId}}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <div>
              <svg-icon icon-class="people2" class-name="des-icon"/>
              <span>购买人</span>
            </div>
          </template>
          <span>{{item.user.name}}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <div>
              <svg-icon icon-class="mail" class-name="des-icon"/>
              <span>邮箱地址</span>
            </div>
          </template>
          <span>{{item.user.email}}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <div>
              <svg-icon icon-class="mobile-phone" class-name="des-icon"/>
              <span>联系电话</span>
            </div>
          </template>
          <span>{{item.user.phone}}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <div>
              <svg-icon icon-class="logistics" class-name="des-icon"/>
              <span>产品名称</span>
            </div>
          </template>
          <span>{{item.products[0].name}}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <div>
              <svg-icon icon-class="status" class-name="des-icon"/>
              <span>订单状态</span>
            </div>
          </template>
          <el-tag :type="item.status === 0 ? 'warning' : 'success'">{{item.status === 0 ? '进行中' : '已完成'}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <div>
              <svg-icon icon-class="time" class-name="des-icon"/>
              <span>购买时间</span>
            </div>
          </template>
          <span>{{item.buyTime}}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <div>
              <svg-icon icon-class="home" class-name="des-icon"/>
              <span>收货地址</span>
            </div>
          </template>
          <span>{{item.address}}</span>
        </el-descriptions-item>
      </el-descriptions>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5,10,20,30,50]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Deliver",
  data(){
    return{
      dialogVisible: false,
      pageNum: 1,
      pageSize: 3,
      total: null,
      listData: []
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData(){
      let url = '/order/get?status=0&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize;
      this.getRequest(url).then(resp => {
        if(resp){
          this.total = resp.data.total;
          this.listData = resp.data.data;
        }
      })
    },
    handleConfirm(data) {
      this.$confirm('确认给客户[' + data.user.name + ']的编号为：' + data.orderId + '的订单发货吗？','提示',{
        cancelButtonText: '取 消',
        confirmButtonText: '确 认',
        type: 'warning'
      }).then(() => {
        this.putRequest('/order/update/status?id=' + data.orderId + '&status=1').then(async resp => {
          if (resp) {
            let content = '尊敬的：' + data.user.name + '用户，您好！<br /> ' +
              '您于：' + data.buyTime + '购买的编号为' + data.orderId + '的订单已经成功发货！<br />' +
              '您的收货地址为' + data.address + '<br />' +
              '请关注订单状态，及时查收！';
            let url = '/mail?content=' + content + '&flag=true&title=订单发货通知&to=' + data.user.email;
            await this.postRequest(url).then(resp => {
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '订单发货成功，邮件通知失败，请检查用户邮箱地址是否有误！'
              })
            })
          }
        })
      }).catch(() => {
        this.$message.info('已取消');
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
}
</script>

<style scoped>
.des-icon{
  font-size: 20px;
}
.middle{
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.middle .text{
  text-align: center;
  margin-top: 18px;
  font-size: 25px;
  font-weight: bold;
}
</style>
