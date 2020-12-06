<template>
  <v-container v-if="!selectedItemToModify">
    <v-card>
      <MainHeader
        :selectCategory="selectCategory"
        :modifyHandler="modifyHandler"
        :categories="categories"
        :selectedCategory="selectedCategory"
        :showCommodities="showCommodities"
        :setCommoditiesToShowValue="setCommoditiesToShowValue"
      />
      <v-row justify="start">
        <v-col cols="12">
          <CardsList
            v-if="!isLoading"
            :cardClickHandler="modifyHandler"
            :commodities="commodities"
            :getCards="getCards"
            :selectedCategory="selectedCategory"
            :totalPages="totalPages"
            :currentPage="currentPage"
            :setPage="setPage"
          />
          <Spiner v-else />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <ModifyProduct
    v-else
    :productId="selectedItemToModify"
    :clearHandler="clearSelectedItemToModify"
    :createCommodity="createCommodity"
    :updateCommodity="updateCommodity"
    :uploadImages="uploadImages"
    :deleteImage="deleteImage"
    :deleteCommodity="deleteCommodity"
    :getDataMain="getData"
    :modifyHandler="modifyHandler"
    :noImage="noImage"
  />
</template>
<style scoped>
.home {
  background: #000;
}
</style>

<script>
import CardsList from './CardsList.vue';
import MainHeader from './MainHeader.vue';
import ModifyProduct from './ModifyProduct.vue';
import Spiner from './Spiner';

import 'nails-styles/css/fonts.scss';
import 'nails-styles/css/variables.scss';

import { mapState } from 'vuex'

export default {
  name: 'ShopEdit',
  props: [
    'createCommodity',
    'deleteCommodity',
    'uploadImages',
    'deleteImage',
    'createCategory',
    'updateCommodity',
    'noImage',
  ],
  data() {
    return {
      selectedCategory: null,
      totalItems: 0,
      selectedItemToModify: null,
      showCommodities: 'all',
      currentPage: 1,
      isLoading: false,
    };
  },
  watch: {
    showCommodities(newVal) {
      this.getData();
    },
  },
  computed: {
    ...mapState('shop', [
      'categories',
      'commodities',
      'totalCommodities',
      'activeCategory',
    ]),
    totalPages() {
      return Math.ceil(this.totalItems / 20);
    },
    skip() {
      return this.currentPage * 20 - 20;
    },
  },
  components: { CardsList, MainHeader, ModifyProduct, Spiner },
  methods: {
    async getData() {
      !this.categories &&
        (await this.$store.dispatch('shop/GET_SHOP_CATEGORIES'));
      if (this.categories) {
        console.log('here');
        !this.activeCategory &&
          this.$store.dispatch('shop/SET_NEW_CATEGORY', {
            category: this.categories[0],
          });
      }
    },
    async getCards(categoryId, skip) {
      this.isLoading = true;
      const items = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/shop/commodities/${categoryId}?skip=${skip ||
            0}&withHidden=${this.showCommodities}`,
        )
      ).json();
      this.commodities = (await items.commodities) || [];
      this.totalItems = (await items.total) || 0;
      this.isLoading = await false;
    },
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.currentPage = 1;
      this.getCards(categoryId);
    },
    modifyHandler(id) {
      this.selectedItemToModify = id;
    },
    clearSelectedItemToModify() {
      this.selectedItemToModify = null;
    },
    setPage(page) {
      this.currentPage = page;
      this.getCards(this.selectedCategory, this.skip);
    },
    setCommoditiesToShowValue(val) {
      this.showCommodities = val;
    },
  },
  created() {
    this.getData();
  },
};
</script>
