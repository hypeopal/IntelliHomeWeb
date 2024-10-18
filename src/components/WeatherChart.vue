<template>
  <div ref="weatherChart" style="width: 40%; height: 250px"></div>
</template>

<script>
import * as echarts from 'echarts';
//import {getCityId, getTemp} from "@/js/GetWeather";

export default {
  name: "WeatherChart",
  data() {
    return {
      HighestTemp: [24, 18, 19, 19, 24, 22, 23],
      LowestTemp: [17, 15, 14, 13, 13, 14, 16],
      DateList: ['18', '19', '20', '21', '22', '23', '24'],
      City: '成都',
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    async initChart() {
      // 部署时再动态获取，节约api资源
      // try {
      //   const cityId = await getCityId(this.City);
      //   const tempList = await getTemp(cityId);
      //   this.HighestTemp = tempList.map(day => day[0]); // 提取最高温
      //   this.LowestTemp = tempList.map(day => day[1]); // 提取最低温
      // } catch (e) {
      //   console.log(e);
      // }
      const chart = echarts.init(this.$refs.weatherChart);
      const option = {
        title: {
          text: `${this.City}天气 `
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: 15,
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          name: '日期',
          boundaryGap: false,
          data: this.DateList,
        },
        yAxis: {
          type: 'value',
          name: '温度',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            data: this.HighestTemp,
            markLine: {
              data: [{ type: 'average', name: 'Avg' }],
              emphasis: {
                lineStyle: {
                  width: 2,
                },
                label: {
                  show: true
                }
              },
              label: {
                position: 'middle',
                formatter: '平均高温: {c} °C',
                show: false,
              },
              symbol: ['circle', 'none'],
            }
          },
          {
            name: '最低气温',
            type: 'line',
            data: this.LowestTemp,
            markLine: {
              data: [
                {
                  type: 'average',
                  name: 'Avg',
                },
              ],
              emphasis: {
                lineStyle: {
                  width: 2,
                },
                label: {
                  show: true
                }
              },
              label: {
                position: 'middle',
                formatter: '平均低度: {c} °C',
                show: false,
              },
              symbol: ['circle', 'none'],
            }
          }
        ]
      };
      chart.setOption(option);
    },
  }
};
</script>

<style scoped>

</style>