<template>
  <v-card dark class="cardfone ma-12" @click="$emit('click', course._id)">
    <CoverImage :url="checkLink(course)" :width="400" :height="250" class="image-course" />
    <v-card-title class="buttons--text pa-0 pl-4 pt-4">
      {{ course.accessDays }} days | $ {{ course.price }}
    </v-card-title>
    <v-card-title class="pa-0 pl-4">
      {{ course.name }}
    </v-card-title>
    <v-card-text class="pa-0 px-4 pb-4 text-start">
      {{ course.subtitle }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="type === 'offline'"
        color="buttons"
        rounded
        small
        outlined
        primary
        @click.stop="$emit('delete', course._id)"
        >delete</v-btn
      >
      <v-btn
        v-if="type === 'online'"
        color="buttons"
        rounded
        small
        outlined
        primary
        min-width="90"
        class="yellow-button mr-4"
        >pay</v-btn
      >
      <v-btn v-if="!course._id" color="buttons" rounded small min-width="90" dark class="yellow-button">more</v-btn>
    </v-card-actions>
    <!-- <v-card-actions v-if="type === 'online'" class="pl-4 pb-4">
      <v-btn
        color="buttons"
        rounded
        small
        outlined
        primary
        min-width="90"
        class="yellow-button mr-4"
        @click="payDetailForm"
        >pay</v-btn
      >
      <v-btn
        color="buttons"
        rounded
        small
        min-width="90"
        dark
        class="yellow-button"
        @click="detailInfoCard('course-online')"
        >more</v-btn
      >
    </v-card-actions> -->
    <!-- <v-card-actions v-else class="pl-4 pb-4">
      <v-btn
        color="buttons"
        rounded
        outlined
        small
        dark
        min-width="90"
        class="yellow-button"
        @click="mok"
        >more</v-btn
      >
    </v-card-actions> -->
    <!-- <v-card-actions v-else class="pl-4 pb-4">
      <v-btn
        color="buttons"
        rounded
        small
        outlined
        primary
        min-width="90"
        class="yellow-button mr-4"
        @click="editCourse(id)"
        >Edit</v-btn
      >
      <v-btn
        color="buttons"
        rounded
        small
        min-width="90"
        dark
        class="yellow-button"
        @click="removeCourse(id)"
        >Delete</v-btn
      >
    </v-card-actions> -->
  </v-card>
</template>

<style scoped></style>

<script>
import CoverImage from '@/components/CoverImage.vue';
import checkLink from '@/helpers/checkLink';

export default {
  name: 'CourseCard',
  props: ['course', 'type'],
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    checkLink,
  },
};
</script>
