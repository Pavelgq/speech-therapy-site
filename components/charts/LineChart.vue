<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,

  props: ['chartdata', 'options'],
  data: () => ({
    chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20],
        },
      ],
    },
    options: {
      width: 100,
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
}
</script>

<style></style>
