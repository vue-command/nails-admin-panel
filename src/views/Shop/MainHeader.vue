<template>
  <v-row>
    <v-col>
      <v-row class="pa-5">
        <v-col cols="12">
          <v-card v-if='categories' flat>
            <v-row>
              <v-col cols="12" lg="6" class="pa-5">
                <v-select
                  outlined
                  :items="categories"
                  item-text="name"
                  item-value="_id"
                  label="Category"
                  @change="setSelectCategory"
                  >Choose category</v-select
                >
              </v-col>
              <v-col cols="12" lg="6" class="pa-5" v-if='activeCategory'>
                <v-select
                  v-model="activeSubcategory"
                  :disabled='!activeCategory'
                  outlined
                  
                  :items="[{ name: 'Show all', _id: activeCategory._id }, ...activeCategory.subcategories ]"
                  item-text="name"
                  item-value="_id"
                  label="Subcategory"
                  @change="setSelectSubCategory"
                  >Choose subcategory</v-select
                >
              </v-col>
            </v-row>
              <v-col>
                <v-radio-group
                  :value="showCommodities"
                  @change="changeValue"
                  row
                  justify-center
                >
                  <v-radio label="All" value="withHidden"></v-radio>
                  <v-radio label="Hidden only" value="hiddenOnly"></v-radio>
                  <v-radio label="Published only" value="all"></v-radio>
                </v-radio-group>
                <hr />
              </v-col>
            <v-row>
              <v-col
                cols="12"
                lg="12"
                class="align-center justify-center d-flex"
              >
                <v-btn v-on:click.native="modifyHandler('new')"
                  >ADD NEW COMMODITY</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      newCategoryName: '',
      activeCategory: null,
      activeSubcategory: null
    };
  },
  name: 'MainHeader',
  props: [
    'selectCategory',
    'showCommodities',
    'setCommoditiesToShowValue',
    'modifyHandler'
  ],
  computed: {
    ...mapState('shop', [
      'fullListOfCategories',
      'commodities',
      'totalCommodities',
      'categories',
    ]),
  },
  methods: {
    setSelectCategory (val){
      this.activeCategory = this.fullListOfCategories.find(el => el._id === val)
      this.activeSubcategory = null
      this.selectCategory(val)
    },
    setSelectSubCategory(val) {
      this.selectCategory(val)
    },
    changeValue(val) {
      this.setCommoditiesToShowValue(val);
    },
  },
};
</script>
