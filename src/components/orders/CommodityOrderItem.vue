<template>
  <v-row>
    <v-col cols="12" md="4">
      <Section1 :commodities="commodities" :delivery="delivery" />
    </v-col>
    <v-col cols="12" md="4">
      <Section2 :paymentInfo="order.paymentInfo" :userInfo="order.user" />
    </v-col>
    <v-col cols="12" md="4">
      <Section3 :status="order.status" :statusHistory="order.statusHistory" @changeStatus="changeStatus" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CommodityOrderItem',
  props: {
    order: {
      type: Object,
      requaired: true,
    },
  },
  components: {
    Section1: () => import('@/components/orders/Section1.vue'),
    Section2: () => import('@/components/orders/Section2.vue'),
    Section3: () => import('@/components/orders/Section3.vue'),
  },
  data() {
    return {};
  },
  computed: {
    commodities() {
      return this.order.cart.slice(0, this.order.cart.length - 1);
    },
    delivery() {
      return this.order.cart[this.order.cart.length - 1];
    },
  },
  methods: {
    changeStatus(data) {
      const history = [...this.order.statusHistory];
      history.push({ status: data.status, date: `${Date.now()}` });
      data.statusHistory = history
      const payload = {
        id: this.order._id,
        object: data,
      };
      this.$emit('changeStatus', payload);
    },
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.commodities-info {
  & th,
  td {
    padding: 5px;
    text-align: center;
  }
}
</style>
