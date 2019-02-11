<template>
  <div class="stats container" v-if="loaded">
    <h3>
      Stats for
      <span class="question-title blue-text accent-2">"{{ poll.question }}"</span> poll
    </h3>
    <!-- show data vis here -->
    <!-- pass in data from query as props -->
    <DoughnutChart :chartData="chartData" :options="options"/>
  </div>
  <div v-else class="lds-dual-ring"></div>
</template>


<script>
// url params will have doc.id as doc_id, can use it for DB
import db from "@/db";
import DoughnutChart from "./DoughnutChart.vue";
export default {
  name: "Stats",

  components: { DoughnutChart },

  data() {
    return {
      poll: {}, // will only be a single poll data
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["red", "orange", "blue", "green"],
            data: []
          }
        ]
      },
      // optional animation
      options: {
        // cutoutPercentage: // (0-100) to change size of doughnut
        animation: {
          animateScale: true
        }
      },
      loaded: false
    };
  },

  created() {
    const docId = this.$route.params.doc_id;
    const ref = db.collection("polls").doc(docId);
    ref
      .get()
      .then(snapshot => {
        this.poll = snapshot.data();
        this.loaded = true;
        // method to format chart data to pass as prop to chart component
        this.formatChartData();
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    // format chart data from query
    formatChartData() {
      // loop over answers array in poll object
      // build out this.chartData object
      const ansArray = this.poll.answers;
      ansArray.forEach(ans => {
        this.chartData.labels.push(ans.choice);
        this.chartData.datasets[0].data.push(ans.votes);
      });
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
}

.stats {
  max-width: 800px;
}

.answer-choices {
  margin: 10px;
}

.lds-dual-ring {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  color: #00897b;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 200px;
  height: 200px;
  margin: 1px;
  border-radius: 50%;
  border: 15px solid #00897b;
  border-color: #00897b transparent #00897b transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


