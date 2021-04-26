<template>
  <div>
    <router-link class="btn btn-success menu-item" to="/labs"
      >Start Game</router-link
    >

    <br />
    <router-link class="btn btn-warning menu-item" to="/game">
      About us</router-link
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "Menu",
  components: {},
  props: {
    msg: String
  },
  computed: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-item {
  margin: 15px;
}
</style>
