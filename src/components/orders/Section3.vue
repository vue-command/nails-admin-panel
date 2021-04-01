<template>
  <v-card flat class="transparent">
    <v-card-title>Current status: {{ status }}</v-card-title>
    <v-select v-model="select" :items="items" item-text="text" item-value="value" label="Change status" outlined dense>
    </v-select>
    <v-text-field v-if="select === 'sent'" v-model="trackingNumber" label="Tracking Number" outlined dense />
    <v-card-actions class="justify-center">
      <v-btn @click="select = ''">cancel</v-btn>
      <v-btn :disabled="!validationSubmit" @click="submit">submit</v-btn>
    </v-card-actions>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> <h4>status history</h4> </v-expansion-panel-header>
        <v-expansion-panel-content>
          <table class="status-history">
            <tr>
              <th>Status</th>
              <th>Date</th>
            </tr>
            <tr v-for="item in statusHistory" :key="item.date">
              <td>{{ item.status }}</td>
              <td>{{ formatDate(item.date) }}</td>
            </tr>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  name: 'Section3',
  props: {
    status: {
      type: String,
      requaired: true,
    },
    statusHistory: {
      type: Array,
      requaired: true,
    },
  },
  components: {},
  data() {
    return {
      select: '',
      trackingNumber: '',
      items: [
        { text: 'Processed', value: 'processed' },
        { text: 'Sent', value: 'sent' },
        { text: 'Delivered', value: 'delivered' },
      ],
    };
  },
  computed: {
    validationSubmit() {
      if (this.select === 'sent') return this.trackingNumber;
      if (this.select) return true;
      return false;
    },
  },
  methods: {
    submit() {
      const data = {
        status: this.select,
      };
      if (this.trackingNumber) data.trackingNumber = this.trackingNumber;
      this.$emit('changeStatus', data);
    },
    formatDate(dateStr) {
      const date = new Date(Number(dateStr));
      return date.toLocaleDateString();
    },
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.status-history {
  width: 100%;
  & th,
  td {
    padding: 5px;
    text-align: center;
  }
}
</style>
