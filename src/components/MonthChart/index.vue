<template>
  <div id="month_chart" class="chart"></div>
</template>

<script>
export default {
  name: "MonthChart",
  mounted() {
    this.drawPic();
  },
  methods: {
    drawPic(){
      const month_chart = this.$echarts.init(document.getElementById('month_chart'));
      month_chart.setOption({
        title: {
          text: '季度注册量',
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
