<template>
  <v-card class="pt-4 pb-6 px-6">
    <v-simple-table>
      <tbody>
        <tr v-for="subcategory in data" :key="subcategory._id">
          <td class="d-flex justify-between px-0">
            <v-text-field
              class="text-subtitle-1"
              v-model="subcategory.name"
              :disabled="subcategory._id !== onchangeId"
            />
            <v-btn
              v-if="subcategory._id === onchangeId"
              icon
              class="mt-2"
              @click="$emit('changeSubcategoryName', subcategory.name.trim())"
            >
              <v-icon>$done</v-icon>
            </v-btn>
            <v-btn v-else icon class="mt-2" :disabled="disabledBtn(subcategory._id)" @click="edit(subcategory._id)">
              <v-icon>$edit</v-icon>
            </v-btn>
            <v-btn
              v-if="subcategory._id === onchangeId"
              icon
              class="mt-2"
              @click="$emit('cancelChangeSubcategoryName', subcategory._id)"
            >
              <v-icon>$cancel</v-icon>
            </v-btn>
            <v-btn
              v-else
              icon
              class="mt-2"
              :disabled="subcategory.amountOfProduct !== 0"
              @click="$emit('removeSubcat', subcategory._id)"
            >
              <v-icon>$delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: 'SubcategoryList',
  props: {
    data: {
      type: Array,
      default: new Array(),
    },
    onchangeId: {
      type: String,
      default: '',
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    disabledBtn(id) {
      if (!this.onchangeId) return false;
      return id !== this.onchangeId;
    },
    edit(id) {
      this.$emit('update:onchangeId', id);
    },
  },
  mounted() {},
};
</script>

<style></style>
