<template>
  <v-data-table
    item-key="name"
    class="elevation-1"
    :loading="true"
    loading-text="Loading... Please wait"
  ></v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CommodityOrders',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('orders', ['commodityOrders']),
    ...mapState('users', ['users']),
  },
  methods: {
    ...mapActions('orders', { getOrders: 'GET_ORDERS' }),
  },
  mounted() {
    this.getOrders('commodity');
  },
};
</script>
