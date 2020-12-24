<template>
  <v-container>
    <v-row>
      <EditCourseForm typeCourse="offline"/>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import EditCourseForm from '@/components/courses/EditCourseForm.vue';

export default {
  components: {
    EditCourseForm,
  },
  name: 'create-offline-course',
};
</script>
