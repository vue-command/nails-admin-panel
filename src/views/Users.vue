<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-for="user in users" :key="user._id" class="ma-4">
          <v-card-title>{{ user.firstName + ' ' + user.lastName }}</v-card-title>
          <v-card-text>
            <p>Email: {{ user.email }}</p>
            <p>Phone: {{ user.phone }}</p>
            <p>Delivery address: {{ user.deliveryAddress }}</p>
            <p>Orders count: {{ user.orders.length }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Users',
  components: {
    // Component: () => import('@/components/inputs/Component.vue'),
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('users', ['users']),
  },
  watch: {},
  methods: {
    ...mapActions('users', { getUsers: 'GET_USERS' }),
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
