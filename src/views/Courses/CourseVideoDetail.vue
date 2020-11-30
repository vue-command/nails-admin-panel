<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12">
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
        <CoverImage :url="checkUrl(video)" :height="500" />
        <v-card
          v-if="video.pdfs"
          flat
          class="d-flex justify-center mt-16 transparent"
        >
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
      video: null,
      videos: null,
      course: null,
      volume: 0,
      showForm: false,
      // eslint-disable-next-line global-require
      coverImageSrc: require('@/assets/noImage.jpg'),
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
          disabled: false,
          href: `/online-courses-page/course/${this.$route.params.courseid}/videos`,
        },
        {
          text: '',
          disabled: true,
          href: '#',
        },
      ],
      nameOfVideo: '',
      description: '',
      imgFile: null,
    };
  },
  computed: {
    ...mapState('onlineCourses', ['onlineCourseById', 'loading', 'currentVideo']),
  },
  watch: {
    onlineCourseById(val) {
      if (!val) return;
      this.items[2].text = val.nameOfCourse;
    },
    currentVideo(val) {
      if (!val) return;
      this.items[4].text = val.name;
      this.video = val;
    },
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
    if (!this.onlineCourseById) {
      this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_BY_ID', this.courseId);
    }
    if (!this.currentVideo) {
      this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_VIDEO_BY_ID', this.videoId);
    }
    if (this.onlineCourseById && this.currentVideo) {
      this.items[2].text = this.onlineCourseById.nameOfCourse;
      this.items[4].text = this.currentVideo.name;
      this.video = this.currentVideo;
    }
  },
};
</script>

<style scoped>
.pdf-link:not(:last-child) {
  margin-right: 50px;
}
</style>
