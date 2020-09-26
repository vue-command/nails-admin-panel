<template>
  <v-card dark class="cardfone ma-16" width="350" min-height="360">
    <v-img :src="imageUrl" @error="onError" height="200px" />
    <v-card-title class="buttons--text pa-0 pl-4 pt-4">
      {{ accessDays }} days | $ {{ price }}
    </v-card-title>
    <v-card-title class="pa-0 pl-4">
      {{ name }}
    </v-card-title>
    <v-card-text class="pa-0 pl-4 pb-4 d-flex">
      {{ subtitle }}
    </v-card-text>
    <v-card v-if="type === 'online'" flat class="ml-4 mb-4 d-flex">
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
    </v-card>
    <v-card v-else-if="type === 'offline'" flat class="ml-4 mb-4 d-flex">
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
    </v-card>
    <v-card v-else flat class="ml-4 mb-4 d-flex">
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
    </v-card>
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
    // "offline",
    // "online",
    'subtitle',
    'accessDays',

    'removeCourse',
    // ,
    // "showDialog",
    // "deleteCourseId",
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
    // edit() {
    //   this.editCourse(true, this.id);
    // },
    onError() {
      this.imageUrl = this.coverImageSrc;
    },
    checkUrl(url) {
      this.imageUrl = url || this.coverImageSrc;
    },
    // removeCourse() {
    //   this.$emit("update:showDialog", true);
    //   this.deleteCourseId(this.id);
    // },
  },
  created() {
    this.checkUrl(this.url);
  },
};
</script>
