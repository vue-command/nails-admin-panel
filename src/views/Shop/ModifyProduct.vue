<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" >
        <h1>{{ productId === 'new' ? 'New' : 'Edit' }} product</h1>
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
  data() {
    return {
      productId: this.$route.params.productId,
    };
  },
  components: {},
  methods: {
    goToShop() {
      this.$router.push({ name: 'ShopEdit' });
    },
  },
};
</script>
