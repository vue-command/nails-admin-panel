<template>
  <div class="mt-16 spinner">
    <v-progress-circular :size="size" :width="width" :color="color" indeterminate></v-progress-circular>
  </div>
</template>


<script>
export default {
  name: 'Spinner',
  props: {
    size: {
      type: Number,
      default: 100,
    },
    width: {
      type: Number,
      default: 7,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  data: () => ({}),
  methods: {},
};
</script>

<style scoped>
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
</style>