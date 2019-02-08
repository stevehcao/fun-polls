<template>
  <div class="home">
    <nav>possible nav/header here</nav>
    <h1>Home Page</h1>
    <Poll/>
  </div>
</template>

<script>
import Poll from "@/components/Poll";

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
