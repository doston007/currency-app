<template>
  <card title="Список стоимостей" toggleable>
    <table class="currency-table">
      <thead>
        <tr>
          <th>{{ from }} → {{ to }}</th>
          <th>{{ to }} → {{ from }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(amount, index) in amounts" :key="amount">
          <td>
            {{ calculatedAmountsFromTo[index] }} ({{ amount }} {{ from }})
          </td>
          <td>{{ calculatedAmountsToFrom[index] }} ({{ amount }} {{ to }})</td>
        </tr>
      </tbody>
    </table>
  </card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      amounts: [1, 5, 10, 25, 50, 100, 500, 1000, 5000],
    };
  },
  computed: {
    ...mapState({
      from: (state) => state.from,
      to: (state) => state.to,
    }),
    calculatedAmountsFromTo() {
      return this.amounts.map((amount) => {
        const data = this.$store.state.latest;
        const from = data?.rates?.[this.from] || 0;
        const to = data?.rates?.[this.to] || 0;
        const result = (to / from) * amount;
        return isNaN(result)
          ? "..."
          : result.toLocaleString({ style: "currency" });
      });
    },
    calculatedAmountsToFrom() {
      return this.amounts.map((amount) => {
        const data = this.$store.state.latest;
        const from = data?.rates?.[this.from] || 0;
        const to = data?.rates?.[this.to] || 0;
        const result = (from / to) * amount;
        return isNaN(result)
          ? "..."
          : result.toLocaleString({ style: "currency" });
      });
    },
  },
};
</script>

<style lang="scss">
.currency-table {
  width: 100%;
  border: 1px solid #cdcdcd;
  border-collapse: collapse;
  th,
  td {
    width: 50%;
    text-align: left;
    border: 1px solid #cdcdcd;
    padding: 10px;
  }
}
</style>
