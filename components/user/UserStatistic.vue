<template>
  <client-only>
    <v-container>
      <v-row justify="center">
        <v-col justify="center">
          <div id="chart">
            <VueApexCharts
              type="heatmap"
              height="350"
              :options="chartOptions"
              :series="series"
            ></VueApexCharts>
            <VueApexCharts
              type="line"
              height="350"
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
}
</script>

<style></style>
