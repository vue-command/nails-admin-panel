<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="extendOfflineOrders"
      multi-sort
      :sort-by="['formatDate']"
      :sort-desc="[true]"
      show-expand
      single-expand
      :search="search"
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
          <CourseOrderItem :order="item" />
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { datesToString } from '@/helpers/datesToString';

export default {
  name: 'OfflineOrders',
  components: {
    CourseOrderItem: () => import('@/components/orders/CourseOrderItem.vue'),
  },
  data() {
    return {
      search: '',
      headers: [
        { text: 'Date', value: 'createdAt' },
        { text: 'Name of course', value: 'nameOfCourse' },
        { text: 'Purchased date', value: 'purchasedDate' },
        { text: 'Price ($)', value: 'price' },
        { text: 'User name', value: 'userName' },
        { text: 'Status', value: 'status' },
        { text: 'Number of order', value: 'numberOfOrder', sortable: false },
        { text: '', value: 'data-table-expand' },
      ],
    };
  },
  computed: {
    ...mapState('orders', ['offlineOrders']),
    ...mapState('users', ['users']),
    extendOfflineOrders() {
      return this.offlineOrders.map(order =>
        Object.assign(
          {
            user: this.users.find(user => user._id === order.paymentInfo.userId) ?? {},
            userName: order.paymentInfo.userName,
            nameOfCourse: order.product[0].product.nameOfCourse,
            price: order.product[0].product.price,
            purchasedDate: this.dateOfCourses(
              order.product[0].product.dateOfCourses.find(item => item.vendorCode === order.product[0].vendorCode)
            ),
          },
          order
        )
      );
    },
  },
  methods: {
    ...mapActions('orders', { getOrders: 'GET_ORDERS' }),

    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
    dateOfCourses({ date }) {
      return datesToString(JSON.parse(date));
    },
  },
  mounted() {
    this.getOrders('offline');
  },
};
</script>
