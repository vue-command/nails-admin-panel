<template>
  <div>
    <v-img :src="imgUrl" :height="height" @error="onError"></v-img>
  </div>
</template>

<script>
export default {
  props: ['url', 'height'],
  data() {
    return {
      // imageUrl: this.url,
      error: false,
      // eslint-disable-next-line global-require
      coverImageSrc: require('@/assets/noImage.jpg'),
      // coverImageSrc: 'img/noImage.jpg',
    };
  },
  computed: {
    imgUrl() {
      return this.error ? this.coverImageSrc : this.url;
    },
  },
  watch: {
    url(val) {
      if (!val) return;
      this.error = false;
    },
  },
  methods: {
    onError() {
      this.error = true;
    },
  },
};
</script>

<style>
</style>
