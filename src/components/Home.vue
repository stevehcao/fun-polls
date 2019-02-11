<template>
  <div class="home">
    <Poll/>
  </div>
</template>

<script>
import Poll from "@/components/Poll";
import db from "@/db";

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

<style scoped>
</style>
