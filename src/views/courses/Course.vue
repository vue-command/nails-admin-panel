<template>
  <v-container id="edit-form">
    <v-row class="justify-center">
      <Spinner v-if="loading" />
      <CourseDetail v-if="!loading && course && !editing" :course="course" :type="type" btnTitle="BUY THIS COURSE" />
      <v-col cols="12" xs="12" md="7" v-if="editing">
        <OnlineForm :course.sync="courseData" :schema="schema" @submit="submit" mode="edit" @back="back" />
      </v-col>
      <v-col v-if="editing" cols="12" xs="12" md="5" class="d-flex flex-column justify-space-between align-center">
        <CourseCard :course="courseData" :type="type" :preview="true" />
      </v-col>
      <CourseDetail v-if="editing" :course="courseUpdate" :type="type" btnTitle="BUY THIS COURSE" />
      <div
        v-if="!loading && course && !editing"
        class="d-flex flex-column align-center flex-sm-row justify-sm-center my-8"
      >
        <v-btn @click="goToVideos" color="buttons" rounded large dark min-width="160" class="yellow-button mr-4"
          >Videos</v-btn
        >
        <v-btn
          @click="fillingForm"
          color="buttons"
          rounded
          large
          dark
          min-width="160"
          class="yellow-button my-8 my-sm-0 mx-sm-4"
          >Edit</v-btn
        >
        <v-btn
          @click="() => publish({ id: course._id, publish: !course.isPublished })"
          :disabled="!course.isPaid || !lessonsCounter"
          color="buttons"
          rounded
          large
          dark
          min-width="160"
          class="yellow-button ml-4"
          >{{ course.isPublished ? 'unpublish' : 'publish' }}</v-btn
        >
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import CourseDetail from '@/components/courses/CourseDetail.vue';
import CourseCard from '@/components/courses/CourseCard.vue';
import Spinner from '@/components/Spinner.vue';
import OnlineForm from '@/components/forms/OnlineForm.vue';

const schema = require('@/config/editOnlineCourseSchema').default;

export default {
  name: 'Course',
  components: {
    Spinner,
    CourseDetail,
    CourseCard,
    OnlineForm,
  },
  data() {
    return {
      schema,
      type: 'online',
      courseData: null,
      editing: false,
    };
  },
  computed: {
    ...mapState(['loading']),
    ...mapState('users', ['user']),
    ...mapState('onlineCourses', ['courses', 'course', 'total']),
    courseUpdate() {
      return Object.assign({}, this.course, this.courseData);
    },
    lessonsCounter() {
      return this?.course?.videos?.length ?? 0;
    },
  },
  watch: {
    course(val) {
      if (!val) return;
      this.editing = false;
    },
  },
  methods: {
    ...mapActions('onlineCourses', {
      getCourse: 'GET_COURSE',
      putCourse: 'PUT_COURSE',
      publish: 'PUBLISH',
    }),
    back() {
      this.editing = false;
    },
    submit(data) {
      const { thisCourseIsSuitableFor, ...rest } = data;
      const fd = new FormData();
      Object.entries(rest).forEach(([name, value]) => {
        if (value instanceof File) fd.append('file', value);
        else fd.append(name, value);
      });
      thisCourseIsSuitableFor.forEach(str => {
        fd.append('thisCourseIsSuitableFor[]', str);
      });
      this.putCourse({
        data: fd,
        id: this.course._id,
      });
    },
    fillingForm() {
      if (this.course) {
        this.courseData = this.course;
        this.editing = true;
        this.$vuetify.goTo('#edit-form', {
          duration: 500,
          offset: 80,
          easing: 'easeInOutCubic',
        });
      }
    },
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
