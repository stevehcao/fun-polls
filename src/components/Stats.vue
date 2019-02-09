<template>
  <div class="stats container" v-if="loaded">
    <h2>
      Stats for
      <span class="question-title red-text accent-2">"{{ poll.question }}"</span> question
    </h2>
    <!-- show data vis here -->
    <!-- pass in data from query as props -->
    <ul class="answer-choices">
      <div v-for="answer in poll.answers" :key="answer.id">
        <li>{{answer.choice}}: {{answer.votes}}</li>
      </div>
    </ul>
  </div>
  <h2 v-else>Loading stats...</h2>
</template>


<script>
// url params will have doc.id as doc_id, can use it for DB
import db from "@/db";
import DoughnutChart from "@/components/DoughnutChart";

export default {
  name: "Stats",

  data() {
    return {
      poll: {},
      loaded: false // will only be a single poll data
    };
  },

  created() {
    const docId = this.$route.params.doc_id;
    const ref = db.collection("polls").doc(docId);
    ref
      .get()
      .then(snapshot => {
        // console.log(snapshot.data());
        this.poll = snapshot.data();
        console.log(this.poll.answers);
        this.loaded = true;
      })
      .catch(err => {
        console.log(err);
      });
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


