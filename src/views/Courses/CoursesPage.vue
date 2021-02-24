<template>
  <v-container>
    <h2 class="ma-4 text-center">ONLINE COURSES</h2>
    <div class="d-flex justify-center">
      <v-btn
        color="buttons"
        rounded
        outlined
        primary
        class="my-8"
        @click="$router.push({ name: 'create-online-course' })"
        >add new online course</v-btn
      >
    </div>
    <div class="d-flex justify-center">
      <v-checkbox v-model="isAdmin" label="Admin courses" class="mr-4" />
      <v-radio-group v-model="radioGroup" row>
        <v-radio v-for="current of filterCourses" :key="current.title" dark :label="current.title"></v-radio>
      </v-radio-group>
    </div>
    <!-- <Spinner v-if="loading" /> -->
    <h2 v-if="emtyCourses" class="text-center">No courses have been added yet</h2>
    <div class="d-flex flex-wrap justify-center">
      <CourseCard
        v-for="course in courses"
        :key="course._id"
        :course="course"
        type="online"
        @click="goToCourse"
        @delete="removeCourse"
      />
    </div>
    <div v-if="loading" class="d-flex flex-wrap justify-center">
      <v-card v-for="(item, index) in 4" :key="index" width="400" height="350" class="ma-4">
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-card>
    </div>
    <div class="text-center">
      <v-btn
        v-if="!emtyCourses && isHideMoreBtn"
        color="buttons"
        rounded
        outlined
        primary
        @click="getMore(queries ? queries + '&skip=' + courses.length : '?skip=' + courses.length)"
        >More</v-btn
      >
    </div>
    <confirmDelete :dialog.sync="dialog" :confirmDelete="confirmDelete" />
  </v-container>
</template>
<style scoped>
</style>
<script>
import { mapState, mapActions } from 'vuex';

import CourseCard from '@/components/courses/CourseCard.vue';
import confirmDelete from '@/components/popups/confirmDelete.vue';
// import Spinner from '@/components/Spinner.vue';

export default {
  name: 'CoursesPage',
  components: {
    // Spinner,
    confirmDelete,
    CourseCard,
  },
  data: () => ({
    dialog: false,
    deleteId: null,
    radioGroup: 0,
    isAdmin: true,
    filterCourses: [
      {
        title: 'All',
        param: '',
      },
      {
        title: 'Unpublished only',
        param: 'published=false',
      },
      {
        title: 'Published only',
        param: 'published=true',
      },
    ],
  }),
  computed: {
    ...mapState(['loading']),
    ...mapState('onlineCourses', ['courses', 'total']),
    ...mapState('user', ['user']),
    emtyCourses() {
      return !this.loading && !this.courses?.length;
    },
    isHideMoreBtn() {
      return this.courses.length < this.total;
    },
    queries() {
      const adminQuery = this.isAdmin ? `userId=${this.user?._id}` : '';
      const queries = [adminQuery, this.filterCourses[this.radioGroup].param].filter(str => str).join('&');
      return queries.length ? '?' + queries : '';
    },
  },
  watch: {
    radioGroup() {
      this.getCourses(this.queries);
    },
    isAdmin() {
      this.getCourses(this.queries);
    },
  },
  methods: {
    ...mapActions('onlineCourses', {
      getCourses: 'GET_COURSES',
      getMore: 'GET_MORE_COURSES',
      deleteCourse: 'DELETE_COURSE',
    }),
    async confirmDelete() {
      await this.deleteCourse(this.deleteId);
      this.dialog = false;
      this.getCourses(this.queries);
    },
    removeCourse(id) {
      this.dialog = true;
      this.deleteId = id;
    },
    goToCourse(id) {
      this.$router.push({
        name: 'online-course',
        params: {
          courseid: id,
        },
      });
    },
  },
  mounted() {
    this.getCourses(this.queries);
  },
};
</script>
