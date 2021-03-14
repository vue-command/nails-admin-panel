<template>
  <v-dialog v-model="localDialog" max-width="480px" height="0.8vh">
    <v-card flat class="pa-4">
      <TextInput :value.sync="filterStr" innerIcon="mdi-magnify" />

      <v-card flat height="600">
        <v-card flat style="overflow: scroll" class="" outlined height="350">
          <v-card
            v-for="country in filteredCountries"
            :key="country._id"
            class="ma-4 pa-4 d-flex"
            @click="selectId = country._id"
          >
            <v-card-actions>
              <v-img :src="country.flag" width="60" height="40" contain></v-img>
              <v-spacer />
              <h4 class="pl-8">{{ country.country }}</h4>
            </v-card-actions>
          </v-card>
        </v-card>

        <v-card v-if="currentCountry" class="ma-4 pa-4 d-flex flex-column align-center deliveryItem">
          <v-img :src="currentCountry.flag" width="60" height="40" contain></v-img>
          <h4>{{ currentCountry.country }}</h4>
          <p>{{ currentCountry.countryCode }}</p>
          <v-form ref="form">
            <FloatInput :value.sync="price" label="Price" :limit="1000" :required="true" />
          </v-form>
        </v-card>
      </v-card>

      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text large @click="localDialog = false">Cancel</v-btn>
          <v-btn :disabled="!price" text large @click="addCountry">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import FloatInput from '@/components/inputs/FloatInput.vue';
import TextInput from '@/components/inputs/TextInput.vue';

export default {
  name: 'AddCountry',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    countries: {
      type: Array,
      required: true,
    },
  },
  components: {
    FloatInput,
    TextInput,
  },
  data() {
    return {
      price: 0,
      filterStr: '',
      selectId: '',
    };
  },
  computed: {
    localDialog: {
      get() {
        return this.dialog;
      },
      set(val) {
        this.$emit('update:dialog', val);
      },
    },
    filteredCountries() {
      return this.countries.filter(country => country.country.toLowerCase().includes(this.filterStr.toLowerCase()));
    },
    currentCountry() {
      return this.countries.find(country => country._id === this.selectId);
    },
  },
  watch: {
    localDialog() {
      this.filterStr = '';
    },
  },
  methods: {
    addCountry() {
      if (!this.$refs.form.validate()) return;
      this.$emit('addCountry', { id: this.selectId, price: this.price });
    },
  },
  mounted() {},
};
</script>
