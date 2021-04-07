<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12" lg="6" class="pa-5">
        <v-row>
          <v-col cols="6">
            <v-select
              :disabled="!!search"
              class="text-subtitle-1"
              outlined
              v-model="selectedCategoryId"
              :items="categories"
              item-text="name"
              item-value="_id"
              label="Category"
            >
              Choose category
            </v-select>
          </v-col>

          <v-col cols="6" v-if="activeCategory">
            <v-select
              class="text-subtitle-1"
              :disabled="!selectedCategoryId || !!search"
              v-model="selectedSubcategoryId"
              outlined
              :items="subcategories"
              item-text="name"
              item-value="_id"
              label="Subcategory"
            >
              Choose subcategory
            </v-select>
          </v-col>

          <v-col cols="12">
            <v-text-field
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
            <v-radio-group v-model="radioGroup">
              <v-radio
                v-for="filter in filters"
                class="ma-1 font-weight-bold"
                :key="filter.param"
                :label="filter.title"
              />
            </v-radio-group>
          </v-col>

          <v-col cols="6">
            <v-btn
              @click="
                $router.push({
                  name: 'commodity-create',
                })
              "
              >ADD NEW COMMODITY</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-card v-if="isShopLoading" flat class="d-flex flex-wrap justify-center skeleton">
      <v-skeleton-loader v-for="i in pageSize" :key="i" class="ma-4" width="250" height="350" type="card" />
    </v-card>

    <v-card flat class="d-flex flex-wrap justify-center" v-else-if="commodities.length">
      <ShopCard
        v-for="card in commodities"
        :key="card.id"
        @click="modifyHandler(card._id)"
        :card="card"
        width="250"
        height="350"
      />
    </v-card>

    <v-card flat v-else class="d-flex justify-center mt-8">
      <v-card-title><h3>No commodities</h3></v-card-title>
    </v-card>

    <v-pagination
      v-if="pages > 1 && !isShopLoading"
      v-model="page"
      :length="pages"
      :total-visible="8"
      color="orange"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      class="pagination-buttons mt-10"
    ></v-pagination>
  </v-container>
</template>

<script>
import debounce from '@/utils/debounce';

import { mapState } from 'vuex';

export default {
  name: 'Shop',
  components: {
    ShopCard: () => import('@/components/shop/ShopCard.vue'),
  },
  data() {
    return {
      search: '',
      page: 1,
      pageSize: 12,
      radioGroup: 0,
      selectedCategoryId: '',
      selectedSubcategoryId: '',
      filters: [
        {
          title: 'Published',
          param: 'all',
        },
        {
          title: 'All',
          param: 'withHidden',
        },
        {
          title: 'Hidden',
          param: 'hiddenOnly',
        },
      ],
      noImage: require('@/views/shop/assets/no-image.png'),
    };
  },
  computed: {
    ...mapState('shop', ['isShopLoading', 'commodities', 'total']),
    ...mapState('categories', ['categories']),
    subcategories() {
      return this.activeCategory?.subcategories ?? [];
    },
    showMoreButton() {
      return this.commodities.length < this.totalCommodities;
    },
    activeSubcategory() {
      if (!this.selectedSubcategoryId) return this.subcategories[0];
      return this.subcategories.find(cat => cat._id === this.selectedSubcategoryId);
    },
    activeCategory() {
      if (!this.selectedCategoryId) return this.categories[0];
      return this.categories.find(cat => cat._id === this.selectedCategoryId);
    },
    pages() {
      if (!this.total) return 1;

      return Math.ceil(this.total / this.pageSize);
    },
  },
  watch: {
    radioGroup() {
      if (this.page !== 1) this.page = 1;
      else this.getCommodities();
    },
    page() {
      this.getCommodities();
    },
    activeSubcategory(val) {
      if (!val) return;
      if (this.page !== 1) this.page = 1;
      else this.getCommodities();
    },
    selectedCategoryId() {
      this.selectedSubcategoryId = '';
    },
    search() {
      if (this.page !== 1) this.page = 1;
      this.searchDebounced();
    },
  },
  methods: {
    getCommodities() {
      if (!this.activeSubcategory) return;
      this.$store.dispatch('shop/GET_COMMODITIES', {
        id: this.activeSubcategory?._id,
        search: this.search,
        offset: (this.page - 1) * this.pageSize,
        filter: this.filters[this.radioGroup].param,
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
  },
  mounted() {
    this.getCommodities();
    this.searchDebounced = debounce(this.getCommodities, 1000);
  },
};
</script>
<style>
.skeleton .v-skeleton-loader__image {
  height: 250px !important;
}
</style>