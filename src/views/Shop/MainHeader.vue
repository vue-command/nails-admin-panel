<template>
  <v-row>
    <v-col cols="12">
      <h1>Shop management</h1>
    </v-col>

    <v-row>
      <v-col cols="12" lg="6">
        <v-select
          :items="categories"
          item-text="name"
          item-value="_id"
          label="Category"
          @change="selectCategory"
          class="mx-20"
        >
          Choose category
        </v-select>
      </v-col>
      <v-col cols="12" lg="6" justify="center" align="center">
        <v-btn v-on:click.native="modifyHandler('new')">ADD NEW COMMODITY</v-btn>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" lg="4">
          <v-text-field v-model="newCategoryName" label="New category" outlined></v-text-field>
        </v-col>
        <v-col cols="12" lg="4" justify="center" align="center"><v-btn :disabled='!newCategoryName'>ADD NEW CATEGORY</v-btn></v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      newCategoryName: '',
    };
  },
  name: 'MainHeader',
  props: ['modifyHandler', 'selectCategory', 'categories'],
};
</script>
