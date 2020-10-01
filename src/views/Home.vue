<template>
  <v-container >
    <v-row class="text-center">
      <v-col cols="6" lg="6">
        <v-btn @click="goToOfflineCourses('offline-courses-page')" class="mr-8">
          COURSES OffLINE
        </v-btn>
        <v-btn @click="goToOfflineCourses('online-courses-page')">
          COURSES ONLINE
        </v-btn>
      </v-col>
      <v-col cols="6" lg="6">
        <v-btn @click="goToShop">
          SHOP
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    goToShop() {
      this.$router.push({ name: 'ShopEdit' });
    },
    goToOfflineCourses(nameCourses) {
      this.$router.push({ name: nameCourses });
    },
  },
};
</script>
