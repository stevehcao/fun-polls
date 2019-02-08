<template>
  <div class="poll">
    <h1>Poll goes here</h1>
    <div v-if="polls[0]" class="question">
      <h3>{{ polls[0].question }}</h3>
      <form @submit.prevent="countVote(voted)">
        <!-- radio buttons or checkbox for each question choice have to loop through the ans array -->
        <div v-for="(answer, idx) in polls[0].answers" :key="idx">
          <!-- value is what you are going to add once you check the box -->
          <!-- <input type="checkbox" :id="answer.id" :value="answer" v-model="voted">
          <label :for="answer.id">{{answer.choice}}</label>-->
          <input type="radio" :id="answer.id" :value="answer.id" v-model="voted">
          <label :for="answer.id">{{ answer.choice }}</label>
        </div>
        <button>Rock the Vote!</button>
      </form>
    </div>
    <div v-else class="loading">Loading poll question...</div>
  </div>
</template>

<script>
import db from "@/db";

export default {
  name: "Poll",
  data() {
    return {
      // polls are an array of objects that contains poll questions and answers
      // dummy data for now until we hook up database
      // possibly grab all data and then shuffle using Fisher-Yates
      polls: [],
      voted: null,
      randomPoll: []
    };
  },
  methods: {
    countVote(idx) {
      // increase vote count by 1 of the choice passed in
      const choice = this.polls[0].answers[idx];
      choice.votes++;
      console.log(choice.votes, choice.choice, "VOTES");
      // send updated poll question to db can grab one doc by using .doc(id)
      db.collection("polls")
        .doc(this.polls[0].id)
        .update({
          // update array with new vote counts
          answers: this.polls[0].answers
        })
        .then(() => {
          console.log("routing here");
        })
        .catch(err => {
          console.log(err);
        });
      // after async function runs, in the then() push router to stats page
      // maybe send info somehow to stats page?
    },
    shuffle(arr) {
      // fisher-yates shuffle
      let currIdx = arr.length;
      let randomIdx = 0;

      while (currIdx) {
        randomIdx = Math.floor(Math.random() * currIdx);
        currIdx--;

        // swap
        [arr[currIdx], arr[randomIdx]] = [arr[randomIdx], arr[currIdx]];
      }
      return arr;
    }
  },
  // checking check box form
  updated() {
    console.log(this.voted);
    // console.log()
  },
  created() {
    // fetch data from db
    db.collection("polls")
      .get()
      .then(snapshot => {
        const queryPolls = [];
        snapshot.forEach(doc => {
          const poll = doc.data();
          poll.id = doc.id;
          queryPolls.push(poll);
        });
        this.polls = queryPolls;
        this.shuffle(this.polls);
      })
      .catch(err => {
        console.log(err);
      });
    // this.randomPoll[0] = polls[0];
  }
};
</script>

<style scoped>
</style>

