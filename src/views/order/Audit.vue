<template>
  <div style="height: 100%">

    <div class="main" style="height: 100%">
      <vue-waterfall-easy
        :imgsArr="imgsArr"
        :gap="35"
        :height="400"
        srcKey="url"
        :loadingDotCount='0'
        :imgWidth='180'>
        <template slot-scope="props">
          <el-card class="box-card" shadow="always" style="padding: 0px;">
            <div slot="header" class="clearfix">
              <el-button style="float: right;" type="primary" size="mini" @click="handlePass(props.value)">通过</el-button>
              <span>订单编号：</span>
              <span>{{props.value.id}}</span>
            </div>
            <div style="margin-bottom: 5px;">发起人：{{props.value.name}}</div>
            <div style="padding: 0">
              <span>订单金额：</span>
              <span>{{props.value.price}}</span>
            </div>
            <div>
              <span>订单状态：</span>
              <el-tag type="primary" style="display: inline-block;">{{props.value.status === -1 ? '已支付' : '未知'}}</el-tag>
            </div>
          </el-card>
        </template>
      </vue-waterfall-easy>
    </div>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: "Audit",
  components: {
    vueWaterfallEasy
  },
  data(){
    return{
      imgsArr: []
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getRequest('/order/water').then(resp => {
        if(resp){
          this.imgsArr = resp.data;
        }
      })
    },
    handlePass(data) {
      this.$confirm('确认通过编号为：' + data.id + '的订单吗？','提示',{
        confirmButtonText: '确 认',
        cancelButtonText: '取 消',
        type: 'warning'
      }).then(() => {
        let url = '/order/update/status?status=0&id=' + data.id;
        this.putRequest(url).then(resp => {
          if(resp){
            this.initData();
          }
        })
      }).catch(() => {
        this.$message.info('已取消');
      })
    }
  }
}
</script>

<style scoped>
.vue-waterfall-easy-container{
  height: calc(100vh - 50px)!important;
}
</style>
