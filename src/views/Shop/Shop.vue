<template>
  <v-container>
    <v-row class="pa-5 shop-header">
      <v-col cols="12" lg="6" class="pa-5">
        <v-row>
          <v-col cols="6">
            <v-select
              class="text-subtitle-1"
              outlined
              :value="selectedCategory"
              :items="categories"
              item-text="name"
              item-value="_id"
              label="Category"
              @change="selectCategory"
            >
              Choose category
            </v-select>
          </v-col>
          <v-col cols="6" v-if="activeCategory">
            <v-select
              class="text-subtitle-1"
              :disabled="!selectedCategory"
              :value="selectedSubategory"
              outlined
              :items="subcategoriesSelect"
              item-text="name"
              item-value="_id"
              label="Subcategory"
              @change="selectSubcategory"
            >
              Choose subcategory
            </v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="6" class="pa-5">
        <v-row>
          <v-col cols="6">
            <v-radio-group :value="filterShow" @change="setCommoditiesToShowValue" row>
              <v-row class="d-flex justify-space-between flex-column">
                <v-radio label="All" value="withHidden"></v-radio>
                <v-radio label="Hidden only" value="hiddenOnly"></v-radio>
                <v-radio label="Published only" value="all"></v-radio>
              </v-row>
            </v-radio-group>
          </v-col>
          <v-col cols="6">
            <v-btn @click="modifyHandler('new')">ADD NEW COMMODITY</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row v-if="isShopLoading">
      <v-col cols="3" v-for="i in 8" :key="i">
        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else-if="commodities" class="pa-2 ma-2">
      <v-row v-if="commodities.length">
        <v-col cols="12" sm="12" md="4" lg="3" v-for="card in commodities" :key="card.id" class="pa-2">
          <v-card class="" min-height="500" @click="modifyHandler(card._id)">
            <v-card flat class="px-0 pt-4 gray-background" width="100%">
              <v-img :src="card.previewImage[0] && card.previewImage[0].link" width="100%" height="350" contain />
            </v-card>
            <v-card-text>
              <p class="black--text text-h5 my-1 font-weight-medium">
                {{ card.name }}
              </p>
              <p class="black--text text-h6 ma-0 font-weight-medium">
                {{ card.brand }}
              </p>
              <p class="d-flex justify-end text-h6 ma-0 font-weight-bold">{{ card.price }} AUD</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-row justify="center" v-if="showMoreButton">
          <v-btn @click="getMore">More</v-btn>
        </v-row>
      </v-row>
      <v-row v-else>
        <v-col>
          <h1>No commodities</h1>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>
<style scoped>
.home {
  background: #000;
}
</style>

<script>
import 'nails-styles/css/fonts.scss';
import 'nails-styles/css/variables.scss';

import { mapState } from 'vuex';

export default {
  name: 'shop',
  data() {
    return {};
  },
  computed: {
    ...mapState('shop', [
      'isShopLoading',
      'categories',
      'commodities',
      'activeCategory',
      'skip',
      'searchParams',
      'activeSubcategory',
      'filterShow',
      'totalCommodities',
    ]),
    subcategoriesSelect() {
      if (!this.activeCategory) return null;
      return [{ name: 'Show all', _id: this.activeCategory._id }, ...this.activeCategory.subcategories];
    },
    showMoreButton() {
      return this.commodities.length < this.totalCommodities;
    },
    selectedCategory() {
      if (!this.activeCategory) return '';
      return this.activeCategory._id;
    },
    selectedSubategory() {
      if (!this.activeSubcategory) return '';
      if (!this.activeCategory) return '';
      return this.activeCategory._id;
    },
  },

  methods: {
    selectCategory(categoryId) {
      this.$store.dispatch('shop/SET_CATEGORY', {
        categoryId,
      });
    },
    selectSubcategory(categoryId) {
      this.$store.dispatch('shop/SET_SUBCATEGORY', {
        categoryId,
      });
    },
    modifyHandler(id) {
      console.log(id);
      this.$router.push({
        name: 'commodity-edit',
        params: {
          commodityId: id,
        },
      });
    },
    setCommoditiesToShowValue(value) {
      this.$store.dispatch('shop/SET_FILTER_SHOW', {
        value,
      });
    },
    getMore() {
      this.$store.dispatch('shop/GET_MORE_SHOP_COMMODITIES');
    },
    searchHandler() {
      this.$store.dispatch('shop/GET_MORE_SHOP_COMMODITIES');
    },
  },
};
</script>
