<template>
  <v-container>
    <h2 class="ma-4 text-center">OFFLINE COURSES</h2>
    <div class="d-flex justify-center">
      <v-btn
        color="buttons"
        rounded
        outlined
        primary
        class="my-8"
        @click="$router.push({ name: 'create-offline-course' })"
        >add new offline course</v-btn
      >
    </div>
    <h3 v-if="emtyCourses" class="text-center">No courses have been added yet.</h3>
    <div class="d-flex flex-wrap justify-center">
      <CourseCard
        v-for="course in courses"
        :key="course._id"
        :course="course"
        type="offline"
        @click="goToCourse"
        @delete="removeCourse"
        :deleteBtn="true"
      />
    </div>
    <div v-if="loading" class="d-flex flex-wrap justify-center">
      <v-card v-for="(item, index) in 4" :key="index" width="300" height="400" class="ma-4">
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
        @click="
          getMoreCourses({
            skip: courses.length,
          })
        "
        >More</v-btn
      >
    </div>

    <confirmDelete :dialog.sync="dialog" :confirmDelete="confirmDelete"/>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import CourseCard from '@/components/courses/CourseCard.vue';
import confirmDelete from '@/components/popups/confirmDelete.vue';

export default {
  name: 'OfflineCoursesPage',
  components: {
    CourseCard,
    confirmDelete,
  },
  data: () => ({
    dialog: false,
    deleteId: null,
  }),
  computed: {
    ...mapState(['loading']),
    ...mapState('offlineCourses', ['courses', 'total']),
    emtyCourses() {
      return !this.loading && !this.courses?.length;
    },
    isHideMoreBtn() {
      return this.courses.length < this.total;
    },
  },
  watch: {},
  methods: {
    ...mapActions('offlineCourses', {
      getCourses: 'GET_COURSES',
      getMoreCourses: 'GET_MORE_COURSES',
      deleteCourse: 'DELETE_COURSE',
    }),
    confirmDelete() {
      this.deleteCourse(this.deleteId);
      this.dialog = false;
    },
    goToCourse(id) {
      this.$router.push({
        name: 'offline-course',
        params: {
          courseid: id,
        },
      });
    },
    removeCourse(id) {
      this.dialog = true;
      this.deleteId = id;
    },
  },
  created() {
    this.getCourses();
  },
};
</script>
