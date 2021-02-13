<template>
  <v-hover v-slot="{ hover }" open-delay="100">
    <v-card
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      width="500"
      max-height="450"
      class="ma-4"
      @click="detailHandler"
    >
      <h2 class="text-center">
        {{ videoName }}
      </h2>
      <CoverImage :url="linkCheck(video)" :height="250" />
      <v-card-actions class="d-flex justify-end">
        <v-btn rounded color="buttons" large min-width="160" class="yellow-button" @click.stop="removeHandler"
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
  props: ['goToDetailVideo', 'video', 'removeVideo'],
  name: 'VideoCard',
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  computed: {
    videoName() {
      return this.video?.name?.length < 20 ? this.video?.name : this.video?.name?.slice(0, 17) + '...';
    },
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

<style>
</style>
