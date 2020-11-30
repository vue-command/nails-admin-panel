<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
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
      <v-col cols="12" xs="12" v-if="course">
        <h2 align="center">{{ course.nameOfCourse }}</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="noVideos">
        <h2 align="center">You don't have video yet</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
        v-for="(video, index) in videos"
        :key="video._id"
      >
        <v-card v-if="videos" class="my-8" @click="goToDetailVideo(video._id)">
          <v-card-title class="d-flex justify-center"
            ><h2>
              {{ video.name }}
            </h2></v-card-title
          >
          <CoverImage :url="coverImage(index)" :height="350" />
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" v-if="course">
        <h3 align="center">{{ course.description }}</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import CoverImage from '@/components/CoverImage.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  components: {
    Spinner,
    CoverImage,
  },
  data() {
    return {
      courseId: this.$route.params.courseid,
      videos: null,
      course: null,
      dialog: false,
      // eslint-disable-next-line global-require
      coverImageSrc: 'img/noImage.jpg',
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Online Courses',
          disabled: false,
          href: '/online-courses-page',
        },
        {
          text: '',
          disabled: false,
          href: `/online-courses-page/course/${this.$route.params.courseid}`,
        },
        {
          text: 'videos',
          disabled: true,
          href: '#',
        },
      ],
    };
  },
  computed: {
    ...mapState('onlineCourses', ['onlineCourseById', 'loading']),
    noVideos() {
      return !this?.onlineCourseById?.videos?.length && !this.loading;
    },
  },
  watch: {
    onlineCourseById(val) {
      if (!val) return;
      this.items[2].text = val.nameOfCourse;
      this.course = val;
      this.videos = val.videos;
    },
  },
  methods: {
    fillingInTheFields() {
      this.items[0].text = `${this.user.firstName} cabinet`;
      this.items[1].text = `${this.user.firstName} courses`;
    },
    coverImage(index) {
      return this.videos[index].coverImg?.link || this.coverImageSrc;
    },
    goToDetailVideo(id) {
      this.$router.push({
        name: 'online-course-video',
        params: {
          videoid: id,
        },
      });
    },
  },
  created() {
    if (!this.onlineCourseById) {
      this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_BY_ID', this.courseId);
    } else {
      this.items[2].text = this.onlineCourseById.nameOfCourse;
      this.course = this.onlineCourseById;
      this.videos = this.onlineCourseById.videos;
    }
  },
};
</script>

<style></style>
