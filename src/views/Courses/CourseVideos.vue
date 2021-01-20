<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
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
        <v-card v-if="!noVideos" class="my-8" @click="goToDetailVideo(video._id)">
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
import { mapState, mapActions } from 'vuex';

import CoverImage from '@/components/CoverImage.vue';
import Spinner from '@/components/Spinner.vue';

export default {
  components: {
    Spinner,
    CoverImage,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['loading']),
    ...mapState('onlineCourses', ['course']),
    videos() {
      return this.course?.videos;
    },
    noVideos() {
      return !this.loading && !this?.course?.videos?.length;
    },
  },
  watch: {
  },
  methods: {
    ...mapActions('onlineCourses', {
      getCourse: 'GET_COURSE',
    }),
    coverImage(index) {
      return this.course?.videos[index].coverImg?.link || this.coverImageSrc;
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
    this.getCourse(this.$route.params.courseid);
  },
};
</script>

<style></style>
