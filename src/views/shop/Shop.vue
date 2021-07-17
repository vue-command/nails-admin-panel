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
              v-model="selectedCategory"
              :items="categories"
              item-text="name"
              return-object
              label="Category"
            >
              Choose category
            </v-select>
          </v-col>

          <v-col cols="12" sm="6" v-if="selectedCategory">
            <v-select
              class="text-subtitle-1"
              :disabled="!selectedCategory || !!search"
              v-model="selectedSubcategory"
              outlined
              :items="subcategories"
              item-text="name"
              return-object
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
      selectedCategory: null,
      selectedSubcategory: null,
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
    subcategories() {
      return this.selectedCategory?.subcategories ?? [];
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
    selectedSubcategory(val) {
      if (!val) return;
      if (this.page !== 1) this.page = 1;
      else this.getCommodities();
    },
    selectedCategory(val) {
      if(!val) {
        this.selectedSubcategory = null;
      }
      this.selectedSubcategory = val?.subcategories?.[0] || null;
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
  },
  created() {
    if(this.categories.length){
      this.selectedCategory = this.categories[0];
      this.selectedSubcategory = this.categories[0].subcategories[0];
    }
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