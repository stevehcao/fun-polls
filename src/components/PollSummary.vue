<template>
  <div class="poll-summary container">
    <div v-for="(ans, idx) in ansArr" :key="idx">{{ans.question}}: {{ans.ans}}</div>
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

