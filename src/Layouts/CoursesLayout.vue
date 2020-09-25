<template>
  <div style="background-color:#000;width:100%; height:100%;">
    <v-btn @click="goTo('Home')" class="ma-8"><v-img :src="homeImage"/></v-btn>
    <v-btn v-if="coursesName.includes(this.$route.name)" @click="goTo('courses')" >Courses</v-btn>
    <router-view/>
  </div>
</template>
<script>
export default {
  data: () => ({
    homeImage: '../views/Courses/assets/home.svg',
    coursesName: ['online-courses', 'offline-courses'],
  }),
  methods: {
    goTo(namePage) {
      this.$router.push({ name: namePage });
    },
  },
};
</script>
