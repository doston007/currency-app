<template>
  <card title="Конвертация валют">
    <div class="converter">
      <div class="converter__side">
        <dropdown
          class="converter__dropdown"
          v-model="from"
          placeholder="Выберите валюту"
          :options="formattedCurrencies"
        >
          <template v-slot:selected="value">
            <strong class="selected-text">{{ value.label }}</strong>
            {{ value.value }}
          </template>
          <template v-slot:option="option">
            <div class="converter__option">
              <span>{{ option.label }}</span>
              <strong>{{ option.value }}</strong>
            </div>
          </template>
        </dropdown>
        <field
          type="number"
          v-model.number="sum"
          size="lg"
          class="converter__field"
        />
      </div>
      <button class="converter__reverse" @click="reverse">
        <img src="@/assets/icons/reverse.svg" alt="Reverse" />
      </button>
      <div class="converter__side">
        <div class="converter__side">
          <dropdown
            class="converter__dropdown"
            v-model="to"
            placeholder="Выберите валюту"
            :options="formattedCurrencies"
          >
            <template v-slot:selected="value">
              <strong class="selected-text">{{ value.label }}</strong>
              {{ value.value }}
            </template>
            <template v-slot:option="option">
              <div class="converter__option">
                <span>{{ option.label }}</span>
                <strong>{{ option.value }}</strong>
              </div>
            </template>
          </dropdown>
          <field
            :value="calculatedValue"
            readonly
            size="lg"
            class="converter__field"
          />
        </div>
      </div>
    </div>
    <div class="date">Курс за {{ lastUpdateDate }}</div>
  </card>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import dayjs from "dayjs";

import Dropdown from "@/components/ui/Dropdown";
import Field from "@/components/ui/Field";

export default {
  components: {
    Dropdown,
    Field,
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
    }),
    formattedCurrencies() {
      return this.$store.getters.formattedCurrencies;
    },
    sum: {
      get() {
        return this.$store.state.sum;
      },
      set(val) {
        localStorage.setItem("sum", val);
        this.setState({ sum: val });
      },
    },
    from: {
      get() {
        return this.formattedCurrencies.find(
          (curr) => curr.value === this.$store.state.from
        );
      },
      set(val) {
        localStorage.setItem("from", val.value);
        this.setState({ from: val.value });
      },
    },
    to: {
      get() {
        return this.formattedCurrencies.find(
          (curr) => curr.value === this.$store.state.to
        );
      },
      set(val) {
        localStorage.setItem("to", val.value);
        this.setState({ to: val.value });
      },
    },
    calculatedValue() {
      const data = this.$store.state.latest;
      const from = data?.rates?.[this.from?.value] || 0;
      const to = data?.rates?.[this.to?.value] || 0;
      const result = (to / from) * this.sum;
      return isNaN(result)
        ? "..."
        : result.toLocaleString({ style: "currency" });
    },
    lastUpdateDate() {
      const date = this.$store.state.latest?.timestamp;
      return date ? dayjs(date * 1000).format("DD-MM-YYYY HH:mm") : "-";
    },
  },
  methods: {
    ...mapMutations({
      setState: "set",
    }),
    reverse() {
      const temp = this.from;
      this.from = this.to;
      this.to = temp;
    },
  },
};
</script>

<style lang="scss" scoped>
.date {
  margin-top: 30px;
  font-size: 0.8rem;
}
.converter {
  display: flex;
  justify-content: space-between;

  &__side {
    flex: 1;
  }

  &__reverse {
    min-width: 38px;
    width: 38px;
    height: 38px;
    padding: 5px;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
    background: #fff;
    transition: background 0.2s;
    margin: 0 20px;
    &:hover,
    &:focus {
      background: darken(#fff, 5);
      cursor: pointer;
    }
  }

  &__dropdown {
    margin-bottom: 20px;
  }

  &__option {
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (max-width: 767px) {
  .converter {
    &__dropdown {
      .selected-text {
        display: none;
      }
    }

    &__option {
      span {
        display: none;
      }
    }
  }
}
</style>
