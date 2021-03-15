<template>
  <v-container>
    <v-row class="">
      <v-col cols="12" class="">
        <v-select v-model="type" :items="types" label="Type" outlined></v-select>
        <OnlineOrders v-if="type === 'online'" :data="extendOnlineOrders" />
        <OfflineOrders v-if="type === 'offline'" :data="offlineOrders" />
        <CommodityOrders v-if="type === 'commodity'" :data="commodityOrders" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Orders',
  components: {
    OnlineOrders: () => import('@/components/orders/OnlineOrders.vue'),
    OfflineOrders: () => import('@/components/orders/OfflineOrders.vue'),
    CommodityOrders: () => import('@/components/orders/CommodityOrders.vue'),
  },
  data() {
    return {
      type: 'commodity',
      types: ['commodity', 'online', 'offline'],
    };
  },
  computed: {
    ...mapState('orders', ['onlineOrders', 'offlineOrders', 'commodityOrders']),
    ...mapState('users', ['users']),
    extendOnlineOrders() {
      return this.onlineOrders.map(order =>
        Object.assign(order, { user: this.users.find(user => user._id === order.idUser) ?? {} })
      );
    },
  },
  watch: {
    type(type) {
      this.getOrders(type);
    },
  },
  methods: {
    ...mapActions('orders', { getOrders: 'GET_ORDERS' }),
  },
  mounted() {
    this.getOrders(this.type);
  },
};
</script>

<style></style>
