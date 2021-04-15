<template>
  <v-card width="400" class="ma-4 pa-4 d-flex flex-column align-center delivery-item-card">
    <v-btn v-if="international" large icon class="delete-country-button" color="error" @click="$emit('deleteCountry')">
      <v-icon>mdi-close-circle-outline</v-icon>
    </v-btn>
    <v-img class="ma-4" :src="country.flag" width="150px" height="100px" contain></v-img>
    <h4>{{ country.country }}</h4>
    <p>{{ country.countryCode }}</p>
    <p style="font-size: 18px"><span style="font-size: 20px">$</span>{{ country.price }}</p>
    <v-card-actions>
      <v-btn @click="$emit('changePrice')"> change price </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DeliveryItem',
  props: {
    country: {
      type: Object,
      required: true,
    },
    international: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
};
</script>

<style scoped>
.delivery-item-card {
  position: relative;
}
.delete-country-button {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>