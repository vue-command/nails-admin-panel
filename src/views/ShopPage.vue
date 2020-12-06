<template>
  <Shop
    :createCommodity="createCommodity"
    :updateCommodity="updateCommodity"
    :uploadImages="uploadImages"
    :deleteImage="deleteImage"
    :createCategory="createCategory"
    :deleteCommodity="deleteCommodity"
    :noImage='noImage'
  />
</template>

<script>
import Shop from './Shop/Shop.vue';

export default {
  name: 'ShopPage',
  components: { Shop },
  data() {
    return {
      // eslint-disable-next-line global-require
      noImage: require('../assets/noImage.jpg'),
    };
  },
  methods: {
    async createCommodity(value) {
      console.log('createCommodity moved to store', value);
    },
    async updateCommodity(id, value) {
      console.log('updateCommodity moved to store', id, value);
    },
    async uploadImages(id, value) {
      console.log('uploadImages moved to store', id, value);
    },
    async deleteImage(id) {
      console.log('deleteImage moved to store', id);
    },
    // TODO: move to categories store
    async createCategory(value) {
      try {
        const response = await fetch(
          'https://nails-australia-staging.herokuapp.com/shop/commodity/files/',
          {
            method: 'POST',
            value,
          },
        );
        const { data } = await response.json();
        return data;
      } catch (error) {
        return null;
      }
    },
    async deleteCommodity(id) {
      console.log('deleteCommodity moved to store', id);
    },
  },
};
</script>
