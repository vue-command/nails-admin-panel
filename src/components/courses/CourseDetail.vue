<template>
  <v-container fluid dark>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        order="2"
        sm="6"
        order-sm="2"
        class="d-flex flex-column justify-space-between align-center align-sm-start"
      >
        <v-card flat class="mb-8 transparent" dark>
          <v-card-title class="pa-0 pl-4">{{ course.category }}</v-card-title>
          <v-card-text class="pa-0 pl-4 buttons--text d-flex"
            >{{ type }} course</v-card-text
          >
          <v-card-title class="pa-0 pl-4">{{
            course.nameOfCourse
          }}</v-card-title>
          <v-card-text class="pa-0 pl-4 text-start">{{
            course.subtitle
          }}</v-card-text>
          <v-card-title class="pa-0 pl-4 buttons--text"
            >{{ course.accessDays }} days | $ {{ course.price }}</v-card-title
          >
        </v-card>
        <v-card flat class="transparent" dark v-if="type === 'online'">
          <v-card-text
            v-if="!course.isPaid"
            class="pa-0 pl-4 pb-4 d-flex notPaidAndPublised--text"
            ><h3>this course has not been paid for yet</h3></v-card-text
          >
          <v-card-text
            v-if="!course.isPublished"
            class="pa-0 pl-4 d-flex notPaidAndPublised--text"
            ><h3>this course has not been published yet</h3></v-card-text
          >
        </v-card>
        <v-card
          flat
          class="transparent d-flex flex-column align-center"
          dark
          v-else
        >
          <v-card-title>Date of courses:</v-card-title>
          <div v-for="(item, index) in course.dateOfCourses" :key="index">
            <p>Date: {{ item.date }}</p>
            <p>Available of spots: {{ item.availableSpots }}</p>
          </div>
        </v-card>
        <v-card flat class="transparent d-flex flex-column align-center" dark>
          <v-card-title>This course is cuitable for:</v-card-title>
          <ul>
            <li
              v-for="(item, index) in course.thisCourseIsSuitableFor"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        order="1"
        sm="6"
        order-sm="2"
        align="center"
        justify="center"
      >
        <CoverImage :url="checkLink(course)" :height="400" />
      </v-col>
      <v-col cols="12" xs="12" order="2">
        <v-card-text
          class="mt-16 whitefone--text d-flex justify-center justify-sm-start"
          >Author and instructor of the course:
          {{ course.instructor }}</v-card-text
        >
      </v-col>
      <v-col cols="12" xs="12" order="2">
        <v-card flat dark class="transparent">
          <v-card-title class="d-flex justify-center justify-sm-start"
            >On this course:</v-card-title
          >
          <v-card-text>{{ course.description }}</v-card-text>
          <v-card-text>{{ course.infoBonus }}</v-card-text>
        </v-card>
      </v-col>
      <!-- <v-col
        cols="12"
        xs="12"
        class="d-flex justify-center justify-sm-end"
        order="2"
      >
        <v-btn
          color="buttons"
          rounded
          small
          outlined
          primary
          min-width="90"
          class="yellow-button mr-4"
          @click="btnHandler"
          >{{ btnTitle }}</v-btn
        >
      </v-col> -->
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import CoverImage from '@/components/CoverImage.vue';
import checkLink from '@/helpers/checkLink';

export default {
  props: ['course', 'type'],
  components: {
    CoverImage,
  },
  name: 'preview-course',
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {
    checkLink,
  },
};
</script>
