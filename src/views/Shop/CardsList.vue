<template>
  <v-row v-if="totalPages">
    <v-col cols="12">
      <v-row>
        <Card
          v-for="card in commodities"
          :key="card.id"
          :image="card.previewImage[0].link"
          :name="card.name"
          :price="card.price"
          :brand="card.brand"
          :id="card._id"
          :clickHandler="cardClickHandler"
        />
      </v-row>
    </v-col>
    <v-row justify="center">
      <v-pagination
        v-if="totalPages && totalPages > 1"
        v-model="page"
        :length="totalPages"
        @input="setPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        class="pagination-buttons"
      ></v-pagination>
    </v-row>
  </v-row>
  <v-row v-else>
    <v-col>
      <h1>No commodities</h1>
    </v-col>
  </v-row>
</template>

<script>
import Card from './Card.vue';
export default {
  name: 'CardsList',
  props: ['commodities', 'cardClickHandler', 'totalPages', 'getCards', 'selectedCategory', 'currentPage', 'setPage'],
  components: { Card },
  data() {
    return {
      page: this.currentPage,
    };
  },
  watch: {
    currentPage(newVal) {
      this.page = newVal;
    },
  },
};
</script>
