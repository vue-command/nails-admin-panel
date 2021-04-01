<template>
  <v-card flat class="transparent">
    <h4 class="text-center py-4">Product purchased information</h4>
    <table class="commodities-info">
      <tr>
        <th>Brand</th>
        <th>Commofity name</th>
        <th>Amount</th>
        <th>Price</th>
      </tr>
      <tr v-for="item in commodities" :key="item._id">
        <td class="text-start">{{ item.brand }}</td>
        <td class="text-start">{{ item.name }}</td>
        <td>{{ item.purchasedAmount }}</td>
        <td>{{ item.price }}</td>
      </tr>
    </table>
    <h4 class="text-center py-4">Delivery information</h4>
    <table v-if="delivery.type === 'pickup'" class="delivery-info">
      <tr>
        <th>type</th>
        <th>Price</th>
      </tr>
      <tr>
        <td>{{ delivery.type }}</td>
        <td>{{ delivery.price }}</td>
      </tr>
    </table>

    <table v-if="delivery.type === 'express' || delivery.type === 'standard'" class="delivery-info">
      <tr>
        <th>type</th>
        <th>Price</th>
      </tr>
      <tr>
        <td>{{ delivery.type }}</td>
        <td>{{ delivery.price }}</td>
      </tr>
    </table>

    <table v-if="delivery.type === 'international'" class="delivery-info">
      <tr>
        <th>type</th>
        <th>Country</th>
        <th>Price</th>
      </tr>
      <tr>
        <td>{{ delivery.type }}</td>
        <td>{{ delivery.country }}</td>
        <td>{{ delivery.price }}</td>
      </tr>
    </table>
    <v-card-text flat class="pickup-info text-center">
      <h4 class="text-uppercase font-weight-black">Total cost : {{ totalCost }}</h4>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Section1',
  props: {
    commodities: {
      type: Array,
      requaired: true,
    },
    delivery: {
      type: Object,
      requaired: true,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    totalCost() {
      return this.commodities.reduce((acc, curr) => acc + curr.price * curr.purchasedAmount, 0) + this.delivery.price;
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped lang="scss">
.commodities-info,
.delivery-info {
  border: 1px solid #000;
}
.commodities-info,
.delivery-info {
  width: 100%;
  & th,
  td {
    padding: 5px;
    text-align: center;
  }
}
</style>
