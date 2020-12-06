<template>
  <v-row v-if="commodities.length">
    <v-col cols="12">
      <v-row>
        <ShopCard
          v-for="card in commodities"
          :key="card.id"
          :image="card.previewImage[0] && card.previewImage[0].link"
          :name="card.name"
          :price="card.price"
          :brand="card.brand"
          :id="card._id"
          :handler="cardClickHandler"
        />
      </v-row>
    </v-col>
    <v-row justify="center">
      <v-btn
        v-if="totalPages && totalPages > 1"
        @click="getMore"

      >More</v-btn>
    </v-row>
  </v-row>
  <v-row v-else>
    <v-col>
      <h1>No commodities</h1>
    </v-col>
  </v-row>
</template>

<script>
import 'nails-shop-card';
export default {
  name: 'CardsList',
  props: [
    'commodities',
    'cardClickHandler',
    'totalPages',
    'getCards',
    'selectedCategory',
    'currentPage',
    'setPage',
    'showCommodities'
  ],
  data() {
    return {
      page: this.currentPage,
    };
  },
  watch: {
    currentPage(newVal) {
      this.page = newVal;
    },
  },
  methods: {
    getMore() {
      this.$store.dispatch('shop/GET_MORE_SHOP_COMMODITIES', { 
        show: this.showCommodities,
        categoryId: this.selectedCategory
      })
    }
  }
};
</script>
