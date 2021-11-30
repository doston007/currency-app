<template>
  <input
    v-on="listeners"
    :value="value"
    v-bind="$attrs"
    :class="['field', `field--${size}`]"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["lg", "md", "sm"].includes(value),
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: ($event) => {
          this.$emit("input", $event.target.value);
        },
        change: ($event) => {
          this.$emit("change", $event.target.value);
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  font-size: 1rem;
  padding: 0.625rem;
  border: 1px solid #cdcdcd;
  border-radius: 5px;
  background: #fff;
  transition: 0.2s all;
  width: 100%;
  &:hover {
    background: darken(#fff, 5);
  }
  &:focus {
    outline: none;
    border-color: darken(#cdcdcd, 20);
  }

  &--sm {
    font-size: 0.5rem;
    padding: 0.3rem;
  }
  &--md {
    font-size: 1rem;
    padding: 0.625rem;
  }
  &--lg {
    font-size: 1.5rem;
    padding: 1rem;
  }
}
</style>
