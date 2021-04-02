<template>
  <v-form class="d-flex">
    <v-text-field
      label="New Subcategory"
      v-model="newSubcategoryName"
      dense
      :append-icon="newSubcategoryName ? '$done' : ''"
      clearable
      @click:append="addNewSubcategory"
      @click:clear="newSubcategoryName = ''"
    />
    <!-- <v-btn icon @click="addNewSubcategory">
      <v-icon>$done</v-icon>
    </v-btn> -->
    <v-btn icon @click="$emit('update:open', false)">
      <v-icon>$cancel</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'AddSubcategory',
  data: () => ({
    newSubcategoryName: '',
  }),
  props: {
    open: Boolean,
    activeCategory: Object,
  },
  methods: {
    addNewSubcategory() {
      this.$emit('submit', {
        name: this.newSubcategoryName.trim(),
        id: this.activeCategory._id,
      });
      this.$emit('update:open', false);
    },
  },
};
</script>