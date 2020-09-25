<template>
  <div>
    <Spiner v-if="isLoading" />
    <div v-if="showBanerNoData">No courses data received.</div>
    <div v-if="showBanerNoCourses">No courses have been added yet.</div>
    <Courses
      v-if="showCourses"
      :courses="courses"
      :total="totalCourses"
      title="Offline courses"
      :more="addCourses"
      :removeCourse="removeCourse"
      :editCourse="editCourse"
    />
    <CoursesForm v-if="showForm" :id="editeCourseID" typeCourse="offline" :sendData="sendData"/>
  </div>
</template>
<script>
import Courses from './components/Courses.vue';
import CoursesForm from './components/CoursesForm.vue';
import Spiner from './components/Spiner.vue';

export default {
  name: 'offline-courses-page',
  components: {
    Courses,
    Spiner,
    CoursesForm,
  },
  data: () => ({
    courses: null,
    totalCourses: null,
    isLoading: true,
    showForm: false,
    editeCourseID: null,
    methodPost: true,
  }),
  computed: {
    showCourses() {
      return (
        !this.isLoading
        && this.courses !== null
        && this.courses?.length > 0
        && !this.showForm
      );
    },
    showBanerNoData() {
      return !this.isLoading && this.courses === null;
    },
    showBanerNoCourses() {
      return !this.isLoading && this.courses?.length === 0;
    },
  },
  methods: {
    // async editCourseOffline(id) {
    //   const response = await (
    //     await fetch(
    //       `https://nails-australia-staging.herokuapp.com/course/offline/${id}`
    //     )
    //   ).json();
    //   this.id = id
    //   this.currentCourse = await response.offlineCourse;
    //   console.log(currentCourse);
    // },

    async getCourses() {
      const response = await (
        await fetch(
          'https://nails-australia-staging.herokuapp.com/course/offline',
        )
      ).json();
      if (!response?.error) {
        this.courses = response.offlineCourses;
        this.totalCourses = response.total;
      }
      this.isLoading = false;
    },

    async addCourses() {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/offline?skip=${this.courses.length}`,
        )
      ).json();
      if (response.offlineCourses) {
        this.courses = [...this.courses, ...response.offlineCourses];
      }
      // else this.error = true;
    },

    async removeCourse(id) {
      const { deleted } = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/offline/${id}`,
          {
            method: 'DELETE',
          },
        )
      ).json();
      if (deleted) {
        this.courses = this.courses.map((course) => course.id !== id);
      }
    },

    editCourse(id) {
      this.showForm = true;
      this.editeCourseID = id;
    },

    createCourse() {
      console.log('createCourse');
    },

    async sendData(formData) {
      const offlineRequest = 'https://nails-australia-staging.herokuapp.com/course/new/offline';
      const url = this.methodPost
        ? offlineRequest
        : `${offlineRequest.replace(/[/]new/gi, '')}/${this.editeCourseID}`;

      const method = this.methodPost ? 'POST' : 'PUT';

      const response = await (
        await fetch(url, {
          method,
          body: formData,
        })
      ).json();

      if (response?.newOfflineCourse) {
      //   this.openForm(false);
      //   this.getOfflineData();
      }
      if (response?.updatedOfflineCourse) {
      //   this.openForm(false);
      //   this.getOfflineData();
      }
      this.showForm = false;
    },
  },
  created() {
    this.getCourses();
  },
};
</script>
