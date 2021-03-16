<template>
  <v-container>
    <v-data-iterator
      :items="users"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      item-key="_id"
      :search="search"
      :single-expand="true"
      :sort-by="sortBy.prop"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="orange darken-3" class="my-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>

          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>

            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
              :hint="`${keys.text}, ${keys.prop}`"
              item-text="text"
              item-value="prop"
              persistent-hint
              return-object
              single-line
            ></v-select>

            <v-spacer></v-spacer>

            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="orange" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>

              <v-btn large depressed color="orange" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items, isExpanded, expand }">
        <v-card v-for="user in items" :key="user._id" class="my-4" @click="v => expand(user, !isExpanded(user))">
          <v-card-title>
            <v-row v-if="$vuetify.breakpoint.xs">
              <v-col cols="12" xs="12">
                <h5 class="users_delivery-address-hiden">
                  {{ user.firstName + ' ' + user.lastName }}
                </h5>
              </v-col>
            </v-row>

            <v-row v-else>
              <v-col cols="12" sm="4" md="3">
                <h5 class="users_delivery-address-hiden">
                  {{ user.firstName + ' ' + user.lastName }}
                </h5>
              </v-col>
              <v-col cols="12" sm="8" md="9">
                <h5 class="users_delivery-address-hiden">
                  <span v-if="$vuetify.breakpoint.mdAndUp" style="font-weight: normal">Delivery address: </span
                  >{{ user.deliveryAddress.length ? user.deliveryAddress : 'address not specified' }}
                </h5>
              </v-col>
            </v-row>
          </v-card-title>

          <v-divider></v-divider>

          <v-list v-if="isExpanded(user)" dense>
            <v-list-item v-for="row in userRows(user)" :key="row.text">
              <v-row>
                <v-col cols="12" sm="4" md="3">
                  <v-list-item-content>{{ row.text }}</v-list-item-content>
                </v-col>

                <v-col cols="12" sm="8" md="9">
                  <v-list-item-content>
                    {{ row.value }}
                  </v-list-item-content>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>
      </template>

      <template v-slot:footer>
        <v-row class="mx-0 my-4" align="center" justify="center">
          <span class="grey--text">Users per page</span>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text"> Page {{ page }} of {{ numberOfPages }} </span>

          <v-btn dark color="orange darken-3" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn dark color="orange darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Users',
  components: {},
  data() {
    return {
      itemsPerPage: 5,
      itemsPerPageArray: [5, 10, 15],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      sortBy: { text: 'First name', prop: 'firstName' },
      keys: [
        { text: 'First name', prop: 'firstName' },
        { text: 'Last name', prop: 'lastName' },
        { text: 'Phone', prop: 'phone' },
        { text: 'Email', prop: 'email' },
        { text: 'Delivery address', prop: 'deliveryAddress' },
      ],
    };
  },
  computed: {
    ...mapState('users', ['users']),
    numberOfPages() {
      return Math.ceil(this.users.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name');
    },
    breakpointSm() {
      return this.$vuetify.breakpoint.sm;
    },
  },
  watch: {},
  methods: {
    ...mapActions('users', { getUsers: 'GET_USERS' }),
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    userRows(user) {
      return [
        {
          text: 'Email:',
          value: user.email,
        },
        {
          text: 'Phone:',
          value: user.phone,
        },
        {
          text: 'Delivery address:',
          value: user.deliveryAddress.length ? user.deliveryAddress : 'address not specified',
        },
        {
          text: 'Orders count:',
          value: user.orders.length,
        },
      ];
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style>
.users_delivery-address-hiden {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
