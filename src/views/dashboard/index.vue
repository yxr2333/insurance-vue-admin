<template>
  <div>
    <div class="head-container">
      <div style="font-size: 25px;font-weight: bold;margin-bottom: 10px;">工作台</div>
      <div style="display: flex;">
        <div style="margin-right: 20px;">
          <img :src="user.faceIcon" style="width: 70px;border-radius: 50%;">
        </div>
        <div style="display:flex;flex-direction: column;font-size: 20px;">
          <div>你好，{{ name }}，休息一会儿吧</div>
          <div style="font-size: 16px;margin-top: 15px;color: #99a9bf">前端工程师|蚂蚁金服-VUE平台</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div>
        <el-tabs type="border-card">
          <el-tab-pane label="jdk信息">
            <el-descriptions border>
              <el-descriptions-item label="名称">{{ systemInfo.jdk.name }}</el-descriptions-item>
              <el-descriptions-item label="版本">{{ systemInfo.jdk.version }}</el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
          <el-tab-pane label="jvm信息">
            <el-descriptions border>
              <el-descriptions-item label="名称">{{ systemInfo.jvm.name }}</el-descriptions-item>
              <el-descriptions-item label="版本">{{ systemInfo.jvm.version }}</el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
          <el-tab-pane label="os信息">
            <el-descriptions border>
              <el-descriptions-item label="系统架构">
                <el-tag >{{ systemInfo.os.arch }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="系统名称">{{ systemInfo.os.name }}</el-descriptions-item>
              <el-descriptions-item label="系统版本">{{ systemInfo.os.version }}</el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-row :gutter="40" class="panel-group">
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-people">
                <svg-icon icon-class="peoples" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  New Visits
                </div>
                <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-message">
                <svg-icon icon-class="message" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  Messages
                </div>
                <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-money">
                <svg-icon icon-class="money" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  Purchases
                </div>
                <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-shopping">
                <svg-icon icon-class="shopping" class-name="card-panel-icon" />
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  Shoppings
                </div>
                <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <line-chart />
      </el-row>
      <div>
        <div id="chart1" style="width: 500px;height: 300px;" />
      </div>
    </div>

  </div>
</template>

<script>
import countTo from 'vue-count-to'
import lineChart from '@/components/LineChart/index'
export default {
  name: 'Dashboard',
  components: {
    countTo,
    lineChart
  },
  data() {
    return {
      name: 'nihao',
      face_icon: '',
      user: {},
      systemInfo: {
        jdk: {
          name: '',
          version: ''
        },
        jvm: {
          name: '',
          version: ''
        },
        os: {
          arch: '',
          name: '',
          version: ''
        }
      },
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const userInfo = window.sessionStorage.getItem('user')
      if (userInfo !== undefined) {
        this.user = JSON.parse(userInfo)
        let role = this.user.roles[0];
        if(role.name === 'super_admin'){
          this.name = '超级管理员';
        }else if(role.name === 'admin'){
          this.name = '管理员';
        }
      }
      this.getRequest('/sys').then(resp => {
        if(resp){
          console.log(resp);
          this.systemInfo = resp.data;
        }
      })
    },
    drawPic(){
      const myEchart1 = this.$echarts.init(document.getElementById('chart1'))
      myEchart1.setOption({
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    },
  }

}
</script>
<style lang="scss" scoped>
.head-container{
  margin: 20px;
  background-color: #fff;
}
.main{
  background-color: #f0f2f5;
  padding: 20px;
  height: 100vh;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
