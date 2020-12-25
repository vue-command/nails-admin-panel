<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" v-if="onlineCourseById">
        <h2 align="center">{{ onlineCourseById.nameOfCourse }}</h2>
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
        <v-card v-if="!noVideos" class="my-8" @click="goToDetailVideo(video._id)">
          <v-card-title class="d-flex justify-center"
            ><h2>
              {{ video.name }}
            </h2></v-card-title
          >
          <CoverImage :url="coverImage(index)" :height="350" />
        </v-card>
      </v-col>

      <v-col cols="12" xs="12" v-if="onlineCourseById">
        <h3 align="center">{{ onlineCourseById.description }}</h3>
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
      // eslint-disable-next-line global-require
      coverImageSrc: 'img/noImage.jpg',
    };
  },
  computed: {
    ...mapState('onlineCourses', ['onlineCourseById', 'loading']),
    videos() {
      return this.onlineCourseById?.videos;
    },
    noVideos() {
      return !this?.onlineCourseById?.videos?.length && !this.loading;
    },
  },
  watch: {
  },
  methods: {
    coverImage(index) {
      return this.onlineCourseById?.videos[index].coverImg?.link || this.coverImageSrc;
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
    this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_BY_ID', this.courseId);
  },
};
</script>

<style></style>
