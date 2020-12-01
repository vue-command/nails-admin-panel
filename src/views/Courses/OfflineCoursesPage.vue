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
        <h2 class="ma-4 text-title">OFFLINE COURSES</h2>
      </v-col>
      <v-col cols="12" xs="12">
        <v-btn @click="$router.push({ name: 'create-offline-course' })"
          >add new offline course</v-btn
        >
      </v-col>
      <v-col cols="12" xs="12" v-if="loading">
        <Spiner />
      </v-col>

      <!-- <div v-if="showBanerNoData" class="text-message">No courses data received.</div> -->
      <v-col cols="12" xs="12" v-if="emtyCourses">
        <div class="text-message">No courses have been added yet.</div>
      </v-col>
      <v-col cols="12" xs="12" v-if="!loading && offlineCourses">
        <v-row class="d-flex justify-center">
          <v-col
            cols="12"
            xs="12"
            sm="6"
            md="4"
            lg="3"
            v-for="course in offlineCourses"
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
      </v-col>
      <v-col cols="12" xs="12" v-if="!emtyCourses && isHideMoreBtn">
        <v-btn
          @click="
            $store.dispatch('offlineCourses/GET_MORE_OFFLINE_COURSES', {
              skip: offlineCourses.length,
            })
          "
          >More</v-btn
        >
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
import { mapState } from 'vuex';

// import Courses from '@/components/Courses/Courses.vue';
// import 'nails-courses-admin-form';
// import 'nails-courses-admin-form/dist/nails-courses-admin-form.css';
import Spiner from '@/components/Spinner.vue';
import CoverImage from '@/components/CoverImage.vue';

export default {
  name: 'offline-courses-page',
  components: {
    // Courses,
    Spiner,
    CoverImage,
  },
  data: () => ({
    // courses: null,
    // totalCourses: null,
    // isLoading: true,
    // showForm: false,
    // editCourseID: null,
    // methodPost: true,
    // eslint-disable-next-line global-require
    coverImageSrc: require('@/assets/noImage.jpg'),
    items: [
      {
        text: 'Home',
        disabled: false,
        href: '/',
      },
      {
        text: 'offline Courses',
        disabled: true,
        href: '#',
      },
    ],
  }),
  computed: {
    // showCourses() {
    //   return (
    //     !this.isLoading
    //     && this.courses !== null
    //     && this.courses?.length > 0
    //     && !this.showForm
    //   );
    // },
    // showBanerNoData() {
    //   return !this.isLoading && this.courses === null;
    // },
    // showBanerNoCourses() {
    //   return !this.isLoading && this.courses?.length === 0;
    // },
    ...mapState('offlineCourses', ['offlineCourses', 'totalOfflineCourses', 'loading']),
    emtyCourses() {
      return !this.loading && !this.offlineCourses?.length;
    },
    isHideMoreBtn() {
      return this.offlineCourses.length < this.totalOfflineCourses;
    },
  },
  methods: {
    goToCourse(id) {
      this.$router.push({
        name: 'offline-course-page',
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
    // async getCourses() {
    //   try {
    //     const { offlineCourses, total, error } = await (
    //       await fetch(
    //         'https://nails-australia-staging.herokuapp.com/course/offline',
    //       )
    //     ).json();
    //     if (offlineCourses) {
    //       this.courses = offlineCourses;
    //       this.totalCourses = total;
    //     }
    //     if (error) {
    //       this.$notify({
    //         group: 'foo',
    //         title: 'Error',
    //         type: 'error',
    //         text: error,
    //       });
    //     }
    //     this.isLoading = false;
    //   } catch (error) {
    //     this.$notify({
    //       group: 'foo',
    //       type: 'error',
    //       title: 'Error',
    //       text: error.message || 'Something went wrong',
    //     });
    //     this.isLoading = false;
    //   }
    // },

    // async getCourseID(id) {
    //   try {
    //     const { offlineCourse, error } = await (
    //       await fetch(
    //         `https://nails-australia-staging.herokuapp.com/course/offline/${id}`,
    //       )
    //     ).json();
    //     if (error) {
    //       this.$notify({
    //         group: 'foo',
    //         title: 'Error',
    //         type: 'error',
    //         text: error,
    //       });
    //     }
    //     return offlineCourse;
    //   } catch (error) {
    //     this.$notify({
    //       group: 'foo',
    //       type: 'error',
    //       title: 'Error',
    //       text: error.message || 'Something went wrong',
    //     });
    //     return null;
    //   }
    // },

    // async addCourses() {
    //   try {
    //     const { offlineCourses, error } = await (
    //       await fetch(
    //         `https://nails-australia-staging.herokuapp.com/course/offline?skip=${this.courses.length}`,
    //       )
    //     ).json();
    //     if (offlineCourses) {
    //       this.courses = [...this.courses, ...offlineCourses];
    //     }
    //     if (error) {
    //       this.$notify({
    //         group: 'foo',
    //         title: 'Error',
    //         type: 'error',
    //         text: error,
    //       });
    //     }
    //   } catch (error) {
    //     this.$notify({
    //       group: 'foo',
    //       type: 'error',
    //       title: 'Error',
    //       text: error.message || 'Something went wrong',
    //     });
    //   }
    // },

    async removeCourse(id) {
      try {
        const { deleted, error } = await (
          await fetch(`https://nails-australia-staging.herokuapp.com/course/offline/${id}`, {
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
    this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSES');
  },
};
</script>
