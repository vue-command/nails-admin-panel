<template>
  <v-container>
    <h2 class="ma-8 text-title">OFFLINE COURSES</h2>
    <v-btn @click="addCourse">add new offline course</v-btn>
    <Spiner v-if="isLoading" />
    <div v-if="showBanerNoData" class="text-message">No courses data received.</div>
    <div v-if="showBanerNoCourses" class="text-message">No courses have been added yet.</div>
    <Courses
      v-if="showCourses"
      :courses="courses"
      :total="totalCourses"
      title="Offline courses"
      :more="addCourses"
      :removeCourse="removeCourse"
      :editCourse="editCourse"
      :addCourse="addCourse"
      addCourseTitle="add new offline course"
    />
     <CoursesForm
      v-if="showForm"
      :idCourse="editCourseID"
      typeCourse="offline"
      :getCourseID="getCourseID"
      :sendData="sendData"
      :back="backForm"
      :coverImageSrc="coverImageSrc"
    />
  </v-container>
</template>
<style scoped>
.text-title,
.text-message {
  color: #fff;
}
.text-message {
  font-size: 22px;
  margin-top: 50px;
}
</style>
<script>
import Courses from './components/Courses.vue';
import 'nails-courses-admin-form';
import 'nails-courses-admin-form/dist/nails-courses-admin-form.css';
import Spiner from './components/Spiner.vue';

export default {
  name: 'offline-courses-page',
  components: {
    Courses,
    Spiner,
  },
  data: () => ({
    courses: null,
    totalCourses: null,
    isLoading: true,
    showForm: false,
    editCourseID: null,
    methodPost: true,
    // eslint-disable-next-line global-require
    coverImageSrc: require('@/assets/noImage.jpg'),
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

    async getCourseID(id) {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/offline/${id}`,
        )
      ).json();
      return response.offlineCourse;
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
        this.$notify({
          group: 'foo',
          title: 'Important message',
          text: 'Course successfully deleted',
        });
        // eslint-disable-next-line no-underscore-dangle
        this.courses = this.courses.filter((course) => course._id !== id);
        this.totalCourses -= 1;
        this.$forceUpdate();
      }
    },

    addCourse() {
      this.editCourseID = null;
      this.methodPost = true;
      this.showForm = true;
    },

    editCourse(id) {
      this.editCourseID = id;
      this.methodPost = false;
      this.showForm = true;
    },

    backForm() {
      this.showForm = false;
    },

    // Create and update course.
    async sendData(formData) {
      const offlineRequest = 'https://nails-australia-staging.herokuapp.com/course/new/offline';
      const url = this.methodPost
        ? offlineRequest
        : `${offlineRequest.replace(/[/]new/gi, '')}/${this.editCourseID}`;

      const method = this.methodPost ? 'POST' : 'PUT';

      const response = await (
        await fetch(url, {
          method,
          body: formData,
        })
      ).json();

      if (response?.newOfflineCourse) {
        // Baner
        //  Course successfully created.
        this.$notify({
          group: 'foo',
          title: 'Important message',
          text: 'Course successfully created',
        });
        this.totalCourses += 1;
        this.isLoading = true;
        this.getCourses();
      }
      if (response?.updatedOfflineCourse) {
        // Baner
        //  Course successfully updated.
        this.$notify({
          group: 'foo',
          title: 'Important message',
          text: 'Course successfully updated.',
        });
        this.isLoading = true;
        this.getCourses();
      }
      this.showForm = false;
    },
  },
  created() {
    this.getCourses();
  },
};
</script>
