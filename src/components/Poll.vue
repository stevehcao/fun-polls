<template>
  <div class="poll container">
    <div v-if="seenAllQs">
      You have taken all the polls... click below for options!
      <button
        class="btn"
        @click="retakePolls"
      >Retake Polls</button>
      <!-- another button to show what you voted on -->
      <button></button>
    </div>
    <div v-else-if="loaded" class="question">
      <h3>{{ polls[0].question }}</h3>
      <!-- <form @submit.prevent="$emit('countVote', voted)"> -->
      <form @submit.prevent="countVote(voted)">
        <!-- radio buttons or checkbox for each question choice have to loop through the ans array -->
        <div class="answer-choices">
          <div v-for="(answer, idx) in polls[0].answers" :key="idx">
            <!-- before materialize -->
            <!-- <input type="radio" :id="answer.id" :value="answer.id" v-model="voted">
            <label :for="answer.id">{{ answer.choice }}</label>-->
            <label>
              <input name="group1" type="radio" :value="answer.id" v-model="voted" checked>
              <span>{{answer.choice}}</span>
            </label>
          </div>
        </div>
        <button class="btn">Vote now!</button>
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
      // possibly grab all data and then shuffle using Fisher-Yates
      // or helper functions to generate random element in array
      polls: [],
      voted: null,
      loaded: false,
      seenAllQs: false
    };
  },
  created() {
    this.getQuestions();
  },
  // props: { polls: Array, voted: Number, test: String } // passing props from Home
  methods: {
    getQuestions() {
      const numQs = Number(localStorage.getItem("numQuestions"));
      const seenQs = Number(localStorage.getItem("seenQs"));
      // check numQs to seenQs and if they match you seen everything
      console.log(this.seenAllQs);
      if (numQs === seenQs && localStorage.getItem("numQuestions")) {
        // don't query and change flag
        this.seenAllQs = true;
        return;
      }
      // fetch data from db
      const pollsRef = db.collection("polls");
      // limit query to 100 in case there are too many poll questions
      pollsRef
        .limit(100)
        .get()
        .then(snapshot => {
          // store collection size in local host to check if you are out of questions
          // will always update in case there are more questions
          localStorage.setItem("numQuestions", snapshot.size);
          const queryPolls = [];
          snapshot.forEach(doc => {
            // check local storage for doc id
            // only build out poll if doc id not seen
            if (!localStorage.getItem(doc.id)) {
              const poll = doc.data();
              poll.id = doc.id;
              queryPolls.push(poll);
            }
          });
          // check if there is something to build in case you have seen all the questions
          if (queryPolls.length > 0) {
            this.polls = queryPolls;
            // shuffle polls here and only display one to the top
            this.shuffle(this.polls);
          }
          this.loaded = true;
        })
        .catch(err => {
          console.log(err);
        });
      // this.randomPoll[0] = polls[0];
    },

    storeSeenQs(choice) {
      // storing doc.id and your vote in local storage
      // maybe move to helper function
      localStorage.setItem(this.polls[0].id, choice.choice);
      if (!localStorage.getItem("seenQs")) {
        localStorage.setItem("seenQs", 1);
      } else {
        let seenQ = Number(localStorage.getItem("seenQs"));
        seenQ++;
        // console.log(seenQ, "SEEN");
        localStorage.setItem("seenQs", seenQ);
      }
    },

    countVote(idx) {
      // increase vote count by 1 of the choice passed in
      const choice = this.polls[0].answers[idx];
      choice.votes++;

      this.storeSeenQs(choice);
      // send updated poll question to db can grab one doc by using .doc(id)
      db.collection("polls")
        .doc(this.polls[0].id)
        .update({
          // update array with new vote counts
          answers: this.polls[0].answers
        })
        .then(() => {
          // routing here to new stats page to display stats for that question
          // include in the route params the doc.id
          this.$router.push({
            name: "Stats",
            params: { doc_id: this.polls[0].id }
          });
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

        // swap ES6
        [arr[currIdx], arr[randomIdx]] = [arr[randomIdx], arr[currIdx]];
      }
      return arr;
    },

    retakePolls() {
      localStorage.clear();
      this.$router.go();
    }
  }
};
</script>

<style scoped>
.poll {
  max-width: 600px;
}

.answer-choices {
  margin: 15px;
}
</style>

