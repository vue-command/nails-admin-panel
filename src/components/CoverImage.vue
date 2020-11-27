<template>
  <div>
    <v-img :src="imageUrl" :height="height" @error="onError"></v-img>
  </div>
</template>

<script>
export default {
  props: ['url', 'height'],
  data() {
    return {
      imageUrl: this.url,
      // eslint-disable-next-line global-require
      coverImageSrc: 'img/noImage.jpg',
    };
  },
  methods: {
    onError() {
      this.imageUrl = this.coverImageSrc;
    },
  },
};
</script>

<style>
</style>
