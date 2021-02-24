<template>
  <v-row>
    <v-col cols="12">
      <v-card class="mb-8">
        <v-form class="d-flex justify-between align-center px-6 py-2">
          <v-text-field
            label="New Subcategory"
            class="text-subtitle-1"
            v-model="newSubcategoryName"
          >
          </v-text-field>
          <v-btn icon @click="addNewSubcategory">
            <v-icon>$done</v-icon>
          </v-btn>
          <v-btn icon @click="$emit('update:open', false)">
            <v-icon>$cancel</v-icon>
          </v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data:() => ({
    newSubcategoryName: ''
  }),
  props: {
    open: Boolean,
    activeCategory: Object,
  },
  methods: {
    addNewSubcategory() {
      if (this.newSubcategoryName.trim()) {
        this.addSubcategory(this.newSubcategoryName, this.activeCategory._id);
      }
      this.$emit('update:open', false);
    },
    async addSubcategory(name, activeCategoryId) {
      this.$store.dispatch('categories/CREATE_NEW_SUBCATEGORY', {
        name: name,
        id: activeCategoryId,
      });
    },
  },
}
</script>