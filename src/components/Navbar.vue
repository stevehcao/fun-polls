<template>
  <div class="navbar">
    <nav class="nav-extended teal darken-1">
      <div class="nav-content">
        <router-link :to="{name:'Home'}">
          <span class="nav-title">Fun Polls</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>


<style scoped>
nav {
  padding: 0 20px;
}
</style>

