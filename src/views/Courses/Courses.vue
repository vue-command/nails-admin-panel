<template>
  <v-card flat dark>
    <v-btn @click="goToCourses('online-courses')">online courses</v-btn>
    <v-btn @click="goToCourses('offline-courses')">offline courses</v-btn>
  </v-card>
</template>
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
