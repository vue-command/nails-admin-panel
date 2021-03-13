<template>
  <div class="mt-16 spinner">
    <v-progress-circular
      :size="100"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style scoped>
.spinner {
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  z-index: 100;
}
</style>

<script>
export default {
  name: 'Spiner',
  props: [],
  data: () => ({}),
  methods: {},
};
</script>
