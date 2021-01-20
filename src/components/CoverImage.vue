<template>
  <div>
    <v-img :src="imgUrl" :width="width" :height="height" @error="error = true"></v-img>
  </div>
</template>

<script>
export default {
  props: ['url', 'height', 'width'],
  data() {
    return {
      error: false,
      // eslint-disable-next-line global-require
      coverImageSrc: require('@/assets/noImage.jpg'),
    };
  },
  computed: {
    imgUrl() {
      return this.error || !this.url ? this.coverImageSrc : this.url;
    },
  },
  watch: {
    url(val) {
      if (!val) return;
      this.error = false;
    },
  },
  methods: {
  },
};
</script>

<style>
</style>
