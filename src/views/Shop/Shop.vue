<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12" lg="6" class="pa-5">
        <v-row>
          <v-col cols="6">
            <v-select
              :disabled="!!searchParams"
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
              :disabled="!selectedCategory || !!searchParams"
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
            <v-text-field
              @input="searchDebounced"
              v-model="search"
              clearable
              prepend-inner-icon="mdi-magnify"
              filled
              dense
              rounded
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="6" class="pa-5">
        <v-row>
          <v-col cols="6">
            <v-radio-group :value="filterShow" @change="setCommoditiesToShowValue" row>
              <v-row class="d-flex justify-space-between flex-column text-body-1">
                <v-radio class="ma-1 font-weight-bold" label="Published" value="all"></v-radio>
                <v-radio class="ma-1 font-weight-bold" label="Hidden" value="hiddenOnly"></v-radio>
                <v-radio class="ma-1 font-weight-bold" label="All" value="withHidden"></v-radio>
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
      <v-col v-if="commodities.length">
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="card in commodities" :key="card.id" class="pa-2">
            <v-card
              width="100%"
              min-height="300"
              rounded="0"
              shaped
              height="100%"
              color="lgrey"
              class="pa-2"
              @click="modifyHandler(card._id)"
            >
              <v-card flat width="100%">
                <v-img
                  :lazy-src="noImage"
                  :src="card.previewImage && card.previewImage[0] && card.previewImage[0].link"
                  width="100%"
                  height="270"
                  contain
                />
              </v-card>
              <v-card-text class="pa-2 pb-0">
                <span>
                  <p class="text-h6 ma-0 pa-0 font-weight-bold dgrey--text text-start">
                    {{ card.name }}
                  </p>
                  <p class="text-subtitle-1 ma-0 font-weight-medium dgrey--text text-start">
                    {{ card.brand }}
                  </p>
                </span>
                <p class="text-end text-subtitle-1 ma-0 pa-0 font-weight-bold dgrey--text">{{ card.price }} AUD</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center" class="ma-5" v-if="showMoreButton">
          <v-col>
            <v-btn @click="getMore" x-large color="success">More</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-row v-else>
        <v-col>
          <h1>No commodities</h1>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import debounce from '../../utils/debounce';

import { mapState } from 'vuex';

export default {
  name: 'shop',
  data() {
    return {
      search: '',
      noImage: require('@/views/Shop/assets/no-image.png'),
    };
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
      return this.activeSubcategory._id;
    },
    searchDebounced() {
      return debounce(this.searchHandler, 1000);
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
      if (this.search) {
        this.$store.dispatch('shop/SEARCH_COMMODITIES', {
          search: this.search,
        });
      } else {
        this.$store.dispatch('shop/UPDATE_SHOP');
      }
    },
  },
  mounted() {
    if (this.activeCategory) {
      // this.$store.dispatch('shop/GET_SHOP_COMMODITIES', {
      //   commodityId: this.activeCategory._id,
      // });
    }
  },
};
</script>
