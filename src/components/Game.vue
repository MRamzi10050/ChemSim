<style >
body {
  font-family: "Lato", sans-serif;
  background-image: url("peshko.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.sidenav {
  height: 100vh;
  width: 110px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: #096f85;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav p {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 0.9em;

  color: white !important;
  display: block;
}
.menu-item {
  margin: 5px;
}
.sidenav a:hover {
  color: #f1f1f1;
}

.main {
  margin-left: 160px; /* Same as the width of the sidenav */
  font-size: 28px; /* Increased text to enable scrolling */
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
.help {
  /* position: absolute; */
  margin-right: 50px;
  margin-top: 20px;
  float: right;
}
</style>

<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-success help"
      data-toggle="modal"
      data-target="#exampleModal"
    >Stages of Experiment</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Stages of Experiment</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Step-by-step instructions:
            <br />1- Grab Porcelain cup
            <br />2- add aluminum to cup
            <br />3- add iodine to aluminum mixture
            <br />4- add water to the mixed ingredients
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="sidenav">
      <p
        v-for="(box, index) in boxes"
        v-bind:key="index"
        draggable="true"
        @touchmove="createElementTouch($event, box)"
        @drag="createElement($event, box)"
      >{{ box.name }}</p>
      <img :src="getImg('lab.png')" style="max-width:100px" alt />
    </div>
    <div class="container">
      <!-- <div v-if="!labMenu">
        <button @click="labMenu = true" class="btn btn-success menu-item">Start Game</button>
      </div>
      <div v-if="!labMenu">
        <button class="btn btn-info menu-item">How to play</button>
      </div>
      <div v-if="!labMenu">
        <button class="btn btn-warning menu-item">About us</button>
      </div>-->
      <div>
        <VueDragResize
          v-for="(box) in activeBoxesM"
          v-bind:key="box.id"
          :isActive="true"
          :w="box.width"
          :h="box.height"
          :y="box.top"
          :x="box.left"
          :isResizable="false"
          v-on:dragging="resize($event, box)"
        >
          <img :src="getImg(box.src)" :width="box.width" :height="box.height" alt />
          <p>{{ box.name }}</p>
        </VueDragResize>
      </div>
    </div>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";

export default {
  mounted() {
    // console.log(this);
  },
  data() {
    return {
      gameRunning: false,
      labMenu: false,
      all: null,
      boxes: [
        {
          id: 1,
          name: "Al",
          width: 75,
          height: 75,
          visible: false,
          top: 450,
          left: 400,
          src: "aluminumShaving.png"
        },
        {
          id: 2,
          name: "I2",
          width: 75,
          height: 75,
          visible: false,
          top: 450,
          left: 500,
          src: "crysDine.png"
        },
        {
          id: 3,
          name: "Water",
          width: 75,
          height: 75,
          visible: false,
          top: 450,
          left: 600,
          src: "water.png"
        },
        {
          id: 4,
          name: "Porcelain cup",
          width: 75,
          height: 75,
          visible: false,
          top: 450,
          left: 750,
          src: "empty.png"
        }
      ],
      mixes: [
        {
          firstElement: 1,
          secondElement: 4,
          id: 5,
          name: "Al in cup",
          width: 75,
          height: 75,
          visible: true,
          top: null,
          left: null,
          src: "firstLayer.png"
        },
        {
          firstElement: 2,
          secondElement: 5,
          id: 6,
          name: "AlI2 in cup",
          width: 75,
          height: 75,
          visible: true,
          top: 0,
          left: 250,
          src: "secondLayer.png"
        },
        {
          firstElement: 3,
          secondElement: 6,
          id: 7,
          name: "Reaction",
          width: 75,
          height: 75,
          visible: true,
          top: 0,
          goal: 1,
          left: 250,
          src: "GS.gif"
        }
      ]
    };
  },
  name: "game",
  components: {
    VueDragResize
  },
  props: {
    msg: String
  },
  computed: {
    activeBoxesM: function() {
      // `this` points to the vm instance
      return this.boxes.filter(box => box.visible === true);
    }
  },
  methods: {
    between(x, min, max) {
      return x >= min && x <= max;
    },
    createElementTouch(e, box) {
      console.log(e.touches[0].clientX);
      box.visible = true;
      if (e.touches[0].clientX != 0) {
        box.left = e.touches[0].clientX;
        box.top = e.touches[0].clientY;
      }
    },
    createElement(e, box) {
      box.visible = true;
      if (e.clientX != 0) {
        box.left = e.clientX;
        box.top = e.clientY;
      }
    },
    getImg(image, ext) {
      return require(`@/assets/${image}`);
    },
    collision(box1, box2) {
      // console.log(box1.id, box2.id);

      this.mixes
        .filter(x => {
          if (x.firstElement === box1.id && x.secondElement === box2.id) {
            return x;
          } else if (
            x.secondElement === box1.id &&
            x.firstElement === box2.id
          ) {
            return x;
          }
        })
        .map(x => {
          console.log(
            "mix id: " +
              x.id +
              " boxOne id: " +
              box1.id +
              " boxTwo id: " +
              box2.id +
              " mixFirstElement: " +
              x.firstElement +
              " mixSecondElement: " +
              x.secondElement
          );

          setTimeout(function() {
            box1.visible = false;
            box2.visible = false;
            box1.left = null;
            box1.top = null;
            box2.left = null;
            box2.top = null;
          }, 10);

          if (event.clientX) {
            x.top = event.clientY - 37;
            x.left = event.clientX - 37;
          } else {
            x.top = event.touches[0].clientY - 37;
            x.left = event.touches[0].clientX - 37;
          }

          if (this.boxes[this.boxes.length - 1].id != x.id) {
            this.boxes.push(x);
          }
          if (x.goal === 1) {
            setTimeout(function() {
              alert("Congrats you're done");
              // var r = confirm(
              //   "Press Ok to return to the labs menu Or cancel to stay here."
              // );
              // if (r == true) {
              //   this.$router.push("/labs");
              // } else {
              // }
            }, 3000);
          }
        });

      // if (box1.id == box2.with && box2.id == box1.with) {
      //   this.boxes
      //     .filter(x => x.id === box2.id)
      //     .map(x => {
      //       x.visible = false;
      //     });
      //   this.boxes
      //     .filter(x => x.id === box1.id)
      //     .map(x => {
      //       x.visible = false;
      //     });

      //   // let newBox = {
      //   //   id: 7,
      //   //   width: 75,
      //   //   height: 75,
      //   //   visible: true,
      //   //   with: 2,
      //   //   src: "../../img/Li.jpg",
      //   //   top: box1.top,
      //   //   left: box1.left
      //   // };
      //   // this.boxes.push(newBox);
      // }

      // let soonDelete = [];
      // for (var i = 0; i < this.boxes.length; i++) {
      //   console.log(id + " " + id2);
      //   if (this.boxes[i].id == id) {
      //     soonDelete.push(i);
      //   }
      //   if (this.boxes[i].id == id2) {
      //     soonDelete.push(i);
      //   }
      // }
      // console.log(soonDelete);
      // for (var e = 0; e <= soonDelete.length; e++) {
      //   console.log(soonDelete);
      // this.boxes.splice(soonDelete[e], 1);
    },
    resize(newRect, box1) {
      // console.log(event);
      this.all = this.boxes.concat(this.mixes);

      box1.top = event.clientY;
      box1.left = event.clientX;
      // if (newRect.left != 0 && newRect.top != 0) {
      //   box1.top = newRect.top;
      //   box1.left = newRect.left;
      // }

      this.all.filter(box2 => {
        if (box2.id != box1.id) {
          if (
            this.between(box2.left, newRect.left - 75, newRect.left + 75) &&
            this.between(box2.top, newRect.top - 75, newRect.top + 75)
          ) {
            // console.log(box1.id, box2.id);
            this.collision(box1, box2);
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
