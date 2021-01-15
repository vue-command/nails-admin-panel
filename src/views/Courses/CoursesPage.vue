<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12">
        <h2 class="ma-4 text-title">ONLINE COURSES</h2>
      </v-col>
      <v-col cols="12" xs="12">
        <div class="d-flex justify-center">
          <v-radio-group v-model="radioGroup" row>
            <v-radio
              v-for="current of filterCourses"
              :key="current.title"
              dark
              :label="current.title"
            ></v-radio>
          </v-radio-group>
        </div>
      </v-col>
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col cols="12" xs="12" v-if="emtyCourses">
        <h2 class="text-message">No courses have been added yet</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="!emtyCourses">
        <v-row class="d-flex justify-center">
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
      </v-col>
      <v-col cols="12" xs="12" v-if="!emtyCourses && isHideMoreBtn">
        <v-btn
          @click="
            getMore({
              string: filterCourses[radioGroup].param,
              skip: courses.length,
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
import { mapState, mapActions } from 'vuex';

import CoverImage from '@/components/CoverImage.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'CoursesPage',
  components: {
    CoverImage,
    Spinner,
  },
  data: () => ({
    radioGroup: 0,
    filterCourses: [
      {
        title: 'All',
        param: '?withHidden=withHidden',
      },
      {
        title: 'Hidden only',
        param: '?withHidden=hiddenOnly',
      },
      {
        title: 'Published only',
        param: '',
      },
    ],
    coverImageSrc: 'img/noImage.jpg',
  }),
  computed: {
    ...mapState(['loading']),
    ...mapState('onlineCourses', ['courses', 'total']),
    emtyCourses() {
      return !this.loading && !this.courses?.length;
    },
    isHideMoreBtn() {
      return this.courses.length < this.total;
    },
  },
  watch: {
    radioGroup(newVal) {
      this.getCourses(this.filterCourses[newVal].param);
    },
  },
  methods: {
    ...mapActions('onlineCourses', {
      getCourses: 'GET_COURSES',
      getMore: 'GET_MORE_COURSES',
    }),
    goToCourse(id) {
      this.$router.push({
        name: 'online-course',
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
  },
  created() {
    this.getCourses(this.filterCourses[this.radioGroup].param);
  },
};
</script>
