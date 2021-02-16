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
      <v-col v-if="!noVideos && !showForm" cols="12" xs="12" class="d-flex justify-center flex-wrap">
        <VideoCard
          v-for="video in videos"
          :key="video._id"
          :goToDetailVideo="goToDetailVideo"
          :video="video"
          :removeVideo="removeVideo"
        />
      </v-col>

      <v-col cols="12" xs="12" v-if="course">
        <h3 align="center">{{ course.description }}</h3>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col v-if="showForm" cols="12" xs="12" offset-md="3" md="6">
            <AddVideoForm :showForm.sync="showForm" />
          </v-col>
          <v-col cols="12" xs="12" class="d-flex justify-center" v-if="showBtnAddVideo">
            <v-btn rounded color="buttons" large min-width="160" class="yellow-button" @click="showForm = true">
              add video</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
     <confirmDelete :dialog.sync="dialog" :confirmDelete="confirmDelete" title="video"/>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Spinner from '@/components/Spinner.vue';

export default {
  components: {
    Spinner,
    VideoCard: () => import('@/components/courses/VideoCard.vue'),
    AddVideoForm: () => import('@/components/forms/AddVideoForm.vue'),
    confirmDelete: () => import('@/components/popups/confirmDelete.vue')
  },
  data() {
    return {
      showForm: false,
      dialog: false,
      deleteId: null,
    };
  },
  computed: {
    ...mapState(['loading']),
    ...mapState('user', ['user']),
    ...mapState('onlineCourses', ['course']),
    videos() {
      return this.course?.videos ?? [];
    },
    noVideos() {
      return !this.loading && !this.videos.length;
    },
    showBtnAddVideo() {
      return !this.showForm && this.videos.length < 5;
    },
    // isAdmin() {
    //   return this.course?.idUser === this.user._id;
    // },
  },
  watch: {},
  methods: {
    ...mapActions('onlineCourses', {
      getCourse: 'GET_COURSE',
    }),
    removeVideo(id) {
      this.dialog = true;
      this.deleteId = id;
    },
    async confirmDelete() {
      await this.$store.dispatch('onlineCourses/DELETE_VIDEO', {
        id: this.deleteId,
        courseId: this.$route.params.courseid,
      });
      this.dialog = false;
      this.deleteId = null;
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
