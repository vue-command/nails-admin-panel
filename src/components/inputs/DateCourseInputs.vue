<template>
  <div>
    <p>{{ label }}</p>
    <div v-for="(textField, i) in localValue" :key="i" class="d-flex input-container">
      <DateCourseInput label="Available of spots" :value.sync="localValue[i]" :limit="3" :required="true" />
      <v-btn icon large @click="removeField(i)" v-if="localValue.length > 1">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
    <div v-if="localValue.length < 5" class="d-flex justify-end mb-8">
      <v-btn large icon @click="addField">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import DateCourseInput from '@/components/inputs/DateCourseInput.vue';

export default {
  name: 'DateCourseInputs',
  props: {
    value: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  components: {
    DateCourseInput,
  },
  data() {
    return {};
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
  },
  watch: {},
  methods: {
    addField() {
      this.localValue.push({
        date: '',
        availableSpots: '',
      });
    },
    removeField(index) {
      this.localValue.splice(index, 1);
    },
  },
};
</script>

<style></style>
