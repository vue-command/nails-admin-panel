<template>
  <div>
    <p>{{ label }}</p>
    <div
      v-for="(textField, i) in localValue"
      :key="i"
      class="d-flex input-container"
    >
      <TextInput
        label="Date"
        :value.sync="localValue[i].date"
        :required="true"
      />
      <TextInput
        label="Available of spots"
        :value.sync="localValue[i].availableSpots"
        :required="true"
      />
      <v-btn @click="removeField(i)" v-if="localValue.length > 1" class="remove">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-end mb-8">
      <v-btn @click="addField" v-if="localValue.length < 5">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';

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
    TextInput,
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
  watch: {
  },
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

<style>
</style>
