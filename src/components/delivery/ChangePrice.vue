<template>
  <v-dialog v-model="localDialog" max-width="400px" class="">
    <v-card class="pa-4 d-flex flex-column align-center deliveryItem">
      <v-img :src="country.flag" width="60" height="40" contain></v-img>
      <h4>{{ country.country }}</h4>
      <p>{{ country.countryCode }}</p>
      <FloatInput :value.sync="price" label="Price" :limit="1000" :required="false" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text large @click="localDialog = false;">Cancel</v-btn>
        <v-btn text large @click="$emit('changePrice', price)">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FloatInput from '@/components/inputs/FloatInput.vue'

export default {
  name: 'ChangePrice',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    country: {
      type: Object,
      required: true,
    },
  },
  components:{
    FloatInput
  },
  data() {
    return {
      price: 0
    }
  },
  computed: {
    localDialog: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.$emit('update:dialog', val);
      },
    },
  },
  methods: {},
  mounted() {
    this.price = this.country.price
  }
};
</script>
