<template>
  <v-hover v-slot="{ hover }" open-delay="100">
    <v-card
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      :width="width"
      max-height="450"
      class="ma-4"
      @click="detailHandler"
    >
      <h2 class="text-center items-text mx-4">
        {{ video.name }}
      </h2>
      <CoverImage :url="linkCheck(video)" />
      <v-card-actions class="d-flex justify-end pa-4">
        <v-btn rounded color="buttons"  class="yellow-button pa-4" @click.stop="removeHandler"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import CoverImage from '@/components/CoverImage.vue';
import checkVideoLink from '@/helpers/checkVideoLink';
export default {
  name: 'VideoCard',
  props: {
    video: {
      type: Object,
      required: true,
    },
    goToDetailVideo: {
      type: Function,
      required: true,
    },
    removeVideo: {
      type: Function,
      required: true,
    },
    width: {
      type: String,
      default: '300',
    },
  },
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {
    linkCheck(video) {
      return checkVideoLink(video);
    },
    detailHandler() {
      this.goToDetailVideo(this.video._id);
    },
    removeHandler() {
      this.removeVideo(this.video._id);
    },
  },
};
</script>

<style scoped>
.items-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
