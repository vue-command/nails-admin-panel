<template>
  <v-form class="d-flex">
    <v-text-field
      label="New Category"
      v-model="category"
      dense
      :append-icon="category ? '$done' : ''"
      clearable
      @click:append="EditCategory"
      @click:clear="category = ''"
    />
    <!-- <v-btn icon @click="EditCategory">
      <v-icon>$done</v-icon>
    </v-btn> -->
    <v-btn icon @click="$emit('update:open', false)">
      <v-icon>$cancel</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'EditCategory',
  data: () => ({
    category: '',
  }),
  props: {
    categoryName: {
      type: String,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    categoryName(val) {
      this.category = val;
    },
  },
  methods: {
    EditCategory() {
      if (!this.category) return;
      this.$emit('submit', { name: this.category.trim() });
      this.$emit('update:open', false);
      this.category = '';
    },
  },
  mounted() {
    this.category = this.categoryName;
  },
};
</script>