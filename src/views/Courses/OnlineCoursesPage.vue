<template>
  <div>
    <Spiner v-if="isLoading" />
    <div v-if="showBanerNoData">No courses data received.</div>
    <div v-if="showBanerNoCourses">No courses have been added yet.</div>
    <Courses
      v-if="showCourses"
      :courses="courses"
      :total="totalCourses"
      title="Online courses"
      :more="addCourses"
      :removeCourse="removeCourse"
      :editCourse="editCourse"
      :addCourse="addCourse"
      addCourseTitle="add new online course"
    />
    <CoursesForm
      v-if="showForm"
      :id="editeCourseID"
      typeCourse="online"
      :getCourseID="getCourseID"
      :sendData="sendData"
      :back="backForm"
    />
  </div>
</template>
<script>
import Courses from './components/Courses.vue';
import CoursesForm from './components/CoursesForm.vue';
import Spiner from './components/Spiner.vue';

export default {
  name: 'online-courses-page',
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
    async getCourses() {
      const response = await (
        await fetch(
          'https://nails-australia-staging.herokuapp.com/course/online',
        )
      ).json();
      if (!response?.error) {
        this.courses = response.onlineCourses;
        this.totalCourses = response.total;
      }
      this.isLoading = false;
    },

    async getCourseID(id) {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/${id}`,
        )
      ).json();
      return response.onlineCourse;
    },

    async addCourses() {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online?skip=${this.courses.length}`,
        )
      ).json();
      if (response.offlineCourses) {
        this.courses = [...this.courses, ...response.onlineCourses];
      }
      // else this.error = true;
    },

    async removeCourse(id) {
      const { deleted } = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/${id}`,
          {
            method: 'DELETE',
          },
        )
      ).json();
      if (deleted) {
        // eslint-disable-next-line no-underscore-dangle
        this.courses = this.courses.filter((course) => course._id !== id);
        this.totalCourses -= 1;
        this.$forceUpdate();
      }
      console.log(this.courses);
    },

    addCourse() {
      this.editeCourseID = null;
      this.methodPost = true;
      this.showForm = true;
    },

    editCourse(id) {
      this.editeCourseID = id;
      this.methodPost = false;
      this.showForm = true;
    },

    backForm() {
      this.showForm = false;
    },

    // Create and update course.
    async sendData(formData) {
      const onlineRequest = 'https://nails-australia-staging.herokuapp.com/course/new/online';
      const url = this.methodPost
        ? onlineRequest
        : `${onlineRequest.replace(/[/]new/gi, '')}/${this.editeCourseID}`;

      const method = this.methodPost ? 'POST' : 'PUT';

      const response = await (
        await fetch(url, {
          method,
          body: formData,
        })
      ).json();

      if (response?.newOnlineCourse) {
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
      if (response?.updatedOnlineCourse) {
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
