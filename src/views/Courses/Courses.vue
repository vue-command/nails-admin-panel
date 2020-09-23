<template>
  <v-card flat class="transparent courses-btn-container" >
    <v-btn class="courses-btn mr-8" @click="goToCourses('online-courses')">online courses</v-btn>
    <v-btn class="courses-btn" @click="goToCourses('offline-courses')">offline courses</v-btn>
  </v-card>
</template>
<style scoped>
.courses-btn-container{
  position: fixed;
  top:25%;
  left:50%;
  transform:translate(-50%,-25%)
}
</style>
<script>
export default {
  name: "courses",
  data() {
    return {};
  },
  methods: {
    goToCourses(courses) {
      this.$router.push({ name: courses})
    }
  }
};
</script>
