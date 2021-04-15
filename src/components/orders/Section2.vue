<template>
  <v-card flat class="transparent">
    <h4 class="text-center py-4">Payment information</h4>
    <table class="payment-info mb-4">
      <tr>
        <th>User Name</th>
        <td class="text-start">{{ paymentInfo.userName }}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td class="text-start">{{ paymentInfo.email }}</td>
      </tr>
      <tr>
        <th>Phone number</th>
        <td>{{ paymentInfo.phoneNumber }}</td>
      </tr>
      <tr>
        <th>Delivery address</th>
        <td>{{ paymentInfo.deliveryAddress }}</td>
      </tr>
    </table>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> <h4>User information</h4> </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table class="payment-info">
            <tr>
              <th>First name</th>
              <td class="text-start">{{ userInfo.firstName }}</td>
            </tr>
            <tr>
              <th>Last name</th>
              <td class="text-start">{{ userInfo.lastName }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td class="text-start">{{ userInfo.email }}</td>
            </tr>
            <tr>
              <th>Phone number</th>
              <td>{{ userInfo.phone }}</td>
            </tr>
            <tr>
              <th>Delivery address</th>
              <td>{{ userInfo.deliveryAddress }}</td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  name: 'Section2',
  props: {
    paymentInfo: {
      type: Object,
      requaired: true,
    },
    userInfo: {
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
.payment-info {
  border: 1px solid var(--v-deliverySectionBorder-base);
  width: 100%;
  & th,
  td {
    padding: 5px;
    text-align: start;
  }
}
</style>
