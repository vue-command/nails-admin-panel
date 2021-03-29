<template>
  <v-data-table
    item-key="name"
    class="elevation-1"
    loading
    loading-text="Loading... Please wait"
  ></v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'OfflineOrders',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('orders', ['offlineOrders']),
    ...mapState('users', ['users']),
    extendOnlineOrders() {
      return this.onlineOrders.map(order =>
        Object.assign(order, { user: this.users.find(user => user._id === order.idUser) ?? {} })
      );
    },
  },
  methods: {
    ...mapActions('orders', { getOrders: 'GET_ORDERS' }),
  },
  mounted() {
    this.getOrders('offline');
  },
};
</script>
