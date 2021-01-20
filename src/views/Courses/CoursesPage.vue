<template>
  <v-container>
    <h2 class="ma-4 text-title">ONLINE COURSES</h2>
    <div class="d-flex justify-center">
      <v-radio-group v-model="radioGroup" row>
        <v-radio
          v-for="current of filterCourses"
          :key="current.title"
          dark
          :label="current.title"
        ></v-radio>
      </v-radio-group>
    </div>
    <!-- <Spinner v-if="loading" /> -->
    <h2 v-if="emtyCourses" class="text-message">
      No courses have been added yet
    </h2>
    <div class="d-flex flex-wrap justify-center">
      <CourseCard
        v-for="course in courses"
        :key="course._id"
        :course="course"
        type="online"
        @click="goToCourse"
      />
    </div>
    <div v-if="loading" class="d-flex flex-wrap justify-center">
      <v-card
        v-for="(item, index) in 4"
        :key="index"
        width="400"
        height="350"
        class="ma-4"
      >
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-card>
    </div>
    <v-btn
      v-if="!emtyCourses && isHideMoreBtn"
      @click="
        getMore({
          string: filterCourses[radioGroup].param,
          skip: courses.length,
        })
      "
      >More</v-btn
    >
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState, mapActions } from 'vuex';

import CourseCard from '@/components/courses/CourseCard.vue';
// import Spinner from '@/components/Spinner.vue';

export default {
  name: 'CoursesPage',
  components: {
    // Spinner,
    CourseCard,
  },
  data: () => ({
    radioGroup: 0,
    filterCourses: [
      {
        title: 'All',
        param: '?withHidden=withHidden',
      },
      {
        title: 'Hidden only',
        param: '?withHidden=hiddenOnly',
      },
      {
        title: 'Published only',
        param: '',
      },
    ],
  }),
  computed: {
    ...mapState(['loading']),
    ...mapState('onlineCourses', ['courses', 'total']),
    emtyCourses() {
      return !this.loading && !this.courses?.length;
    },
    isHideMoreBtn() {
      return this.courses.length < this.total;
    },
  },
  watch: {
    radioGroup(newVal) {
      this.getCourses(this.filterCourses[newVal].param);
    },
  },
  methods: {
    ...mapActions('onlineCourses', {
      getCourses: 'GET_COURSES',
      getMore: 'GET_MORE_COURSES',
    }),
    goToCourse(id) {
      this.$router.push({
        name: 'online-course',
        params: {
          courseid: id,
        },
      });
    },
  },
  created() {
    this.getCourses(this.filterCourses[this.radioGroup].param);
  },
};
</script>
