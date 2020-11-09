<template>
  <v-layout justify-center wrap>
    <v-flex pa-2 rounded grow shrink class="white">
      <VueApexCharts
        type="line"
        width="450"
        :options="chartOptions"
        :series="series"
      ></VueApexCharts>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
    VueApexCharts: () => import('vue-apexcharts'),
  },
  props: {
    data: Object,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'dataChart',
          type: 'line',
          stroke: {
            width: 8,
            curve: 'smooth',
          },
          animations: {
            initialAnimation: {
              enabled: false,
            },
          },
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 10,
        },
        markers: {
          size: 4,
          colors: ['#FFA41B'],
          strokeColors: '#fff',
          strokeWidth: 2,
          hover: {
            size: 7,
          },
        },
        title: {
          text: 'Количество ошибок',
          align: 'left',
        },
        legend: {
          position: 'top',
        },
      },
      series: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getCategories() {},
    getData() {
      for (const key in this.data) {
        const lesson = this.data[key]

        const day = new Date(lesson.date)
        for (let i = 0; i < lesson.tasks.length; i++) {
          const task = lesson.tasks[i]
          const el = this.series.find((item) => item.name === task.game)
          if (!el) {
            this.series.push({
              name: task.game,
              data: [
                {
                  x: day,
                  y: Math.floor((task.fail / task.correct) * 100),
                },
              ],
            })
          } else {
            el.data.push({
              x: day,
              y: Math.floor((task.fail / task.correct) * 100),
            })
          }
        }
      }
    },
  },
}
</script>

<style></style>
