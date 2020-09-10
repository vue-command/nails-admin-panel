<template>
  <v-container>
    <v-row class="text-center">
      <v-btn class="ma-2" color="red darken-2" dark @click="clearHandler">
        <v-icon dark left>mdi-arrow-left</v-icon>Back</v-btn
      >
      <v-col cols="12">
        <h1>{{ productId === 'new' ? 'New' : 'Edit' }} product</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6" sm="12" xl="6" lg="6">
              <v-select
                :items="categories"
                outlined
                :rules="[rules.required]"
                item-text="name"
                item-value="_id"
                label="Category"
                @change="selectCategory"
                v-model="category"
              >
                Choose category
              </v-select>
              <v-textarea v-model="speciﬁcations" :rules="[rules.required]" label="Speciﬁcation" outlined></v-textarea>
              <v-text-field
                v-model="price"
                :rules="[rules.required]"
                label="Price"
                type="number"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" xl="6" md="6" lg="6" sm="12">
              <v-text-field v-model="brand" :rules="[rules.required]" label="Brand" outlined></v-text-field>
              <v-text-field v-model="name" :rules="[rules.required]" label="Name" outlined></v-text-field>
              <v-text-field v-model="codeOfProduct" :rules="[rules.required]" label="Code" outlined></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3>Preview image</h3>
              <v-img :src='coverImage'  max-height='200' with='200' contain></v-img>
              <v-file-input>UPLOAD</v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h3>All images</h3>
              <v-row>
              <v-card v-for="(image, index) in images" :key='index' class='pa-5 ma-5'>
                <v-img  :src='image'  height='100' width='100' contain></v-img>
                <v-btn>DELETE</v-btn>
              </v-card>
              
              </v-row>
              <v-file-input label='UPLOAD'></v-file-input>
            </v-col>
          </v-row>
          <v-col cols="12" class="align-center">
            <v-btn
              color="buttons"
              outlined
              large
              min-width="90"
              class="yellow-button mt-4"
              @click="submit"
              :disabled="!valid"
              >Check and confirm</v-btn
            >
          </v-col>
        </v-form>
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
export default {
  name: 'ModifyProduct',
  props: ['productId', 'clearHandler'],
  data() {
    return {
      valid: true,
      category: '',
      brand: '',
      name: '',
      codeOfProduct: '',
      speciﬁcations: '',
      price: 0,
      photos: [],
      categories: [],
      currentProduct: null,
      rules: {
        required: (v) => !!v || 'input is required',
      },
      images: [],
      imagesToUpload: [],
      coverImage: 'https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-no-image-available-icon-flat-vector.jpg',
    };
  },
  components: {},
  watch: {
    currentProduct(newVal) {
      this.category = newVal.categoryId;
      this.brand = newVal.brand;
      this.name = newVal.name;
      this.speciﬁcations = newVal.speciﬁcations;
      this.codeOfProduct = newVal.codeOfProduct;
      this.price = newVal.price;
      this.images = newVal.image;
    },
  },
  methods: {
    async getData() {
      const response = await (
        await fetch('https://nails-australia-staging.herokuapp.com/shop/categories?subbs=true&withId=true')
      ).json();
      this.categories = await response.categories.flat();
    },
    async getCommodity(id) {
      const response = await (await fetch(`https://nails-australia-staging.herokuapp.com/shop/commodity/${id}`)).json();
      this.currentProduct = await response.commodity[0];
    },
    goToShop() {
      this.$router.push({ name: 'ShopEdit' });
    },
    submit() {
      let data = {
        categoryId: this.category,
        name: this.name,
        speciﬁcations: this.speciﬁcations,
        price: this.price,
        codeOfProduct: this.codeOfProduct,
        brand: this.brand,
      };
      console.log(data);
    },
    selectCategory() {},
  },
  created() {
    this.getData();
    if (this.productId !== 'new') {
      this.getCommodity(this.productId);
    }
  },
};
</script>
