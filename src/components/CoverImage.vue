<template>
  <div>
    <v-img :src="imgUrl" :width="width" :height="height" contain @error="error = true"></v-img>
  </div>
</template>

<script>
export default {
  props: ['url', 'height', 'width'],
  data() {
    return {
      error: false,
      coverImageSrc: `${process.env.BASE_URL}/img/noImage.jpg`,
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
  mounted() {
  }
};
</script>

<style>
</style>
