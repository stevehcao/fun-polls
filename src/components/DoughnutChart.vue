<script>
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  props: {
    chartData: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
