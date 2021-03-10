<template>
  <v-card width="400" class="ma-4 pa-4 d-flex flex-column align-center deliveryItem">
    <v-img :src="country.flag" width="150px" height="100px" contain></v-img>
    <h4>{{country.country}}</h4>
    <p>{{country.countryCode}}</p>
    <p style="font-size:18px;"><span style="font-size:20px;">$</span>{{country.price}}</p>
    <v-card-actions>
      <v-btn @click="$emit('changePrice')">
        change price
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DeliveryItem',
  props: {
    country: {
      type: Object,
      required: true 
    }
  }

}
</script>

<style>

</style>