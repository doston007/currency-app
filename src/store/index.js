import Vue from "vue";
import Vuex from "vuex";

import $api from "@/api";
import dayjs from "dayjs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    isLoading: false,
    from: localStorage.getItem("from") || "RUB",
    to: localStorage.getItem("to") || "USD",
    sum: localStorage.getItem("sum") || 0,
    currencies: {},
    latest: {},
    history: [],
  },

  getters: {
    formattedCurrencies: (state) =>
      Object.keys(state.currencies).map((key) => ({
        value: key,
        label: state.currencies[key],
      })),
  },

  mutations: {
    set(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (
          !Array.isArray(state[key]) &&
          state[key] &&
          typeof state[key] === "object"
        ) {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
  },

  actions: {
    async getCurrencies({ commit }) {
      try {
        const response = await $api.get("currencies.json");
        commit("set", { currencies: response.data });
        return response.data;
      } catch (e) {
        commit("set", { error: e.message });
        throw e;
      }
    },
    async getLatest({ commit }) {
      try {
        const response = await $api.get("latest.json");
        commit("set", { latest: response.data });
        return response.data;
      } catch (e) {
        commit("set", { error: e.message });
        throw e;
      }
    },
    getLastNDaysHistory({ commit }, days) {
      // Last 10 days
      const dates = [];
      for (let i = 1; i <= days; i++) {
        dates.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
      }
      return Promise.all(
        dates.map((date) => $api.get(`historical/${date}.json`))
      )
        .then((responses) => {
          commit("set", {
            history: responses.map((res, i) => ({
              date: dates[i],
              value: res.data,
            })),
          });
        })
        .catch((e) => Promise.reject(e));
    },
  },
});
