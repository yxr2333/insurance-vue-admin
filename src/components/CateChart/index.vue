<template>
  <div id="cate_chart" class="chart">

  </div>
</template>

<script>

export default {
  name: "CateChart",
  mounted() {
    this.drawPic();
  },
  methods: {
    drawPic(){
      const cate_chart = this.$echarts.init(document.getElementById('cate_chart'));
      cate_chart.setOption({
        title: {
          text: '分类销售额',
          left: 'center',
          top: 'top'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.chart{
  width: 100%;
  height: 50vh;
}
</style>
