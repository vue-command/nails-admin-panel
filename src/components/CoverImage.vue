<template>
  <v-img :src="imgUrl" :width="width" :height="height" contain @error="error = true"></v-img>
</template>

<script>
export default {
  name: 'CoverImage',
  props: {
    url: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: '300',
    },
    width: {
      type: String,
      default: '300',
    },
  },
  data() {
    return {
      error: false,
      coverImageSrc: `${process.env.VUE_APP_HOST_URL}/img/noImage300x300.png`,
      // coverImageSrc: `${process.env.VUE_APP_LOCAL_URL}/img/noImage300x300.png`,
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
};
</script>

