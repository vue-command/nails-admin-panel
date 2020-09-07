<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6" lg="6">
        <v-btn>
          COURSES
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
.home {
  background: #000;
}
</style>
<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    goToShop() {
      this.$router.push({name: "ShopEdit"})
    }
  }
};
</script>
