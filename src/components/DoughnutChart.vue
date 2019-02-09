<script>
import { Doughnut, mixins } from "vue-chartjs";

export default {
  extends: Doughnut,
  data() {
    return {
      // dummy data
      // chartData: {
      //   labels: ["Green", "Red", "Blue"],
      //   datasets: [
      //     {
      //       label: "Data One",
      //       backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
      //       data: [3, 10, 5]
      //     }
      //   ]
      // }
    };
  },
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style>
</style>

