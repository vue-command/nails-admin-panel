<template>
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
          v-model="data.categoryId"
          >Choose category</v-select
        >

        <v-select
          :disabled="!data.categoryId"
          :items="subcategories"
          outlined
          :rules="[rules.required]"
          item-text="name"
          item-value="_id"
          label="Subategory"
          v-model="data.subCategoryId"
          >Choose subcategory</v-select
        >

        <v-textarea
          class="textarea-speciﬁcation"
          v-model="data.speciﬁcations"
          :rules="[rules.required]"
          rows="8"
          no-resize
          label="Speciﬁcation"
          outlined
        />
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model.number="data.price"
                  :rules="[rules.required]"
                  label="Price"
                  type="number"
                  min="0"
                  outlined
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model.number="data.amount"
                  :rules="[rules.required]"
                  label="Amount"
                  type="number"
                  min="0"
                  outlined
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" xl="6" md="6" lg="6" sm="12">
        <v-text-field v-model="data.brand" :rules="[rules.required]" label="Brand" outlined />

        <v-text-field v-model="data.name" :rules="[rules.required]" label="Name" outlined />

        <v-text-field v-model="data.codeOfProduct" :rules="[rules.required]" label="Code" outlined />

        <div>
          <v-btn
            v-if="Array.isArray(data.previewImage)"
            @click="data.previewImage = null"
            color="buttons"
            rounded
            small
            outlined
            primary
          >
            change file
          </v-btn>
          <v-file-input
            v-else
            :rules="[rules.size, rules.requiredFile]"
            v-model="data.previewImage"
            accept="image/*"
            color="deep-purple accent-4"
            label="Cover picture"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
            :clearable="false"
          />
        </div>
      </v-col>
    </v-row>
    <v-card flat>
      <v-card-actions>
        <v-btn color="buttons" @click="submit">Save </v-btn>
        <v-btn v-if="commodity" @click="fillingData"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ShopForm',
  props: {
    commodity: {
      type: Object,
      required: false,
    },
    currentCommodity: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      size: 10000,
      data: {
        categoryId: '',
        subCategoryId: '',
        brand: '',
        name: '',
        amount: 0,
        codeOfProduct: '',
        speciﬁcations: '',
        price: 0,
        previewImage: null,
      },
      rules: {
        required: v => !!v || 'input is required',
        requiredFile: v => this.$route.name !== 'commodity-create' || !!v || 'input is required',
        size: v => !v || v?.size < this.size * 1000 || `File size should be less than ${this.fileSize}`,
      },
    };
  },
  computed: {
    ...mapState('categories', ['categories']),
    subcategories() {
      return this.activeCategory?.subcategories ?? [];
    },
    activeCategory() {
      if (!this.data.categoryId) return this.categories[0];
      return this.categories.find(cat => cat._id === this.data.categoryId);
    },
    fileSize() {
      const arr = ['KB', 'MB', 'GB', 'TB'];
      let size = this.size;
      let index = 0;
      while (size >= 1000 && index < arr.length - 1) {
        size /= 1000;
        index += 1;
      }
      return `${size}${arr[index]}`;
    },
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.$emit('input', this.data);
      },
    },
    commodity(val) {
      if (!val) return;
      this.fillingData();
    },
  },
  methods: {
    fillingData() {
      Object.keys(this.data).forEach(key => {
        if (this.$route.name === 'commodity-create') {
          this.currentCommodity[key] && (this.data[key] = this.currentCommodity[key]);
        } else {
          if (this.commodity) {
            this.data[key] = this.commodity[key];
          }
        }
      });
    },
    submit() {
      if (!this.$refs.form.validate()) return;
      this.$emit('submitHandler');
    },
  },
  mounted() {
    this.fillingData();
  },
};
</script>

<style>
</style>