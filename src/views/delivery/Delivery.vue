<template>
  <v-container>
    <v-card flat class="mb-16">
      <v-card-actions class="justify-center">
        <v-btn @click="type = 'standard'" :class="{ active: type === 'standard' }">Standard</v-btn>
        <v-btn @click="type = 'express'" :class="{ active: type === 'express' }" class="mx-12">Express</v-btn>
        <v-btn @click="type = 'international'" :class="{ active: type === 'international' }" class="ml-0"
          >International</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-card flat v-if="type === 'standard' && standard" class="d-flex flex-column align-center">
      <h2>Standard delivery</h2>
      <DeliveryItem :country="standard" @changePrice="changePriceId = standard._id" />
    </v-card>

    <v-card flat v-if="type === 'express' && express" class="d-flex flex-column align-center">
      <h2>Express delivery</h2>
      <DeliveryItem :country="express" @changePrice="changePriceId = express._id" />
    </v-card>

    <v-card flat v-if="type === 'international'" class="d-flex flex-column align-center">
      <h2>International delivery</h2>
      <v-card-actions class="my-8">
        <v-btn @click="addCountryDialog = true">Add country</v-btn>
      </v-card-actions>
      <TextInput :value.sync="filterStr" innerIcon="mdi-magnify" />
      <v-card flat class="d-flex justify-center flex-wrap">
        <DeliveryItem
          v-for="country in filteredInternationals"
          :key="country._id"
          :country="country"
          international
          @changePrice="changePriceId = country._id"
          @deleteCountry="deleteCountry(country._id)"
        />
      </v-card>
    </v-card>

    <ChangePrice v-if="currentObj" :dialog.sync="changePriceDialog" :country="currentObj" @changePrice="changePrice" />

    <AddCountry :dialog.sync="addCountryDialog" :countries="countries" @addCountry="addCountry" />
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import DeliveryItem from '@/components/delivery/DeliveryItem.vue';
import TextInput from '@/components/inputs/TextInput.vue';

export default {
  name: 'Delivery',
  components: {
    DeliveryItem,
    TextInput,
    ChangePrice: () => import('@/components/delivery/ChangePrice.vue'),
    AddCountry: () => import('@/components/delivery/AddCountry.vue'),
  },
  data: () => ({
    changePriceDialog: false,
    addCountryDialog: false,
    changePriceId: '',
    filterStr: '',
    type: 'international',
  }),
  computed: {
    ...mapState(['loading']),
    ...mapState('delivery', ['prices']),
    ...mapGetters('delivery', ['countries', 'express', 'standard', 'internationals']),
    isCountries() {
      return this?.countries?.length;
    },
    currentObj() {
      return this.prices.find(item => item._id === this.changePriceId);
    },
    filteredInternationals() {
      return this.internationals.filter(country =>
        country.country.toLowerCase().includes(this.filterStr.toLowerCase())
      );
    },
  },
  watch: {
    changePriceId(val) {
      if (!val) return;
      this.changePriceDialog = true;
    },
    changePriceDialog(val) {
      if (!val) this.changePriceId = '';
    },
  },
  methods: {
    ...mapActions('delivery', {
      getCountries: 'GET_COUNTRIES',
      updateCountryPrice: 'UPDATE_COUNTRY_PRICE',
    }),
    deleteCountry(id) {
      this.updateCountryPrice({ id, price: 0 });
      this.changePriceDialog = false;
    },
    changePrice(price) {
      this.updateCountryPrice({ id: this.changePriceId, price });
      this.changePriceDialog = false;
    },
    addCountry({ id, price }) {
      this.updateCountryPrice({ id, price });
      this.addCountryDialog = false;
    },
  },
  mounted() {
    this.getCountries();
  },
};
</script>
<style scoped>
.active {
  background-color: var(--v-orange-base) !important;
}
</style>
