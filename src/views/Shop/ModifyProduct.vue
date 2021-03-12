<template>
  <v-container>
    <v-row class="d-flex justify-start my-5">
      <v-btn class="ma-2 text-h6 font-weight-bold" color="blue" text dark @click="goBack()">
        <v-icon x-large left>mdi-chevron-left</v-icon>Go Back
      </v-btn>
    </v-row>

    <v-card class="pa-10" v-if="!isCommodityLoading">
      <v-card-text class="mb-10">
        <h1 class="text-h4 black--text">{{ productId === 'new' ? 'NEW' : 'MODIFY' }} PRODUCT</h1>
      </v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12" md="6" sm="12" xl="6" lg="6">
                <v-select
                  v-if="categories"
                  :items="categories"
                  outlined
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="_id"
                  label="Category"
                  v-model="currentCommodity.categoryId"
                  >Choose category</v-select
                >
                <v-select
                  :disabled="!currentCommodity.categoryId"
                  :items="
                    currentCommodity.categoryId
                      ? categories.find(el => el._id === currentCommodity.categoryId).subcategories
                      : []
                  "
                  outlined
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="_id"
                  label="Subategory"
                  v-model="currentCommodity.subCategoryId"
                  >Choose subcategory</v-select
                >
                <v-textarea
                  class="textarea-speciﬁcation"
                  v-model="currentCommodity.speciﬁcations"
                  :rules="[rules.required]"
                  rows="8"
                  no-resize
                  label="Speciﬁcation"
                  outlined
                ></v-textarea>
                <v-row>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="currentCommodity.price"
                          :rules="[rules.required]"
                          label="Price"
                          type="number"
                          min="0"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="currentCommodity.amount"
                          :rules="[rules.required]"
                          label="Amount"
                          type="number"
                          min="0"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" xl="6" md="6" lg="6" sm="12">
                <v-text-field
                  v-model="currentCommodity.brand"
                  :rules="[rules.required]"
                  label="Brand"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="currentCommodity.name"
                  :rules="[rules.required]"
                  label="Name"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="currentCommodity.codeOfProduct"
                  :rules="[rules.required]"
                  label="Code"
                  outlined
                ></v-text-field>
                <v-file-input
                  v-model="previewFile"
                  accept="image/*"
                  color="deep-purple accent-4"
                  label="Cover picture"
                  prepend-icon="mdi-paperclip"
                  outlined
                  :show-size="1000"
                  :clearable="false"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn color="buttons" @click="submitHandler" :disabled="isSaveDisabled">Save </v-btn>
                <v-btn v-if="commodity" @click="cancelHandler"> Cancel </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="12" sm="6">
          <v-row justify="center">
            <v-card class="cardfone shop-card" width="300" min-height="500">
              <v-card flat class="px-0 pt-4 gray-background" width="100%">
                <v-img :src="previewImageLink || coverImageSrc" :lazy-src="noImage" width="100%" height="350" contain />
              </v-card>
              <v-card-text>
                <p class="dgrey--text text-subtitle-1 my-1 font-weight-bold text-start">
                  {{ currentCommodity.name || 'Name' }}
                </p>
                <p class="black--text text-subtitle-1 ma-0 font-weight-medium text-start">
                  {{ currentCommodity.brand || 'Brand' }}
                </p>
                <p class="d-flex justify-end text-h6 ma-0 font-weight-bold">{{ currentCommodity.price }} AUD</p>
              </v-card-text>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="12" class="mb-10">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-text class="text-h4 black--text ma-5"> ATTACHED IMAGES </v-card-text>
          <v-row>
            <v-card flat min-height="400" class="d-flex flex-column justify-center" width="100%">
              <v-row v-if="images && images.length">
                <v-col v-for="(image, index) in images" :key="index" lg="3" md="4" sm="6">
                  <v-card class="pa-5 ma-5">
                    <v-img :src="image.link" :lazy-src="noImage" height="200" contain></v-img>
                    <v-btn color="error" @click="deleteImageHandler(image, index)">DELETE</v-btn>
                  </v-card>
                </v-col>
              </v-row>
              <v-card-text v-else justify="center">
                <v-card-text class="text-h4 black--text ma-5"> NO IMAGES </v-card-text>
              </v-card-text>
            </v-card>
          </v-row>
          <v-row justify="start">
            <v-btn color="buttons" @click="$refs.inputUpload.click()" :disabled="!commodity" class="my-10"
              >Upload images</v-btn
            >
            <input
              v-show="false"
              ref="inputUpload"
              accept="image/*"
              type="file"
              @change="previewFilesHandler"
              multiple
            />
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="my-10"></v-divider>
      <v-row>
        <v-col cols="12">
          <v-row justify="start" class="pt-10">
            <v-col cols="1" sm="1" md="1" xl="2" lg="2"></v-col>

            <v-col cols="12" sm="6" md="4" xl="4" lg="4" xs="12" class="px-0">
              <v-row class="image-row">
                <v-img :src="activeCard" :lazy-src="noImage" max-width="100%" max-height="400px" contain></v-img>
              </v-row>
              <v-row class="justify-center">
                <v-slide-group :model="activeCard" class="px-0 justify-center" center-active mandatory>
                  <v-slide-item v-for="img in images" :key="img._id" v-slot:default="{ active, toggle }">
                    <v-img
                      @click="setPhoto(img, toggle)"
                      :lazy-src="noImage"
                      :src="img.link"
                      width="60px"
                      height="60px"
                      contain
                      active
                      :class="[active ? 'card-active' : 'card-disabled', 'mx-2']"
                    ></v-img>
                  </v-slide-item>
                </v-slide-group>
              </v-row>
            </v-col>

            <v-col cols="2" md="0"></v-col>

            <v-col cols="12" sm="12" md="5" xl="4" lg="4" class="px-0">
              <v-col cols="12" class="text--shopfont px-0 text-start">
                <h2 class="text--darkGrey">{{ currentCommodity.name || 'Name' }}</h2>
                <h4>{{ currentCommodity.brand }}</h4>
                <div class="caption">
                  <h2 class="speciﬁcations">
                    {{ currentCommodity.speciﬁcations ? currentCommodity.speciﬁcations.trim() : 'Specification' }}
                  </h2>
                </div>
                <div class="price">
                  <h3 class="text--darkGrey">{{ currentCommodity.price }} AUD</h3>
                  <div style="width: 200px">
                    <v-btn small width="100%" class="pa-2 ma-2 dgrey--text" color="orange">Add to card</v-btn>
                    <v-btn small width="100%" class="pa-2 ma-2 white--text" color="dgrey">Buy it now</v-btn>
                  </div>
                </div>
              </v-col>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <confirm-delete :confirmDelete="deleteCommodityHandler" :dialog.sync="showDialog" :title="title">
      </confirm-delete>
      <v-divider class="my-10"></v-divider>
      <v-row justify="space-between">
        <v-btn color="error" large min-width="90" class="mt-4" @click="showDialog = true" :disabled="!commodity"
          >DELETE COMMODITY</v-btn
        >
        <v-btn
          color="buttons"
          large
          min-width="90"
          class="yellow-button mt-4"
          @click="publishHandler"
          :disabled="!commodity"
          >{{ currentCommodity.isPublished ? 'Hide commodity' : 'Publish commodity' }}</v-btn
        >
      </v-row>
    </v-card>
    <v-card v-else width="100%" height="80vh" class="pa-10">
      <v-skeleton-loader
        height="100%"
        animation
        type="image, list-item-three-line, actions, card-heading, image, actions, image, list-item-three-line, actions"
      ></v-skeleton-loader>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import confirmDelete from '../../components/popups/confirmDelete.vue';

