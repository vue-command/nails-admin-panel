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
        v-if="!loading && video"
      >
        <vue-core-video-player :src="video.link" />
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && video">
        <v-card-title>{{ video.description }}</v-card-title>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && video">
        <CoverImage :url="checkVideoLink(video)" :height="500" />
        <v-card v-if="video.pdfs" flat class="d-flex justify-center mt-16 transparent">
          <a
            v-for="pdf in video.pdfs"
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
import { mapState, mapActions } from 'vuex';

import CoverImage from '@/components/CoverImage.vue';
import Spinner from '@/components/Spinner.vue';
import checkVideoLink from '@/helpers/checkVideoLink';

export default {
  components: {
    CoverImage,
    Spinner,
  },
  data() {
    return {
      volume: 0,
      showForm: false,
    };
  },
  computed: {
    ...mapState(['loading']),
    ...mapState('onlineCourses', ['course', 'video']),
  },
  watch: {
  },
  methods: {
    ...mapActions('onlineCourses', {
      getVideo: 'GET_VIDEO',
      getCourse: 'GET_COURSE',
    }),
    checkVideoLink,
  },
  created() {
    this.getVideo(this.$route.params.videoid);
    this.getCourse(this.$route.params.courseid);
  },
};
</script>

<style scoped>
.pdf-link:not(:last-child) {
  margin-right: 50px;
}
</style>
