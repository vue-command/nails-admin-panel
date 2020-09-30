<template>
  <v-card dark class="ma-16" width="350">
    <v-img :src="imageUrl" @error="onError" height="200px" />
    <v-card-title class="buttons--text pa-0 pl-4 pt-4">
      {{ accessDays }} days | $ {{ price }}
    </v-card-title>
    <v-card-title class="pa-0 pl-4">
      {{ name }}
    </v-card-title>
    <v-card-text class="pa-0 px-4 pb-4 text-start">
      {{ subtitle }}
    </v-card-text>
    <v-card-actions v-if="type === 'online'" class="pl-4 pb-4">
      <v-btn
        color="buttons"
        rounded
        small
        outlined
        primary
        min-width="90"
        class="yellow-button mr-4"
        >pay</v-btn
      >
      <v-btn
        color="buttons"
        rounded
        small
        min-width="90"
        dark
        class="yellow-button"
        >more</v-btn
      >
    </v-card-actions>
    <v-card-actions v-else-if="type === 'offline'" class="pl-4 pb-4">
      <v-btn
        color="buttons"
        rounded
        outlined
        small
        dark
        min-width="90"
        class="yellow-button"
        >more</v-btn
      >
    </v-card-actions>
    <v-card-actions  v-else  class="pl-4 pb-4">
      <v-btn
        color="buttons"
        rounded
        small
        outlined
        primary
        min-width="90"
        class="yellow-button mr-4"
        @click="editCourse(id)"
        >Edit</v-btn
      >
      <v-btn
        color="buttons"
        rounded
        small
        min-width="90"
        dark
        class="yellow-button"
        @click="removeCourse(id)"
        >Delete</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'course-card',
  props: [
    'url',
    'name',
    'price',
    'id',
    'type',
    'subtitle',
    'accessDays',
    'removeCourse',
    'editCourse',
  ],
  data: () => ({
    // eslint-disable-next-line global-require
    coverImageSrc: require('../assets/noImage.jpg'),
    imageUrl: null,
  }),
  watch: {
    url(val) {
      this.checkUrl(val);
    },
  },
  methods: {
    onError() {
      this.imageUrl = this.coverImageSrc;
    },
    checkUrl(url) {
      this.imageUrl = url || this.coverImageSrc;
    },
  },
  created() {
    this.checkUrl(this.url);
  },
};
</script>
