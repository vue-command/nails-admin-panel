<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Shop management</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-select
          :items="categories"
          item-text="name"
          item-value="_id"
          label="Category"
          @change="selectCategory"
          v-model="categories[0]"
        >
          Choose category
        </v-select>
      </v-col>
      <v-col cols="6" justify="center" align="center">
        <v-btn v-on:click.native="goToEditPage('new')">ADD NEW COMMODITY</v-btn>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col cols="12">
        <v-row>
          <Card
            v-for="card in commodities"
            :key="card.id"
            :images="card.image"
            :name="card.name"
            :price="card.price"
            :description="card.description"
            :id="card._id"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.home {
  background: #000;
}
</style>

<script>
import Card from './Card.vue';
export default {
  name: 'Home',
  data() {
    return {
      categories: [],
      commodities: [],
    };
  },
  components: { Card },
  methods: {
    async getData() {
      const response = await (
        await fetch('https://nails-australia-staging.herokuapp.com/shop/categories?subbs=true&withId=true')
      ).json();
      this.categories = await response.categories.flat();
      if (this.categories[0] && this.categories[0]._id) {
        await this.getCards(this.categories[0]._id);
      }
    },
    async getCards(categoryId) {
      const items = await (
        await fetch(`https://nails-australia-staging.herokuapp.com/shop/commodities/${categoryId}`)
      ).json();
      this.commodities = await items.commodities;
    },
    selectCategory(categoryId) {
      this.getCards(categoryId);
    },
    goToEditPage(id) {
      this.$router.push({ name: 'ModifyProduct', params: { productId: id } });
    },
  },
  created() {
    this.getData();
  },
};
</script>
