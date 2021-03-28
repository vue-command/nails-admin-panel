<template>
  <v-container fluid>
    <Breadcrumbs />
    <router-view />
  </v-container>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';

export default {
  name: 'CoursesLayout',
  components: {
    Breadcrumbs,
  },
};
</script>

<style scoped></style>
