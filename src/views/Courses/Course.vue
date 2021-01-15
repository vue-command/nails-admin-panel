<template>
  <div>
    <Spinner v-if="loading" />
    <CourseDetail
      v-if="!loading && course"
      :course="course"
      :type="type"
      btnTitle="BUY THIS COURSE"
    />
    <div
      v-if="!loading && course"
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
        @click="()=> publish(courseId)"
        :disabled="!course.isPaid || course.isPublished"
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
import { mapState, mapActions } from 'vuex';

import CourseDetail from '@/components/courses/CourseDetail.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'Course',
  components: {
    Spinner,
    CourseDetail,
  },
  data() {
    return {
      type: 'online',
    };
  },
  computed: {
    ...mapState(['loading']),
    ...mapState('onlineCourses', [
      'courses',
      'course',
      'total',
    ]),
  },
  watch: {},
  methods: {
    ...mapActions('onlineCourses', {
      getCourse: 'GET_COURSE',
      publish: 'PUBLISH',
    }),
    goToVideos() {
      if (this.$route.name !== 'online-course-videos') {
        this.$router.push({ name: 'online-course-videos' });
      }
    },
  },
  created() {
    this.getCourse(this.$route.params.courseid);
  },
};
</script>

<style></style>
