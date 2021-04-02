<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <v-select
          class="text-subtitle-1"
          outlined
          v-model="selectedCategoryId"
          :items="categories"
          item-text="name"
          item-value="_id"
          label="Category"
        >
          Choose category
        </v-select>
      </v-col>
      <v-col cols="12" md="7">
        <v-card flat>
          <v-card-actions class="justify-space-between">
            <v-btn :disabled="disabledRemoveBtn" @click="removeCategory">
              remove CATEGORY
              <v-icon>$delete</v-icon>
            </v-btn>
            <v-btn :disabled="openAddCategory || openedSomeInput" @click="openAddCategory = true">
              ADD NEW CATEGORY
              <v-icon>$plus</v-icon>
            </v-btn>
            <v-btn :disabled="openEditCategory || openedSomeInput" @click="openEditCategory = true">
              Edit CATEGORY
              <v-icon>$edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <AddCategory v-if="openAddCategory" :open.sync="openAddCategory" @submit="submitNewCategory" />
        <EditCategory
          v-if="openEditCategory"
          :open.sync="openEditCategory"
          @submit="submitEditCategory"
          :categoryName="activeCategory.name"
        />
        <AddSubcategory
          v-if="openAddSubcategory"
          :open.sync="openAddSubcategory"
          :activeCategory="activeCategory"
          @submit="submitNewSubcategory"
        />
      </v-col>
      <v-col cols="12" sm="6" md="7" class="text-right">
        <v-btn :disabled="openAddSubcategory || openedSomeInput" @click="openAddSubcategory = true" class="mt-4">
          ADD NEW SUBCATEGORY
          <v-icon>$plus</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-card v-if="!data.length" class="py-4 px-6">
          <p class="text-subtitle-1 text-center mb-0">No subcategories here yet</p>
        </v-card>
        <v-card else>
          <SubcategoryList
            :data="data"
            :onchangeId.sync="onchangeId"
            :showDialog.sync="showDialog"
            @changeSubcategoryName="changeSubcategoryName"
            @deleteSubcategoryHandler="deleteSubcategoryHandler"
            @cancelChangeSubcategoryName="cancelChangeSubcategoryName"
            @removeSubcat="removeSubcat"
          />
        </v-card>
      </v-col>
    </v-row>
    <confirmDelete :dialog.sync="showDialog" :title="title" :confirmDelete="deleteSubcategoryHandler" />
    <confirmDelete :dialog.sync="showDialog2" title="category" :confirmDelete="deleteCategoryHandler" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CategoriesPage',
  components: {
    AddSubcategory: () => import('@/components/inputs/AddSubcategory.vue'),
    EditCategory: () => import('@/components/inputs/EditCategory.vue'),
    SubcategoryList: () => import('@/components/category/SubcategoryList.vue'),
    AddCategory: () => import('@/components/inputs/AddCategory.vue'),
    confirmDelete: () => import('@/components/popups/confirmDelete.vue'),
  },
  data() {
    return {
      data: [],
      openAddSubcategory: false,
      openAddCategory: false,
      openEditCategory: false,
      showDialog: false,
      showDialog2: false,
      title: 'subcategory',
      onchangeId: '',
      deleteId: '',
      selectedCategoryId: '',
      // newSubcategoryName: '',
    };
  },
  computed: {
    ...mapState('categories', ['isPageLoading', 'categories', 'activeCategory']),
    disabledRemoveBtn() {
      return !!this.activeCategory?.subcategories?.length;
    },
    openedSomeInput() {
      return this.openAddSubcategory || this.openAddCategory || this.openEditCategory;
    },
  },
  watch: {
    activeCategory: {
      deep: true,
      handler(val) {
        if (!val) return;
        this.selectedCategoryId = val._id;
        this.fillingData();
      },
    },
    async selectedCategoryId(val) {
      await this.$store.dispatch('categories/SET_CATEGORY', {
        categoryId: val,
      });
      this.fillingData();
    },
  },
  methods: {
    async selectCategory(categoryId) {
      await this.$store.dispatch('categories/SET_CATEGORY', {
        categoryId,
      });
      this.fillingData();
    },
    removeCategory() {
      this.deleteId = this.activeCategory._id;
      this.showDialog2 = true;
    },
    removeSubcat(id) {
      this.deleteId = id;
      this.showDialog = true;
    },
    // edit(id) {
    //   this.onchangeId = id;
    // },
    async changeSubcategoryName(name) {
      const newName = name.trim();
      if (!newName) return;
      const oldName = this.activeCategory.subcategories.find(item => item._id === this.selectedCategoryId)?.name;
      if (oldName === newName) return;
      await this.$store.dispatch('categories/CHANGE_SUBCATEGORY_NAME', { id: this.onchangeId, name: newName });
      this.onchangeId = '';
    },
    async deleteSubcategoryHandler() {
      await this.$store.dispatch('categories/DELETE_SUBCATEGORY', { id: this.deleteId });
      this.showDialog = false;
    },
    async deleteCategoryHandler() {
      await this.$store.dispatch('categories/DELETE_CATEGORY', this.deleteId);
      this.showDialog2 = false;
    },
    cancelChangeSubcategoryName(id) {
      const obj1 = this.activeCategory.subcategories.find(elem => elem._id === id);
      const obj2 = this.data.find(elem => elem._id === id);
      Object.assign(obj2, obj1);
      this.onchangeId = '';
    },
    fillingData() {
      if (!this.selectedCategoryId) return;
      this.data = this.activeCategory.subcategories.map(item => Object.assign({}, item));
    },

    submitNewCategory(data) {
      this.$store.dispatch('categories/CREATE_NEW_CATEGORY', data);
    },
    submitNewSubcategory(data) {
      this.$store.dispatch('categories/CREATE_NEW_SUBCATEGORY', data);
    },
    submitEditCategory(name) {
      const data = {
        id: this.activeCategory._id,
        name,
      };
      this.$store.dispatch('categories/EDIT_CATEGORY', data);
    },
  },
  mounted() {
    this.selectedCategoryId = this.activeCategory._id;
    this.fillingData();
  },
};
</script>

<style></style>
