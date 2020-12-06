<template>
  <v-row v-if="totalPages">
    <v-col cols="12">
      <v-row>
        <ShopCard
          v-for="card in commodities"
          :key="card.id"
          :image="card.previewImage[0].link"
          :name="card.name"
          :price="card.price"
          :brand="card.brand"
          :id="card._id"
          :handler="cardClickHandler"
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
import 'nails-shop-card'
export default {
  name: 'CardsList',
  props: ['commodities', 'cardClickHandler', 'totalPages', 'getCards', 'selectedCategory', 'currentPage', 'setPage'],
  data () {
    return {
      page: this.currentPage
    }
  },
  watch: {
    currentPage (newVal) {
      this.page = newVal
    }
  }
}
</script>
