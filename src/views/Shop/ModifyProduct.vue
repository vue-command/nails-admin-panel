<template>
  <v-container>
    <v-row class="text-center">
      <v-btn class="ma-2" color="red darken-2" dark @click='clearHandler'> <v-icon dark left>mdi-arrow-left</v-icon>Back</v-btn>
      <v-col cols="12">
        <h1>{{ productId === 'new' ? 'New' : 'Edit' }} product</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form ref="form">
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
          <v-col cols="12" style="text-align:center">
            <v-btn color="buttons" outlined large min-width="90" class="yellow-button mt-4">Check and confirm</v-btn>
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
