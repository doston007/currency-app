import Vue from "vue";
import App from "@/App";
import store from "@/store";

// Directives
import clickOutside from "@/directives/click-outside";

// Global components
import Card from "@/components/ui/Card.global";

Vue.config.productionTip = false;

Vue.directive("click-outside", clickOutside);

Vue.component("card", Card);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
