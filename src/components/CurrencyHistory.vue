<template>
  <card :title="`История курса (${from} → ${to})`" toggleable>
    <div class="currency-history">
      <div class="currency-history__header">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="[
            'currency-history__tab',
            { 'currency-history__tab--active': activeTab === tab.value },
          ]"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="currency-history__content">
        <table class="currency-table" v-if="activeTab === 'table'">
          <thead>
            <tr>
              <th>Даты</th>
              <th>{{ sum }} {{ from }} → {{ to }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="formattedHistory in formattedHistoryForTable"
              :key="formattedHistory.date"
            >
              <td>{{ formattedHistory.date }}</td>
              <td>{{ formattedHistory.value }}</td>
            </tr>
          </tbody>
        </table>
        <div
          class="history-chart"
          v-if="activeTab === 'chart' && formattedHistoryForTable.length > 0"
        >
          <HistoryChart
            :data="[...formattedHistoryForTable].reverse()"
            :label="`${from} → ${to}`"
          />
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import { mapState } from "vuex";

import HistoryChart from "@/components/HistoryChart";

export default {
  components: {
    HistoryChart,
  },
  data() {
    return {
      activeTab: "table",
      tabs: [
        {
          value: "table",
          label: "Таблица",
        },
        {
          value: "chart",
          label: "График",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      from: (state) => state.from,
      to: (state) => state.to,
      history: (state) => state.history,
      sum: (state) => state.sum,
    }),
    formattedHistoryForTable() {
      return this.history.map((his) => {
        const data = his.value;
        const from = data?.rates?.[this.from] || 0;
        const to = data?.rates?.[this.to] || 0;
        const result = (to / from) * this.sum;
        return {
          date: his.date,
          value: isNaN(result)
            ? "..."
            : result.toLocaleString({ style: "currency" }),
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.currency-history {
  &__tab {
    border: 1px solid #cdcdcd;
    background: #fff;
    transition: background 0.2s;
    padding: 10px;
    border-left: none;
    border-bottom: none;
    &:first-child {
      border-left: 1px solid #cdcdcd;
    }
    &:hover,
    &:focus {
      background: darken(#fff, 5);
      cursor: pointer;
    }
    &--active {
      background: darken(#fff, 5);
      font-weight: bold;
    }
  }

  &__content {
    border: 1px solid #cdcdcd;
    padding: 10px;
    overflow: auto;
  }

  .history-chart {
    min-width: 530px;
  }
}
</style>
