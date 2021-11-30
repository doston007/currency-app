<template>
  <div
    :class="['card', { 'card--toggleable': toggleable, 'card--hide': !isOpen }]"
  >
    <div
      class="card__title"
      v-if="title"
      :tabindex="toggleable ? 0 : -1"
      @click="isOpen = toggleable ? !isOpen : true"
    >
      <span>{{ title }}</span>
      <span class="icon">▼</span>
    </div>
    <div class="card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    toggleable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 5px;
  background: #fff;
  border: 1px solid #cdcdcd;
  $self: &;

  &__title {
    padding: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      display: none;
      transition: transform 0.2s;
    }
  }

  &__content {
    padding: 0 20px 20px;
  }

  &--hide {
    #{$self} {
      &__title .icon {
        transform: rotate(180deg);
      }

      &__content {
        display: none;
      }
    }
  }

  &--toggleable {
    #{$self} {
      &__title {
        cursor: pointer;
        .icon {
          display: inline-block;
        }
      }
    }
  }
}
</style>
