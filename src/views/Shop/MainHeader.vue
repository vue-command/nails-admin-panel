<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12">
          <h1>SHOP MANAGEMENT</h1>
        </v-col>
      </v-row>

      <v-row class="pa-5">
        <v-col cols="12">
          <v-card v-if='categories'>
            <v-row>
              <v-col cols="12" lg="6" class="pa-5">
                <v-select
                  outlined
                  :items="categories"
                  item-text="name"
                  item-value="_id"
                  label="Category"
                  :value="selectedCategory"
                  @change="selectCategory"
                  >Choose category</v-select
                >
              </v-col>
              <v-col cols="12" lg="6" class="pa-5" v-if='selectedCategory'>
                <v-select
                  :disabled='!selectedCategory'
                  outlined
                  :items="selectedCategory.subcategories"
                  item-text="name"
                  item-value="_id"
                  label="Subcategory"
                  :value="selectedCategory"
                  @change="selectCategory"
                  >Choose subcategory</v-select
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-radio-group
                  :value="showCommodities"
                  @change="changeValue"
                  row
                >
                  <v-radio label="All" value="withHidden"></v-radio>
                  <v-radio label="Hidden only" value="hiddenOnly"></v-radio>
                  <v-radio label="Published only" value="all"></v-radio>
                </v-radio-group>
                <hr />
              </v-col>
              </v-row>
              <!--
              <v-col cols="12" lg="4" class="pa-5">
                <v-text-field v-model="newCategoryName" label="New category" outlined></v-text-field>
                <v-btn :disabled="!newCategoryName">ADD NEW CATEGORY</v-btn>
              </v-col>
              -->
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
      <v-col cols="12">
        <v-row></v-row>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      newCategoryName: '',
    };
  },
  name: 'MainHeader',
  props: [
    'modifyHandler',
    'selectCategory',
    'selectedCategory',
    'showCommodities',
    'setCommoditiesToShowValue',
  ],
  computed: {
    ...mapState('shop', [
      'categories',
      'commodities',
      'totalCommodities',
      'activeCategory',
    ]),
    showValue() {
      return this.showCommodities;
    },
  },
  methods: {
    changeValue(val) {
      this.$store.dispatch('shop/SET_ACTIVE_CATEGORY', val)
      this.setCommoditiesToShowValue(val);
    },
  },
};
</script>
