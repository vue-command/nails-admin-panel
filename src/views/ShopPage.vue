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
import 'nails-shop-module';
import 'nails-shop-module/dist/nails-shop-module.css';

export default {
  name: 'ShopPage',
  data() {
    return {
      // eslint-disable-next-line global-require
      noImage: require('../assets/noImage.jpg'),
    };
  },
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
        const { data, error } = await response.json();
        if (data) {
          this.$notify({
            group: 'foo',
            title: 'Commodity created',
          });
        }
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        }
        return data;
      } catch (error) {
        this.$notify({
          group: 'foo',
          title: error.message || 'Something went wrong',
          type: 'error',
        });
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

        const { data, error } = await response.json();
        if (data) {
          this.$notify({
            group: 'foo',
            title: 'Commodity updated',
          });
        }
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        }
        return data;
      } catch (error) {
        this.$notify({
          group: 'foo',
          title: error.message || 'Something went wrong',
          type: 'error',
        });
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
        const { updatedCommodity, error } = await response.json();
        if (updatedCommodity) {
          this.$notify({
            group: 'foo',
            title: 'Images uploaded',
          });
        }
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        }
        return updatedCommodity;
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong',
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
        const { deleted, error } = await response.json();
        if (deleted) {
          this.$notify({
            group: 'foo',
            title: 'Image deleted',
          });
        }
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        }
        return deleted;
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong',
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

        const { deleted, error } = await response.json();
        if (deleted) {
          this.$notify({
            group: 'foo',
            title: 'Commodity deleted',
          });
        }
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        }
        return deleted;
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong',
        });
        return null;
      }
    },
  },
};
</script>
