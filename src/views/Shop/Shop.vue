<template>
  <v-container v-if="!selectedItemToModify">
    <v-card>
      <MainHeader
        :selectCategory="selectCategory"
        :modifyHandler="modifyHandler"
        :categories="categories"
        :selectedCategory="selectedCategory"
      />
      <v-row justify="start">
        <v-col cols="12">
          <CardsList
            :cardClickHandler="modifyHandler"
            :commodities="commodities"
            :getCards="getCards"
            :selectedCategory="selectedCategory"
            :totalPages="totalPages"
            :currentPage="currentPage"
            :setPage="setPage"
          />
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
    :deleteCommodity='deleteCommodity'
    :getDataMain='getData'
    :modifyHandler='modifyHandler'
  />
</template>
<style scoped>
.home {
  background: #000;
}
</style>

<script>
import CardsList from "./CardsList.vue";
import MainHeader from "./MainHeader.vue";
import ModifyProduct from "./ModifyProduct.vue";
export default {
  name: "ShopEdit",
  props: [
    "createCommodity",
    "deleteCommodity",
    "uploadImages",
    "deleteImage",
    "createCategory",
    'updateCommodity'
  ],
  data() {
    return {
      categories: [],
      commodities: [],
      selectedCategory: null,
      totalItems: 0,
      selectedItemToModify: null,

      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / 20);
    },
    skip() {
      return this.currentPage * 20 - 20;
    },
  },
  components: { CardsList, MainHeader, ModifyProduct },
  methods: {
    async getData() {
      const response = await (
        await fetch(
          "https://nails-australia-staging.herokuapp.com/shop/categories?subbs=true&withId=true"
        )
      ).json();
      this.categories = await response.categories.flat();
      if (this.categories[0] && this.categories[0]._id && !this.selectedCategory) {
        this.selectedCategory =  this.categories[0]._id;
      }
      if(this.selectedCategory){
        this.getCards(this.selectedCategory);
      }
    },
    async getCards(categoryId, skip) {
      const items = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/shop/commodities/${categoryId}?skip=${
            skip || 0}&withHidden=withHidden`
        )
      ).json();
      this.commodities = await items.commodities || [];
      this.totalItems = await items.total || 0;
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
  },
  created() {
    this.getData();
  },
};
</script>
