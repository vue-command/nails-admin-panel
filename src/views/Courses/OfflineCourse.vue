<template>
  <v-container id="edit-form">
    <v-row>
      <!-- <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col> -->
      <v-col cols="12" xs="12" v-if="!loading && course && !editing ">
        <CourseDetail
          :course="course"
          :type="type"
          btnTitle="BUY THIS COURSE"
        />
      </v-col>
       <v-col cols="12" xs="12" md="7" v-if="editing">
        <OfflineForm :course.sync="courseData" mode="edit" @submit="submit" @back="back" />
      </v-col>
      <v-col
        v-if="editing"
        cols="12"
        xs="12"
        md="5"
        class="d-flex flex-column justify-space-between align-center"
      >
        <CourseCard :course="courseData" :type="type" :preview="true"/>
      </v-col>
      <v-col cols="12" xs="12">
         <CourseDetail
          v-if="editing"
          :course="courseData"
          :type="type"
          btnTitle="BUY THIS COURSE"
        />
      <div
        v-if="!editing"
        class="d-flex flex-column align-center flex-sm-row justify-sm-center mt-8"
      >
        <v-btn
          @click="fillingForm"
          color="buttons"
          rounded
          large
          dark
          min-width="160"
          class="yellow-button"
          >Edit</v-btn
        >
      </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

// import Spinner from '@/components/Spinner.vue';
import CourseDetail from '@/components/courses/CourseDetail.vue';
import CourseCard from '@/components/courses/CourseCard.vue';
import OfflineForm from '@/components/forms/OfflineForm.vue';

export default {
  name: 'OfflineCourse',
  components: {
    // Spinner,
    CourseDetail,
    CourseCard,
    OfflineForm,
  },
  data() {
    return {
      courseData: null,
      editing: false,
      type: 'offline',
    };
  },
  computed: {
    ...mapState(['loading', 'error']),
    ...mapState('offlineCourses', [
      'course',
    ]),
  },
  watch: {
    сourse(val) {
      if (!val) return;
      this.editing = false;
    },
  },
  methods: {
    ...mapActions('offlineCourses', {
      putCourse: 'PUT_COURSE',
      getCourse: 'GET_COURSE',
    }),
    fillingForm() {
      if (this.course) {
        this.courseData = JSON.parse(JSON.stringify(this.course));
        this.editing = true;
        this.$vuetify.goTo('#edit-form', {
          duration: 500,
          offset: 80,
          easing: 'easeInOutCubic',
        });
      }
    },
    async submit(data) {
      await this.putCourse({
        data,
        id: this.$route.params.courseid,
      });
      if (!this.error) this.back();
    },
    back() {
      this.editing = false;
    },
  },
  created() {
    this.getCourse(this.$route.params.courseid);
  },
  beforeDestroy() {
  },
};
</script>

<style></style>
