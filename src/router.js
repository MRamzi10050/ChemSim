import Vue from "vue";
import Router from "vue-router";
import Game from "@/components/Game";
import Menu from "@/components/Menu";
import Labs from "@/components/Labs";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/game",
      name: "Game",
      component: Game
    },
    {
      path: "/",
      name: "Menu",
      component: Menu
    },
    {
      path: "/labs",
      name: "Labs",
      component: Labs
    }
  ]
});
