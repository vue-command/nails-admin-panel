<template>
  <v-container style="max-width: 960px;">
    <v-row class="pa-5">
      <v-col cols="12" class="pa-5">
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              class="text-subtitle-1"
              outlined
              :value="selectedCategory"
              :items="categories"
              item-text="name"
              item-value="_id"
              label="Category"
              @change="selectCategory"
            >
              Choose category
            </v-select>
          </v-col>
          <v-col cols="12" md="6" class="text-right">
            <v-btn @click="open=true" class="mt-4">
              ADD NEW SUBCATEGORY
              <v-icon>$plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <AddSubcategory v-if="open" :open.sync="open" :activeCategory="activeCategory" />

        <confirmDelete :dialog.sync="showDialog" :title="title" :confirmDelete="deleteSubcategoryHandler" />

        <v-row>
          <v-col cols="12">
            <v-card v-if="!subcategoriesSelect.length" class="py-4 px-6">
              <p class="text-subtitle-1 text-center mb-0">No subcategories here yet</p>
            </v-card>
            <v-card v-else class="pt-4 pb-6 px-6">
              <v-simple-table>
                <tbody>
                  <tr v-for="(subcategory) in subcategoriesSelect" :key="subcategory._id">
                    <td class="d-flex justify-between px-0">
                      <v-text-field
                        class="text-subtitle-1"
                        :value="subcategory.name"
                        @input="newSubcatName"
                        :disabled="subcategory._id !== onchangeId"
                      />
                      <v-btn v-if="subcategory._id === onchangeId" icon class="mt-2" @click="changeSubcategoryName(subcategory.name)">
                        <v-icon>$done</v-icon>
                      </v-btn>
                      <v-btn v-else icon class="mt-2" @click="edit(subcategory._id)">
                        <v-icon>$edit</v-icon>
                      </v-btn>
                      <v-btn v-if="subcategory._id === onchangeId" icon class="mt-2" @click="cancelChangeSubcategoryName(subcategory.name, subcategory._id)">
                        <v-icon>$cancel</v-icon>
                      </v-btn>
                      <v-btn v-else icon class="mt-2" @click="removeSubcat(subcategory._id)">
                        <v-icon>$delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'categories',
  components: {
    AddSubcategory: () => import('@/components/inputs/AddSubcategory.vue'),
    confirmDelete: () => import('@/components/popups/confirmDelete.vue')
  },
  data() {
    return {
      open: false,
      showDialog: false,
      title: 'subcategory',
      onchangeId: '',
      deleteId: '',
      newSubcategoryName: '',
    };
  },
  computed: {
    ...mapState('categories', [
      'isPageLoading',
      'categories',
      'activeCategory',
    ]),
    subcategoriesSelect() {
      if (!this.activeCategory) return '';
      return [ ...this.activeCategory.subcategories];
    },
    selectedCategory() {
      if (!this.activeCategory) return '';
      return this.activeCategory._id;
    },
  },

  methods: {
    selectCategory(categoryId) {
      this.$store.dispatch('categories/SET_CATEGORY', {
        categoryId,
      });
    },
    removeSubcat(id) {
      this.deleteId = id;
      this.showDialog = true;
    },
    edit(id) {
      this.onchangeId = id;
    },
    newSubcatName(value){
      this.newSubcategoryName = value;
    },
    async changeSubcategoryName(name) {
      if (this.newSubcategoryName.trim() && this.newSubcategoryName !== name) {
        this.$store.dispatch('categories/CHANGE_SUBCATOGORY_NAME', { id: this.onchangeId, name: this.newSubcategoryName });
      } else {
        this.newSubcategoryName = name;
      }
      this.onchangeId = '';
    },
    async deleteSubcategoryHandler() {
      this.$store.dispatch('categories/DELETE_SUBCATOGORY', { id: this.deleteId });
      this.showDialog = false;
    },
    cancelChangeSubcategoryName(name, id) {
      this.newSubcategoryName = name;
      this.onchangeId = '';
      this.activeCategory.subcategories.find((elem) => elem._id === id).name = name
    }
  },

  updated() {
    if (!this.activeCategory) return '';
    return [ ...this.activeCategory.subcategories];
  }
};
</script>

<style></style>
