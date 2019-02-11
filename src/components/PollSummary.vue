<template>
  <div class="poll-summary container">
    <h3 class="poll-summary-title orange-text lighten-1">What you voted on</h3>
    <div class="flow-text" v-for="(ans, idx) in ansArr" :key="idx">
      <span class="blue-text accent-2">{{ans.question}}</span>
      <blockquote>{{ans.ans}}</blockquote>
    </div>
  </div>
</template>

<script>
export default {
  name: "PollSummary",
  data() {
    return {
      ansArr: [] // arr from localstorage
    };
  },
  created() {
    const localAnsArr = localStorage.getItem("ansArr");
    this.ansArr = JSON.parse(localAnsArr);
  }
};
</script>

<style scoped>
</style>

