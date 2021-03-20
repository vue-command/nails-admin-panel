<template>
  <v-row>
    <v-col cols="1">
      <v-dialog v-model="dialog" max-width="290" class="pa-4">
        <template v-slot:activator="{ on, attrs }">
          <v-btn large icon v-bind="attrs" v-on="on"> <v-icon>mdi-calendar</v-icon></v-btn>
        </template>
        <v-card flat>
          <v-date-picker v-model="dates" multiple></v-date-picker>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-col cols="9">
      <TextInput label="Date" :value="formatedDate" :required="true" :readonly="true" :limit="100" />
    </v-col>
    <v-col cols="2">
      <NumberInput :label="label" :value.sync="spots" :limit="limit" :required="true" />
    </v-col>
  </v-row>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';

import NumberInput from '@/components/inputs/NumberInput.vue';
import { datesToString } from '@/helpers/datesToString';

export default {
  name: 'DateCourseInput',
  props: {
    value: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    limit: {
      type: Number,
      default: 3,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TextInput,
    NumberInput,
  },
  data() {
    return {
      dialog: false,
      dates: [],
      spots: '',
      ready: false,
    };
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update:value', val);
      },
    },
    formatedDate() {
      return datesToString(this.dates);
    },
  },
  watch: {
    spots() {
      this.send();
    },
    dates() {
      this.send();
    },
    value(newVal, oldVal) {
      if (newVal.date.lenght === oldVal.date.lenght || newVal.availableSpots === oldVal.availableSpots) return;
      this.fillingFields();
    },
  },
  methods: {
    validate() {
      console.log('text validare');
    },
    send() {
      if (!this.ready) return;
      this.localValue = {
        date: JSON.stringify(this.dates),
        availableSpots: this.spots,
      };
    },
    fillingFields() {
      let dates = [];
      try {
        dates = JSON.parse(this.value.date);
      } catch(e) {
        // console.error(e.message);
      }
      if (!Array.isArray(dates)) dates = [];
      this.dates = dates;
      this.spots = this.value.availableSpots;
      setTimeout(() => (this.ready = true), 500);
    },
  },
  mounted() {
    setTimeout(this.fillingFields, 500);
  },
};
</script>

<style></style>
