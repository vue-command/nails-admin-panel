<template>
  <v-container>
    <v-card min-height='850px' height='100%'>
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
            :showCommodities="showCommodities"
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
  data() {
    return {
      selectedCategory: null,
      showCommodities: 'all',
      currentPage: 1,
      isLoading: false,
    };
  },
  watch: {
    async showCommodities(newVal) {
      if( !this.selectedCategory) return
      this.isLoading = true;
      await this.$store.dispatch('shop/GET_SHOP_COMMODITIES', { categoryId: this.selectedCategory, skip: this.skip, show: this.showCommodities });
      this.isLoading = false;
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
      return Math.ceil(this.totalCommodities / 20);
    },
    skip() {
      return this.currentPage * 20 - 20;
    },
  },
  components: { CardsList, MainHeader, ModifyProduct, Spiner },
  methods: {
    async getData() {
      this.isLoading = true;
      !this.categories &&
        (await this.$store.dispatch('shop/GET_SHOP_CATEGORIES'));
      if (this.categories) {
        !this.activeCategory &&
          await this.$store.dispatch('shop/SET_NEW_CATEGORY', {
            category: this.categories[0],
          });
      }
      this.isLoading = false
    },
    async getCards(categoryId, skip) {
      this.isLoading = true;
      await this.$store.dispatch('shop/GET_SHOP_COMMODITIES', { categoryId: categoryId, skip: skip || this.skip, show: this.showCommodities });
      this.isLoading = await false;
    },
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.currentPage = 1;
      this.$store.dispatch('shop/GET_SHOP_COMMODITIES', {categoryId, skip: 0, show: this.showCommodities});
    },
    modifyHandler(id) {
      this.$router.push({
        name: 'CommodityEdit',
        params: {
        commodityId: id
        }
      })
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
  beforeDestroy() {
    // this.$store.commit('shop/CLEAR_COMMODITIES')
  }
};
</script>
