<template>
  <div class="poll">
    <h1>Poll goes here</h1>
    <div class="question">
      <h3>{{ polls[0].question }}</h3>
      <form @submit.prevent="countVote(voted)">
        <!-- radio buttons or checkbox for each question choice have to loop through the ans array -->
        <div v-for="(answer, idx) in polls[0].answers" :key="idx">
          <!-- value is what you are going to add once you check the box -->
          <!-- <input type="checkbox" :id="answer.id" :value="answer" v-model="voted">
          <label :for="answer.id">{{answer.choice}}</label>-->
          <input type="radio" :id="answer.id" :value="idx" v-model="voted">
          <label :for="answer.id">{{ answer.choice }}</label>
        </div>
        <button>Rock the Vote!</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Poll",
  data() {
    return {
      // polls are an array of objects that contains poll questions and answers
      // dummy data for now until we hook up database
      // possibly grab all data and then shuffle using Fisher-Yates
      polls: [
        {
          question: "What is your favorite 2018 video game?",
          answers: [
            { choice: "Spider-Man", votes: 0, id: 1 },
            { choice: "Super Smash Bros. Ultimate", votes: 0, id: 2 },
            { choice: "Red Dead Redemption 2", votes: 0, id: 3 },
            { choice: "God of War", votes: 0, id: 4 }
          ]
        }
      ],
      voted: null
    };
  },
  methods: {
    countVote(idx) {
      const choice = this.polls[0].answers[idx];
      choice.votes++;
      console.log(choice.votes, choice.choice, "VOTES");
      // increase vote count by 1
      // send updated poll question to db can grab one doc by using .doc(id)
      // after async function runs, in the then() push router to stats page
      // maybe send info somehow to stats page?
    }
  },
  // checking check box form
  updated() {
    console.log(this.voted);
    // console.log()
  }
};
</script>

<style scoped>
</style>
