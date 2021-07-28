<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12" md="6" class="pa-5">
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              :disabled="!!search"
              class="text-subtitle-1"
              outlined
              v-model="selectedCategoryIndex"
              :items="categoriesList"
              item-text="name"
              item-value="index"
              label="Category"
            >
              Choose category
            </v-select>
          </v-col>

          <v-col cols="12" sm="6" v-if="selectedCategory">
            <v-select
              class="text-subtitle-1"
              :disabled="!selectedCategory || !!search"
              v-model="selectedSubcategoryIndex"
              outlined
              :items="subcategories"
              item-text="name"
              item-value="index"
              label="Subcategory"
            >
              Choose subcategory
            </v-select>
          </v-col>

          <v-col cols="12" offset-sm="2" sm="8" offset-md="0" md="12">
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

      <v-col cols="12" md="6" class="pa-5">
        <v-row>
          <v-col cols="12" sm="6">
            <v-radio-group v-model="radioGroup" :row="$vuetify.breakpoint.smAndDown">
              <v-radio
                v-for="filter in filters"
                class="ma-1 font-weight-bold"
                :key="filter.param"
                :label="filter.title"
              />
            </v-radio-group>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card flat>
              <v-card-actions class="d-flex justify-center justify-sm-end">
                <v-btn
                  @click="
                    $router.push({
                      name: 'commodity-create',
                    })
                  "
                  >ADD NEW COMMODITY</v-btn
                >
              </v-card-actions>
            </v-card>
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
      selectedCategoryIndex: 0,
      selectedSubcategoryIndex: 0,
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
    };
  },
  computed: {
    ...mapState('shop', ['isShopLoading', 'commodities', 'total']),
    ...mapState('categories', ['categories']),
    categoriesList() {
      return this.categories.map((item, index) => {
        item.index = index;
        return item;
      });
    },
    selectedCategory() {
      return this.categories?.[this.selectedCategoryIndex] || null;
    },
    selectedSubcategory() {
      return this.selectedCategory?.subcategories?.[this.selectedSubcategoryIndex] || null;
    },
    subcategories() {
      return (this.selectedCategory?.subcategories || []).map((item, index) => {
        item.index = index;
        return item;
      });
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
    selectedCategoryIndex() {
      localStorage.setItem('Shop_categoryIndex', this.selectedCategoryIndex);
      this.selectedSubcategoryIndex = 0;
    },
    selectedSubcategoryIndex() {
      localStorage.setItem('Shop_subCategoryIndex', this.selectedSubcategoryIndex);
    },
    selectedSubcategory(val) {
      if (!val) return;
      if (this.page !== 1) this.page = 1;
      else this.getCommodities();
    },
    search() {
      if (this.page !== 1) this.page = 1;
      this.searchDebounced();
    },
  },
  methods: {
    getCommodities() {
      if (!this.selectedSubcategory) return;
      this.$store.dispatch('shop/GET_COMMODITIES', {
        id: this.selectedSubcategory?._id,
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
    saveIndexes() {
      localStorage.setItem('Shop_categoryIndex', this.selectedCategoryIndex);
      localStorage.setItem('Shop_subCategoryIndex', this.selectedSubcategoryIndex);
    },
    readIndexes() {
      this.selectedCategoryIndex = Number(localStorage.getItem('Shop_categoryIndex')) || 0;
      this.selectedSubcategoryIndex = Number(localStorage.getItem('Shop_subCategoryIndex')) || 0;
    },
  },
  created() {
    this.readIndexes();

    this.getCommodities();
    this.searchDebounced = debounce(this.getCommodities, 1000);
  },
  beforeDestroy() {
    this.saveIndexes();
  },
};
</script>
<style>
.skeleton .v-skeleton-loader__image {
  height: 250px !important;
}
</style>