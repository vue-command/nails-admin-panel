<template>
  <v-container>
    <v-card flat v-if="!isCommodityLoading">
      <v-card-text class="mb-10">
        <h1 class="text-h4 black--text">{{ $route.name === 'commodity-create' ? 'CREATE' : 'MODIFY' }} PRODUCT</h1>
      </v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <ShopForm
            @input="merge"
            @submitHandler="submitHandler"
            :commodity="commodity"
            :currentCommodity="currentCommodity"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-card flat class="d-flex justify-center">
            <ShopCard width="250" height="350" :card="currentCommodity" />
          </v-card>
        </v-col>
      </v-row>

      <v-divider v-if="commodity" class="my-10"></v-divider>
      <ShopCardList
        v-if="commodity"
        :images="commodity.images"
        @delete="deleteImageHandler"
        @addFiles="previewFilesHandler"
        :disabled="!commodity"
        width="200"
      />
      <v-divider v-if="commodity" class="my-10"></v-divider>
      <ShopCardDetail :commodity="commodity" />

      <v-divider v-if="commodity" class="my-10"></v-divider>
      <v-card-actions v-if="commodity">
        <v-btn color="error" large min-width="90" class="mt-4" @click="showDialog = true" :disabled="!commodity"
          >DELETE COMMODITY</v-btn
        >
        <v-spacer />
        <v-btn
          color="buttons"
          large
          min-width="90"
          class="yellow-button mt-4"
          @click="publishHandler"
          :disabled="!commodity"
          >{{ publishBtnText }}</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-card v-else width="100%" height="80vh" class="pa-10">
      <v-skeleton-loader
        height="100%"
        animation
        type="image, list-item-three-line, actions, card-heading, image, actions, image, list-item-three-line, actions"
      ></v-skeleton-loader>
    </v-card>
    <confirm-delete :confirmDelete="deleteCommodityHandler" :dialog.sync="showDialog" :title="title"> </confirm-delete>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {
    ShopCard: () => import('@/components/shop/ShopCard.vue'),
    ShopCardList: () => import('@/components/shop/ShopCardList.vue'),
    ShopCardDetail: () => import('@/components/shop/ShopCardDetail.vue'),
    ShopForm: () => import('@/components/forms/ShopForm.vue'),
    confirmDelete: () => import('@/components/popups/confirmDelete.vue'),
  },
  name: 'ModifyProduct',
  data() {
    return {
      showDialog: false,
      title: 'commodity',
      valid: true,
      currentCommodity: {
        // isPublished: false,
      },
    };
  },
  computed: {
    ...mapState('shop', ['commodity', 'isCommodityLoading']),
    ...mapState('categories', ['categories']),
    productId() {
      return this.$route.params.commodityId;
    },
    publishBtnText() {
      return this.commodity?.isPublished ? 'Hide commodity' : 'Publish commodity';
    },
  },
  watch: {},
  methods: {
    merge(data) {
      this.currentCommodity = Object.assign({}, this.currentCommodity, data);
    },
    publishHandler() {
      this.$store.dispatch('shop/PATCH_COMMODITY', {
        commodity: {
          // ...this.currentCommodity,
          isPublished: !this.commodity.isPublished,
        },
        id: this.productId,
      });
    },
    submitHandler() {
      const formData = new FormData();
      Object.entries(this.currentCommodity).forEach(([key, value]) => {
        if (value instanceof File) formData.append('previewFile', value);
        else {
          formData.append(key, value);
        }
      });

      if (this.$route.name !== 'commodity-create') {
        this.$store.dispatch('shop/UPDATE_COMMODITY', { commodity: formData, id: this.productId });
      } else {
        this.$store.dispatch('shop/CREATE_COMMODITY', formData);
      }
    },
    previewFilesHandler(data) {
      this.$store.dispatch('shop/UPLOAD_IMAGES', { data, id: this.commodity._id });
    },
    deleteImageHandler(id) {
      this.$store.dispatch('shop/DELETE_IMAGE', id);
    },
    async deleteCommodityHandler() {
      await this.$store.dispatch('shop/DELETE_COMMODITY', this.commodity._id);
      this.$router.push({ name: 'commodities' });
    },
  },

  mounted() {
    if (this.$route.name !== 'commodity-create') {
      this.$store.dispatch('shop/GET_COMMODITY', this.productId);
    } else {
      this.currentCommodity = {};
      this.$store.commit('shop/CLEAR_COMMODITY');
    }
  },
};
</script>
