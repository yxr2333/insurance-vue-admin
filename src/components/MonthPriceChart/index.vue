<template>
  <div id="month_price_chart" class="chart"></div>
</template>

<script>
export default {
  name: "MonthPriceChart",
  mounted() {
    this.drawPic();
  },
  methods:{
    drawPic() {
      const month_price_chart = this.$echarts.init(document.getElementById('month_price_chart'));
      month_price_chart.setOption({
        title: {
          text: '季度销售量',
          left: 'center',
          top: 'top'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
            itemStyle: {
              normal: {
                label: {
                  show: true
                }
              }
            }
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