export default {
  components: { confirmDelete },
  name: 'ModifyProduct',
  data() {
    return {
      noImage: require('@/views/Shop/assets/no-image.png'),
      showDialog: false,
      title: 'commodity',
      valid: true,
      currentCommodity: {
        categoryId: '',
        subCategoryId: '',
        brand: '',
        name: '',
        amount: '',
        codeOfProduct: '',
        speciﬁcations: '',
        isPublished: false,
        price: 0,
      },
      photos: [],
      currentProduct: null,
      rules: {
        required: v => !!v || 'input is required',
      },
      images: [],
      previewFile: null,
      previewImageLink: require('@/assets/noImage.jpg'),
      activeCard: require('@/assets/noImage.jpg'),
      coverImageSrc: require('@/assets/noImage.jpg'),
    };
  },
  watch: {
    previewFile(newVal) {
      if (newVal) {
        this.previewImageLink = URL.createObjectURL(newVal);
      }
    },
    commodity(newVal) {
      if (newVal && newVal._id) {
        this.setCommodity(newVal);
        if (this.productId === 'new') {
          const currentParams = this.$router.currentRoute.params;
          const mergedParams = { ...currentParams, commodityId: newVal._id };
          this.$router.push({ params: mergedParams });
        }
      }
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'shop' });
    },
    async publishHandler() {
      const commodityToUpdate = { ...this.commodity };
      delete commodityToUpdate.images;
      this.$store.dispatch('shop/UPDATE_COMMODITY', {
        data: {
          ...commodityToUpdate,
          isPublished: !this.currentCommodity.isPublished,
        },
        id: this.productId,
      });
    },
    setCommodity(commodity) {
      const { categoryId, subCategoryId, brand, name, amount, codeOfProduct, speciﬁcations, isPublished, price } = commodity
      
      this.currentCommodity = {
        categoryId,
        subCategoryId,
        brand,
        name,
        amount,
        codeOfProduct,
        speciﬁcations,
        isPublished,
        price,
      };
      this.images = commodity.images;
      this.previewImageLink = commodity.previewImage[0].link;
      this.previewImage = commodity.previewImage;
      this.activeCard = (commodity.images[0] && commodity.images[0].link) || this.coverImageSrc;
    },
    setPhoto(val, toggle) {
      toggle();
      this.activeCard = val.link;
    },
    async submitHandler() {
      const data = { ...this.currentCommodity };
      if (this.productId === 'new') {
        data.previewFile = this.previewFile;
        this.$store.dispatch('shop/CREATE_COMMODITY', { data });
      } else {
        if (this.previewFile) {
          data.previewFile = this.previewFile;
        }
        this.$store.dispatch('shop/UPDATE_COMMODITY', { data, id: this.productId });
      }
    },
    cancelHandler() {
      this.setCommodity(this.commodity);
    },
    async previewFilesHandler(e) {
      this.$store.dispatch('shop/UPLOAD_IMAGES', { data: e.target.files, id: this.commodity._id });
    },
    async deleteImageHandler(img) {
      this.$store.dispatch('shop/DELETE_IMAGE', {
        id: img._id,
      });
    },
    async deleteCommodityHandler() {
      await this.$store.dispatch('shop/DELETE_COMMODITY', { id: this.commodity._id });
      this.$router.push({ name: 'shop' });
    },
  },
  computed: {
    ...mapState('shop', ['fullListOfCategories', 'commodity', 'categories', 'isCommodityLoading']),
    isSaveDisabled() {
      let isDisabled = true;
      if (this.productId !== 'new') isDisabled = !this.valid;
      else if (this.valid) {
        isDisabled = !this.previewFile;
      }
      return isDisabled;
    },
    productId() {
      return this.$route.params.commodityId;
    },
  },
  async created() {
    if (!this.categories) await this.$store.dispatch('shop/GET_SHOP_CATEGORIES');
    if (this.productId !== 'new') {
      this.$store.dispatch('shop/GET_COMMODITY', {
        commodityId: this.productId,
      });
    }
  },
  beforeDestroy() {
    this.$store.commit('shop/CLEAR_COMMODITY');
  },
};
</script>

<style>
.card-active {
  opacity: 1;
}
.image-row {
  height: 430px;
}
.card-disabled {
  cursor: pointer;
  opacity: 0.4;
}
.viewed-block {
  justify-content: space-around;
}
.speciﬁcations {
  white-space: pre-wrap;
}
.caption {
  margin-top: 50px;
}
.caption > h2 {
  margin-top: 5px;
}

.add {
  color: #333333 !important;
  margin: 4px 0;
}
.buy {
  color: white !important;
  margin: 4px 0;
}
.price {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
.price > h3 {
  margin: 25px 0;
}
.text--darkGrey {
  color: #333333;
}
.gray-font {
  color: #808080;
}

/* @media screen and (max-width: 320px) {
  .caption > h2 {
    font-size: 14px;
  }
} */
</style>
