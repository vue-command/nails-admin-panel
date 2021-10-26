<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="data"
      multi-sort
      :sort-by="['createdAt']"
      :sort-desc="[true]"
      show-expand
      :search="search"
      single-expand
      item-key="numberOfOrder"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="pa-4">
          <CommodityOrderItem :order="item" @changeStatus="patchCommodityOrder" />
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { formatDate } from '@/helpers/formatDate'

export default {
  name: 'CommodityOrders',
  components: {
    CommodityOrderItem: () => import('@/components/orders/CommodityOrderItem.vue'),
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'Date', value: 'createdAt' },
        { text: 'Price ($)', value: 'totalPrice' },
        { text: 'User name', value: 'userName' },
        { text: 'Status', value: 'status' },
        { text: 'Delivery type', value: 'deliveryType' },
        { text: 'Number of order', value: 'numberOfOrder', sortable: false },
        { text: 'Tracking number', value: 'trackingNumber', sortable: false },
        { text: '', value: 'data-table-expand' },
      ],
    };
  },
  computed: {
    ...mapState('orders', ['commodityOrders']),
    ...mapState('users', ['users']),
    data() {
      return this.commodityOrders.map(order =>
        Object.assign(
          {
            totalPrice: order.cart.reduce((total, item) => total + item.price * (item.purchasedAmount ?? 1), 0),
            userName: order.paymentInfo.userName,
            deliveryType: order.paymentInfo.deliveryType.type,
          },
          order
        )
      );
    },
  },
  methods: {
    ...mapActions('orders', { getOrders: 'GET_ORDERS', patchCommodityOrder: 'PATCH_COMMODITY_ORDER' }),
    formatDate
  },
  mounted() {
    this.getOrders('commodity');
  },
};
</script>
