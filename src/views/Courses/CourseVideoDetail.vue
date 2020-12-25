<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col
        cols="12"
        xs="12"
        offset-md="2"
        md="8"
        class="player-container"
        v-if="!loading && currentVideo"
      >
        <vue-core-video-player :src="currentVideo.link" />
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && currentVideo">
        <v-card-title>{{ currentVideo.description }}</v-card-title>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && currentVideo">
        <CoverImage :url="checkUrl(currentVideo)" :height="500" />
        <v-card v-if="currentVideo.pdfs" flat class="d-flex justify-center mt-16 transparent">
          <a
            v-for="pdf in currentVideo.pdfs"
            :key="pdf._id"
            :href="pdf.link"
            target="_blank"
            class="pdf-link"
            ><v-img src="img/pdf.svg" width="50px"
          /></a>
        </v-card>
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
    CoverImage,
    Spinner,
  },
  data() {
    return {
      courseId: this.$route.params.courseid,
      videoId: this.$route.params.videoid,
      volume: 0,
      showForm: false,
      // eslint-disable-next-line global-require
      coverImageSrc: require('@/assets/noImage.jpg'),
    };
  },
  computed: {
    ...mapState('onlineCourses', ['onlineCourseById', 'loading', 'currentVideo']),
  },
  watch: {
  },
  methods: {
    checkUrl(card) {
      let img;
      if (card.coverImg?.link) {
        img = card.coverImg.link;
      }
      if (!img) {
        img = this.coverImageSrc;
      }
      return img;
    },
  },
  created() {
    this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_VIDEO_BY_ID', this.videoId);
    this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_BY_ID', this.courseId);
  },
};
</script>

<style scoped>
.pdf-link:not(:last-child) {
  margin-right: 50px;
}
</style>
