<template>
  <v-container fluid>
    <v-card flat class="mb-8">
      <v-card-actions class="justify-center">
        <v-btn @click="type = 'commodity'" :class="{ active: type === 'commodity' }">Commodity</v-btn>
        <v-btn @click="type = 'online'" :class="{ active: type === 'online' }" class="mx-12">Online</v-btn>
        <v-btn @click="type = 'offline'" :class="{ active: type === 'offline' }" class="ml-0">Offline</v-btn>
      </v-card-actions>
    </v-card>

    <CommodityOrders v-if="type === 'commodity'" />
    <OnlineOrders v-if="type === 'online'" />
    <OfflineOrders v-if="type === 'offline'" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

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
  watch: {},
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.active {
  background-color: var(--v-orange-base) !important;
}
</style>
