<template>
  <div style="background-color: #000; width: 100%; height: 100%">
    <v-btn @click="goTo('Home')" class="ma-8"
      ><v-img src="../views/Courses/assets/home.svg"
    /></v-btn>
    <v-btn
      v-if="coursesName.includes(this.$route.name)"
      @click="goTo('courses')"
      >Courses</v-btn
    >
    <router-view />
  </div>
</template>
<script>
export default {
  data: () => ({
    coursesName: ['online-courses', 'offline-courses'],
  }),
  methods: {
    goTo(namePage) {
      this.$router.push({ name: namePage });
    },
  },
};
</script>
