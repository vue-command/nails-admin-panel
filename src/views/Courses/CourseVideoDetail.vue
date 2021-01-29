<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" class="player-container" v-if="!loading && video">
        <!-- <vue-core-video-player :src="video.link" /> -->
        <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions"> </video-player>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && video">
        <v-card-title>{{ video.description }}</v-card-title>
      </v-col>
      <v-col cols="12" xs="12" offset-md="2" md="8" v-if="!loading && video">
        <CoverImage :url="checkVideoLink(video)" :height="500" />
        <v-card v-if="video.pdfs" flat class="d-flex justify-center mt-16 transparent">
          <a v-for="pdf in video.pdfs" :key="pdf._id" :href="pdf.link" target="_blank" class="mx-8"
            ><v-img src="img/pdf.svg" width="50px"
          /></a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

import CoverImage from '@/components/CoverImage.vue';
import Spinner from '@/components/Spinner.vue';
import checkVideoLink from '@/helpers/checkVideoLink';

export default {
  components: {
    CoverImage,
    Spinner,
    videoPlayer
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
    playerOptions() {
      return {
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: this.video?.link,
          },
        ],
        // poster: this.video?.coverImg?.link,
      };
    },
  },
  watch: {},
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
<style>
.vjs_video_3-dimensions {
  height: unset;
  width: unset;
}
.video-js {
  width: 100%;
  height: 500px;
}
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
<style scoped>
/* .pdf-link:not(:last-child) {
  margin-right: 50px;
} */
</style>
