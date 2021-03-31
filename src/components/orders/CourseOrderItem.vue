<template>
  <v-row>
    <v-col cols="12" md="5">
      <h3 class="text-center pa-4">Payment info</h3>
      <table class="payment-info">
        <tr>
          <th>User Name</th>
          <th>Email</th>
          <th>Phone number</th>
        </tr>
        <tr>
          <td>{{ order.paymentInfo.userName }}</td>
          <td>{{ order.paymentInfo.email }}</td>
          <td>{{ order.paymentInfo.phoneNumber }}</td>
        </tr>
      </table>
    </v-col>
    <v-col cols="12" md="7">
      <h3 class="text-center pa-4">User info</h3>
      <table class="user-info">
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Delivery address</th>
        </tr>
        <tr>
          <td>{{ order.user.firstName }}</td>
          <td>{{ order.user.lastName }}</td>
          <td>{{ order.user.email }}</td>
          <td>{{ order.user.phone }}</td>
          <td>{{ order.user.deliveryAddress }}</td>
        </tr>
      </table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'OnlineOrderItem',
  props: {
    order: {
      type: Object,
      requaired: true,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>
<style scoped lang="scss">
.user-info,
.payment-info {
  width: 100%;
  border: 1px solid #000;
  & th,
  td {
    padding: 5px;
    text-align: center;
  }
}
</style>
