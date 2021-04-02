<template>
  <v-form class="d-flex">
    <v-text-field
      label="New Category"
      v-model="newCategoryName"
      dense
      :append-icon="newCategoryName ? '$done' : ''"
      clearable
      @click:append="addNewCategory"
      @click:clear="newCategoryName = ''"
    />
    <!-- <v-btn icon @click="addNewCategory">
      <v-icon>$done</v-icon>
    </v-btn> -->
    <v-btn icon large @click="$emit('update:open', false)">
      <v-icon>$cancel</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'AddCategory',
  data: () => ({
    newCategoryName: '',
  }),
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addNewCategory() {
      if (!this.newCategoryName) return;
      this.$emit('submit', { name: this.newCategoryName.trim() });
      this.$emit('update:open', false);
    },
  },
};
</script>