<template>
  <div class="home">
    <Poll/>
  </div>
</template>

<script>
import Poll from "@/components/Poll";
import db from "@/db";
// import util from '@/util.js'

export default {
  name: "Home",

  data() {
    return {};
  },

  components: {
    Poll
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
