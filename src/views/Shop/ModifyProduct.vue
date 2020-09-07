<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>{{ productId === 'new' ? 'New' : 'Edit' }} product</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" offset-sm="4" sm="4">
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
              </v-col>
              <v-col cols="12" offset-sm="4" sm="4">
                <v-text-field v-model="brand" :rules="[rules.required]" label="Brand" outlined></v-text-field>
                <v-text-field v-model="name" :rules="[rules.required]" label="Name" outlined></v-text-field>
                <v-text-field v-model="code" :rules="[rules.required]" label="Code" outlined></v-text-field>
              </v-col>
              <v-col cols="12" offset-sm="4" sm="4">
                <v-textarea
                  v-model="specification"
                  :rules="[rules.required]"
                  label="Specification"
                  outlined
                ></v-textarea>
              </v-col>

              <v-col cols="12" offset-sm="4" sm="4">
                <v-text-field v-model="price" :rules="[rules.required]" label="Price" outlined></v-text-field>
              </v-col>

              <v-col cols="12" style="text-align:center">
                <v-btn color="buttons" outlined large min-width="90" class="yellow-button mt-4"
                  >Check and confirm</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
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
  name: 'Home',
  data() {
    return {
      productId: this.$route.params.productId,
      category: '',
      brand: '',
      name: '',
      code: '',
      specification: '',
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
