<template>
  <div>
    <Spinner v-if="loading" />
    <CourseDetail
      v-if="!loading && onlineCourseById"
      :course="onlineCourseById"
      :type="typeCourse"
      btnTitle="BUY THIS COURSE"
    />
    <div
      v-if="!loading && onlineCourseById"
      class="d-flex flex-column align-center flex-sm-row justify-sm-center mt-8"
    >
      <v-btn
        @click="goToVideos"
        color="buttons"
        rounded
        large
        dark
        min-width="160"
        class="yellow-button mb-4 mb-sm-0 mr-0 mr-sm-4"
        >Videos</v-btn
      >
      <v-btn
        @click="$store.dispatch('onlineCourses/PUBLISH', courseId)"
        :disabled="!onlineCourseById.isPaid || onlineCourseById.isPublished"
        color="buttons"
        rounded
        large
        dark
        min-width="160"
        class="yellow-button"
        >publish</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CourseDetail from '@/components/courses/CourseDetail.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'online-course',
  components: {
    Spinner,
    CourseDetail,
  },
  data() {
    return {
      courseId: this.$route.params.courseid,
      course: null,
      ready: false,
      typeCourse: 'online',
    };
  },
  computed: {
    ...mapState('onlineCourses', [
      'onlineCourses',
      'onlineCourseById',
      'totalOnlineCourses',
      'loading',
    ]),
  },
  watch: {},
  methods: {
    goToVideos() {
      if (this.$route.name !== 'online-course-videos') {
        this.$router.push({ name: 'online-course-videos' });
      }
    },
  },
  created() {
    this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_BY_ID', this.courseId);
  },
};
</script>

<style></style>
