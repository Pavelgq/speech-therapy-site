<template>
  <client-only>
    <v-container>
      <v-row justify="center">
        <v-col justify="center">
          <div id="chart">
            <VueApexCharts
              type="heatmap"
              width="350"
              :options="chartOptions"
              :series="series"
            ></VueApexCharts>
            <VueApexCharts
              type="line"
              width="350"
              :options="chartOptions"
              :series="series"
            ></VueApexCharts>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </client-only>
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
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getCategories() {},
    getData() {
      const categories = []
      const data = []

      for (const key in this.data) {
        const lesson = this.data[key]
        const day = Date.parse(lesson.date)
        categories.push(day)
        let correct = 0
        let fail = 0
        for (let i = 0; i < lesson.tasks.length; i++) {
          const task = lesson.tasks[i]
          correct += task.correct
          fail += task.fail
        }
        fail = fail / lesson.tasks.length
        correct = correct / lesson.tasks.length
        data.push(Math.floor((fail / correct) * 1000) / 1000)
      }

      this.chartOptions.xaxis.categories = categories
      this.series[0].data = data
    },
  },
}
</script>

<style></style>
