<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" class="d-flex justify-start">
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :disabled="item.disabled">
              <router-link
                :to="item.href"
                :class="{ 'disabled-link': item.disabled }"
              >
                {{ item.text.toUpperCase() }}</router-link
              >
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" xs="12">
        <h2 class="ma-4 text-title">ONLINE COURSES</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="isLoading">
        <Spinner />
      </v-col>
      <v-col cols="12" xs="12" v-if="showBanerNoData">
        <h2 class="text-message">No courses data received.</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="showBanerNoCourses">
        <h2 class="text-message">No courses have been added yet</h2>
      </v-col>
      <v-col cols="12" xs="12">
        <div class="d-flex justify-center">
          <v-radio-group v-model="radioGroup" row>
            <v-radio dark label="All" value="all"></v-radio>
            <v-radio dark label="Hidden only" value="hidden"></v-radio>
            <v-radio dark label="Published only" value="published"></v-radio>
          </v-radio-group>
        </div>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        v-for="course in courses"
        :key="course._id"
      >
        <v-card @click="goToCourse(course._id)">
          <v-card-title class="d-flex justify-center"
            ><h2>{{ course.nameOfCourse }}</h2></v-card-title
          >
          <CoverImage :url="checkUrl(course)" :height="300" />
        </v-card>
      </v-col>
    </v-row>
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
// import Courses from './components/Courses.vue';
// import 'nails-courses-admin-form';
// import 'nails-courses-admin-form/dist/nails-courses-admin-form.css';
import CoverImage from '@/views/Courses/components/CoverImage.vue';
import Spinner from '@/views/Courses/components/Spinner.vue';

export default {
  name: 'online-courses-page',
  components: {
    // Courses,
    CoverImage,
    Spinner,
  },
  data: () => ({
    courses: null,
    totalCourses: null,
    isLoading: true,
    // showForm: false,
    // editCourseID: null,
    // methodPost: true,
    // eslint-disable-next-line global-require
    radioGroup: 'all',
    items: [
      {
        text: 'Home',
        disabled: false,
        href: '/',
      },
      {
        text: 'Online Courses',
        disabled: true,
        href: '#',
      },
    ],
    // eslint-disable-next-line global-require
    coverImageSrc: require('@/assets/noImage.jpg'),
  }),
  computed: {
    showCourses() {
      return !this.isLoading && this.courses !== null && this.courses?.length > 0 && !this.showForm;
    },
    showBanerNoData() {
      return !this.isLoading && this.courses === null && !this.showForm;
    },
    showBanerNoCourses() {
      return !this.isLoading && this.courses?.length === 0 && !this.showForm;
    },
  },
  watch: {
    radioGroup(newVal) {
      this.getCourses(newVal);
    },
  },
  methods: {
    goToCourse(id) {
      this.$router.push({
        name: 'online-course-page',
        params: {
          courseid: id,
        },
      });
    },
    checkUrl(card) {
      let img;
      if (card.photo && Array.isArray(card.photo) && card.photo.length) {
        img = card.photo[0].link;
      }
      if (!img) {
        img = this.coverImageSrc;
      }
      return img;
    },
    async getCourses(string) {
      try {
        const withHidden = '?withHidden=withHidden';
        const onlyHidden = '?withHidden=hiddenOnly';
        const isPublished = '';
        const { onlineCourses, total, error } = await (
          // eslint-disable-next-line no-nested-ternary
          await fetch(`${process.env.VUE_APP_API_URL}/course/online${string === 'all' ? withHidden : string === 'hidden' ? onlyHidden : isPublished}`)
        ).json();
        if (onlineCourses) {
          this.courses = onlineCourses;
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
        const { onlineCourse, error } = await (
          await fetch(`https://nails-australia-staging.herokuapp.com/course/online/${id}`)
        ).json();
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        }
        return onlineCourse;
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
        const { onlineCourses, error } = await (
          await fetch(
            `https://nails-australia-staging.herokuapp.com/course/online?skip=${this.courses.length}`,
          )
        ).json();
        if (onlineCourses) {
          this.courses = [...this.courses, ...onlineCourses];
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
          await fetch(`https://nails-australia-staging.herokuapp.com/course/online/${id}`, {
            method: 'DELETE',
          })
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
      const onlineRequest = 'https://nails-australia-staging.herokuapp.com/course/new/online';
      const url = this.methodPost
        ? onlineRequest
        : `${onlineRequest.replace(/[/]new/gi, '')}/${this.editCourseID}`;

      const method = this.methodPost ? 'POST' : 'PUT';
      try {
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
    this.getCourses(this.radioGroup);
  },
};
</script>
