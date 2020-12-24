<template>
  <v-container fluid>
    <Breadcrumbs />
    <router-view />
  </v-container>
</template>
<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';

export default {
  components: {
    Breadcrumbs,
  },
  data: () => ({
  }),
  methods: {
  },
  beforeCreate() {
    this.$vuetify.theme.dark = true;
  },
  beforeDestroy() {
    this.$vuetify.theme.dark = false;
  },
};
</script>
