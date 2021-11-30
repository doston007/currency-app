<template>
  <div
    :class="['dropdown', { 'dropdown--active': isOpen }]"
    v-click-outside="close"
  >
    <button type="button" class="dropdown__selected" @click="isOpen = !isOpen">
      <span v-if="isLoading">Загрузка...</span>
      <span v-else-if="!value">{{ placeholder }}</span>
      <span v-else>
        <slot name="selected" v-bind="value">{{ value[label] }}</slot>
      </span>
      <span class="icon">▼</span>
    </button>
    <div class="dropdown__options" v-if="options.length > 0">
      <button
        v-for="option in options"
        :tabindex="isOpen ? 0 : -1"
        :class="[
          'dropdown__option',
          {
            'dropdown__option--selected':
              value && option[trackBy] === value[trackBy],
          },
        ]"
        @click="selectOption(option)"
        :key="option[trackBy]"
      >
        <slot name="option" v-bind="option">
          {{ option[label] }}
        </slot>
      </button>
    </div>
    <div class="dropdown__options" v-else>Empty</div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "Выберите",
    },
    trackBy: {
      type: String,
      default: "value",
    },
    label: {
      type: String,
      default: "label",
    },
    value: {
      type: [Object, String, Number],
      default: null,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("input", option);
      this.isOpen = false;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  $self: &;

  &__selected {
    padding: 10px;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
    background: #fff;
    transition: background 0.2s;
    font-weight: bold;
    width: 100%;
    &:hover,
    &:focus {
      background: darken(#fff, 5);
      cursor: pointer;
    }
    .icon {
      display: inline-block;
      transition: transform 0.2s;
    }
  }

  &__options {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 10px);
    border: 1px solid #cdcdcd;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: 0.2s all;
    transform: translateY(-10px);
    opacity: 0;
    pointer-events: none;
    max-height: 200px;
    overflow: auto;
  }

  &__option {
    background: #fff;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    padding: 10px;
    transition: background 0.2s;
    &:last-child {
      border-bottom: none;
    }
    &--selected {
      background: darken(#fff, 5);
      font-weight: bold;
    }
    &:hover,
    &:focus {
      background: darken(#fff, 5);
      cursor: pointer;
    }
  }

  &--active {
    #{$self} {
      &__selected .icon {
        transform: rotate(180deg);
      }

      &__options {
        transform: translateX(0);
        opacity: 1;
        pointer-events: auto;
      }
    }
  }
}
</style>
