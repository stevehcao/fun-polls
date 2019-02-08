<template>
  <div v-if="loaded">
    <h1>
      Stats for
      <span class="question-title">"{{ poll.question }}"</span> question
    </h1>
    <ul>
      <div v-for="answer in poll.answers" :key="answer.id">
        <li>{{answer.choice}}: {{answer.votes}}</li>
      </div>
    </ul>
  </div>
  <h2 v-else>Loading...</h2>
</template>


<script>
// url params will have doc.id as doc_id, can use it for DB
import db from "@/db";

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
</style>


