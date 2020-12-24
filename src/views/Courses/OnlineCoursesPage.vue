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
      <!-- <v-col cols="12" xs="12" v-if="!onlineCourses">
        <h2 class="text-message">No courses data received</h2>
      </v-col> -->
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
            v-for="course in onlineCourses"
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
            $store.dispatch('onlineCourses/GET_MORE_ONLINE_COURSES', {
              string: filterCourses[radioGroup].param,
              skip: onlineCourses.length,
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

import CoverImage from '@/components/CoverImage.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'online-courses-page',
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
    coverImageSrc: 'img/noImage.jpg',
  }),
  computed: {
    ...mapState('onlineCourses', ['onlineCourses', 'totalOnlineCourses', 'loading']),
    emtyCourses() {
      return !this.loading && !this.onlineCourses?.length;
    },
    isHideMoreBtn() {
      return this.onlineCourses.length < this.totalOnlineCourses;
    },
  },
  watch: {
    radioGroup(newVal) {
      this.getCourses(this.filterCourses[newVal].param);
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
    getCourses(string) {
      this.$store.dispatch('onlineCourses/GET_ONLINE_COURSES', string);
    },
  },
  created() {
    this.getCourses(this.filterCourses[this.radioGroup].param);
  },
};
</script>
