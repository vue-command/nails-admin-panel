<template>
  <div>
    <h2 class="ma-8 text-title">OFFLINE COURSES</h2>
    <v-btn @click="addCourse" v-if="!showForm">add new offline course</v-btn>
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
  </div>
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
import Spiner from './components/Spinner.vue';

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
      try {
        const { offlineCourses, total, error } = await (
          await fetch(
            'https://nails-australia-staging.herokuapp.com/course/offline',
          )
        ).json();
        if (offlineCourses) {
          this.courses = offlineCourses;
          this.totalCourses = total;
        }
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        }
        this.isLoading = false;
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong',
        });
        this.isLoading = false;
      }
    },

    async getCourseID(id) {
      try {
        const { offlineCourse, error } = await (
          await fetch(
            `https://nails-australia-staging.herokuapp.com/course/offline/${id}`,
          )
        ).json();
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        }
        return offlineCourse;
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong',
        });
        return null;
      }
    },

    async addCourses() {
      try {
        const { offlineCourses, error } = await (
          await fetch(
            `https://nails-australia-staging.herokuapp.com/course/offline?skip=${this.courses.length}`,
          )
        ).json();
        if (offlineCourses) {
          this.courses = [...this.courses, ...offlineCourses];
        }
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        }
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong',
        });
      }
    },

    async removeCourse(id) {
      try {
        const { deleted, error } = await (
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
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        }
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong',
        });
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

      try {
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
        if (response?.error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: response.error,
          });
        }
        this.showForm = false;
      } catch (error) {
        this.$notify({
          group: 'foo',
          title: error.message || 'Something went wrong',
          type: 'error',
        });
        this.showForm = false;
      }
    },
  },
  created() {
    this.getCourses();
  },
};
</script>
