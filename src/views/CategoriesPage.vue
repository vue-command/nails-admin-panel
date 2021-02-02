<template>
  <v-container class="">
    <v-row>
      <v-col> categoies </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'shop',
  data() {
    return {};
  },
  computed: {
    ...mapState('categories', ['isPageLoading', 'categories']),
  },
};
</script>

<style></style>
