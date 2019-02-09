<template>
  <div class="stats container" v-if="loaded">
    <h3>
      Stats for
      <span class="question-title red-text accent-2">"{{ poll.question }}"</span> question
    </h3>
    <!-- show data vis here -->
    <!-- pass in data from query as props -->
    <DoughnutChart :chartData="chartData" :options="options"/>
    <!-- <ul class="answer-choices">
      <div v-for="answer in poll.answers" :key="answer.id">
        <li>{{answer.choice}}: {{answer.votes}}</li>
      </div>
    </ul>-->
  </div>
  <h2 v-else>Loading stats...</h2>
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
        console.log(this.poll, "SINGLE POLL BUILD CHART DATA FROM THIS");
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
      console.log(this.chartData);
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
</style>


