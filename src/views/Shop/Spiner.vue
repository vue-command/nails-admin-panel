<template>
  <div class="mt-16">
    <v-progress-circular
      :size="100"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style scoped></style>

<script>
export default {
  name: 'spiner',
  props: [],
  data: () => ({}),
  methods: {}
}
</script>
