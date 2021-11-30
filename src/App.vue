<template>
  <div class="app">
    <div class="error-alert" v-if="error">{{ error }}</div>
    <currency-converter class="app__section" />
    <currency-list class="app__section" />
    <currency-history class="app__section" />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

import CurrencyConverter from "@/components/CurrencyConverter";
import CurrencyList from "@/components/CurrencyList";
import CurrencyHistory from "@/components/CurrencyHistory";

export default {
  components: {
    CurrencyConverter,
    CurrencyList,
    CurrencyHistory,
  },
  computed: {
    ...mapState({
      error: (state) => state.error,
    }),
  },
  created() {
    this.setState({ isLoading: true });

    Promise.all([
      this.getCurrencies(),
      this.getLatest(),
      this.getLastNDaysHistory(10),
    ]).finally(() => {
      this.setState({ isLoading: false });
    });
  },
  methods: {
    ...mapActions({
      getCurrencies: "getCurrencies",
      getLatest: "getLatest",
      getLastNDaysHistory: "getLastNDaysHistory",
    }),
    ...mapMutations({
      setState: "set",
    }),
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app {
  padding: 30px 15px;
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
  &__section:not(:last-child) {
    margin-bottom: 40px;
  }
}

.error-alert {
  background: #e15241;
  padding: 20px;
  border-radius: 5px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
}
</style>
