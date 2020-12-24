<template>
  <div>
    <Spinner v-if="loading" />
    <CourseDetail
      v-if="noEmptyCourse"
      :course="currentOfflineCourse"
      :type="typeCourse"
      btnTitle="BUY THIS COURSE"
      :btnCallBack="null"
    />
    <EditCourseForm
      v-if="showForm"
      :typeCourse="typeCourse"
      :course="currentOfflineCourse"
      :back="backForm"
    />
    <div
      v-if="noEmptyCourse"
      class="d-flex flex-column align-center flex-sm-row justify-sm-center mt-8"
    >
      <v-btn
        @click="showForm = true"
        color="buttons"
        rounded
        large
        dark
        min-width="160"
        class="yellow-button"
        >Edit</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Spinner from '@/components/Spinner.vue';
import CourseDetail from '@/components/courses/CourseDetail.vue';
import EditCourseForm from '@/components/courses/EditCourseForm.vue';

export default {
  name: 'offline-course',
  components: {
    Spinner,
    CourseDetail,
    EditCourseForm,
  },
  data() {
    return {
      courseId: this.$route.params.courseid,
      showForm: false,
      typeCourse: 'offline',
      // eslint-disable-next-line global-require
      coverImageSrc: require('@/assets/noImage.jpg'),
    };
  },
  computed: {
    ...mapState('offlineCourses', [
      'offlineCourses',
      'currentOfflineCourse',
      'totalOfflineCourses',
      'loading',
    ]),
    noEmptyCourse() {
      return !this.loading && this.currentOfflineCourse && !this.showForm;
    },
  },
  watch: {
    currentOfflineCourse(val) {
      if (!val) return;
      this.showForm = false;
    },
  },
  methods: {
    editCourseById(data) {
      this.$store.dispatch('userCourses/PUT_USER_COURSE_ID', {
        data,
        id: this.courseId,
      });
    },
    backForm() {
      this.showForm = false;
    },
  },
  created() {
    if (!this.currentOfflineCourse) {
      this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSE_BY_ID', this.courseId);
    }
  },
  beforeDestroy() {
    this.$store.dispatch('offlineCourses/CLEAR_OFFLINE_COURSE_BY_ID');
  },
};
</script>

<style></style>
