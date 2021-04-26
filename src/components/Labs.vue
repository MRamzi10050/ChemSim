<template>
  <div>
    <div class="jumbotron row" style="width:80%;margin:auto auto; margin-bottom:20px">
      <h1 class="display-4">Lab 1</h1>
      <div class="row justify-content-around">
        <div class="col-4-lg">
          <br />
          <img :src="getImg('lab1.jpg')" alt style="max-height:80%;max-width:80%;" />
        </div>
        <div class="col-4">
          <br />

          <p class="lead">
            Chemical experiments come in different shapes and sizes:
            they may feature many colors, foam, fire etc. This experiment is impressive because in the interaction of two seemingly unremarkable substances, a sparkling and smoking volcano is formed.
          </p>
          <router-link class="btn btn-success" to="/game">Start Lab</router-link>
        </div>
      </div>
    </div>
    <div class="jumbotron row" style="width:80%;margin:auto auto; margin-bottom:20px">
      <h1 class="display-4">Lab 2</h1>
      <div class="row justify-content-around">
        <div class="col-4-lg">
          <br />
          <img :src="getImg('lab2.png')" alt style="max-height:80%;max-width:80%;" />
        </div>
        <div class="col-4">
          <br />

          <p
            class="lead"
          >Baking soda is sodium bicarbonate. It reacts with acetic acid with the release of carbon dioxide. The gas makes the liquid soap froth, and the volcano erupts!</p>
          <button class="btn btn-success" @click="alertt()">Start Lab</button>
        </div>
      </div>
    </div>
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
  methods: {
    alertt() {
      alert("You need to buy the game to unlock other labs.");
    },
    getImg(image, ext) {
      return require(`@/assets/${image}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-item {
  margin: 15px;
}
</style>
