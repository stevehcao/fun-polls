<template>
  <div class="poll container">
    <div v-if="seenAllQs" class="valign-wrapper seen-all-q container">
      <p class="flow-text">You have taken all the polls... click below for options!</p>
      <button class="btn" @click="retakePolls">Retake Polls</button>
      <!-- another button to show what you voted on -->
      <!-- <button class="btn"></button> -->
    </div>
    <div v-else-if="loaded" class="question flow-text">
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
    <!-- loading spinner -->
    <div v-else class="lds-dual-ring"></div>
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
            // might have to change to question
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
      // storing doc.id and your vote in local storage this.polls[0].id
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

.seen-all-q {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30%;
  box-sizing: border-box;
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

