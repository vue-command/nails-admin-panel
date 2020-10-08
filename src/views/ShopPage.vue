<template>
  <Shop
    :createCommodity="createCommodity"
    :updateCommodity="updateCommodity"
    :uploadImages="uploadImages"
    :deleteImage="deleteImage"
    :createCategory="createCategory"
    :deleteCommodity="deleteCommodity"
  />
</template>

<style scoped>
.home {
  background: #000;
}
</style>

<script>
import Shop from './Shop/Shop.vue';

export default {
  name: 'ShopPage',
  components: { Shop },
  methods: {
    async createCommodity(value) {
      const formData = new FormData();
      Object.keys(value).map((key) => formData.append(key, value[key]));
      try {
        const response = await fetch(
          'https://nails-australia-staging.herokuapp.com/shop/new/commodity',
          {
            method: 'POST',
            body: formData,
          },
        );
        const { data } = await response.json();
        if (data) {
          this.$notify({
            group: 'foo',
            title: 'Commodity created',
          });
        }
        return data;
      } catch (error) {
        return null;
      }
    },
    async updateCommodity(id, value) {
      const formData = new FormData();
      Object.keys(value).map((item) => formData.append(item, value[item]));
      try {
        const response = await fetch(
          `https://nails-australia-staging.herokuapp.com/shop/commodity/${id}`,
          {
            method: 'PUT',
            body: formData,
          },
        );

        const { data } = await response.json();
        if (data) {
          this.$notify({
            group: 'foo',
            title: 'Commodity updated',
          });
        }
        return data;
      } catch (error) {
        return null;
      }
    },
    async uploadImages(id, value) {
      const formData = new FormData();
      [...value].map((item) => formData.append('files', item));
      try {
        const response = await fetch(
          `https://nails-australia-staging.herokuapp.com/shop/commodity/files/${id}`,
          {
            method: 'POST',
            body: formData,
          },
        );
        const { updatedCommodity } = await response.json();
        if (updatedCommodity) {
          this.$notify({
            group: 'foo',
            title: 'Images uploaded',
          });
        }
        return updatedCommodity;
      } catch (error) {
        this.$notify({
          group: 'foo',
          title: 'Something went wrong',
        });
        return null;
      }
    },
    async deleteImage(id) {
      try {
        const response = await fetch(
          `https://nails-australia-staging.herokuapp.com/shop/file/${id}`,
          {
            method: 'DELETE',
          },
        );
        const { deleted } = await response.json();
        if (deleted) {
          this.$notify({
            group: 'foo',
            title: 'Image deleted',
          });
        }
        return deleted;
      } catch (error) {
        this.$notify({
          group: 'foo',
          title: 'Delete error',
        });
        return null;
      }
    },
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
      try {
        const response = await fetch(
          `https://nails-australia-staging.herokuapp.com/shop/commodity/${id}`,
          {
            method: 'DELETE',
          },
        );
        const { deleted } = await response.json();
        return deleted;
      } catch (error) {
        return null;
      }
    },
  },
};
</script>
