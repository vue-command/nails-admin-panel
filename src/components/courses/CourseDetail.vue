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
          <v-card-text class="pa-0 pl-4 buttons--text d-flex">{{ type }} course</v-card-text>
          <v-card-title class="pa-0 pl-4">{{ course.nameOfCourse }}</v-card-title>
          <v-card-text class="pa-0 pl-4 text-start">{{ course.subtitle }}</v-card-text>
          <v-card-title class="pa-0 pl-4 buttons--text"
            >{{ course.accessDays }} days | $ {{ course.price }}</v-card-title
          >
        </v-card>
        <v-card flat class="transparent" dark v-if="type === 'online' && (!course.isPaid || !course.isPublished)">
          <v-card-text class="pa-0 pl-4 pb-4 notPaidAndPublished--text">
            <!-- <h3 v-if="!course.isPaid">this course has not been paid for yet</h3> -->
            <h3 v-if="!course.isPublished">this course has not been published yet</h3>
          </v-card-text>
        </v-card>
        <v-card flat class="transparent d-flex flex-column align-center" dark v-if="type === 'offline'">
          <table>
            <tr>
              <th>Date of course</th>
              <th>Available spots</th>
            </tr>
            <tr v-for="item in dateOfCourses" :key="item._id">
              <td>{{ item.date }}</td>
              <td class="text-right">{{ item.availableSpots }}</td>
            </tr>
          </table>
        </v-card>
        <v-card flat class="transparent d-flex flex-column align-center" dark>
          <v-card-title>This course is cuitable for:</v-card-title>
          <ul>
            <li v-for="(item, index) in course.thisCourseIsSuitableFor" :key="index">
              {{ item }}
            </li>
          </ul>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" order="1" sm="6" order-sm="2" align="center" justify="center">
        <CoverImage :url="checkLink(course)" />
      </v-col>
      <v-col cols="12" xs="12" order="2">
        <v-card-text class="mt-16 whitefone--text d-flex justify-center justify-sm-start"
          >Author and instructor of the course: {{ course.instructor }}</v-card-text
        >
      </v-col>
      <v-col cols="12" xs="12" order="2">
        <v-card flat dark class="transparent">
          <v-card-title class="d-flex justify-center justify-sm-start">On this course:</v-card-title>
          <v-card-text>
            <p v-for="(item, index) in descriptions" :key="index">
              {{ item }}
            </p>
          </v-card-text>
          <v-card-text>{{ course.infoForBonus }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CoverImage from '@/components/CoverImage.vue';
import checkLink from '@/helpers/checkLink';
import { datesToString } from '@/helpers/datesToString';

export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  components: {
    CoverImage,
  },
  name: 'CourseDetail',
  data() {
    return {};
  },
  computed: {
    dateOfCourses() {
      return this.course.dateOfCourses.map(item => ({
        date: this.formatedDate(item.date),
        availableSpots: item.availableSpots,
      }));
    },
    descriptions() {
      return this.course?.description
        ? this.course.description
            .split('\n')
            .map(str => str.trim())
            .filter(str => str)
        : [];
    },
  },
  watch: {},
  methods: {
    checkLink,
    formatedDate(date) {
      let dates = [];
      try {
        dates = JSON.parse(date);
      } catch (e) {
        // console.error(e.message);
      }
      if (!Array.isArray(dates)) dates = [];
      return datesToString(dates);
    },
  },
};
</script>

<style scoped>
td {
  padding: 8px;
}
</style>