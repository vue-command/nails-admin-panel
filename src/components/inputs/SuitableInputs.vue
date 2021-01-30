<template>
  <div>
    <div
      v-for="(textField, i) in localValue"
      :key="i"
      class="d-flex input-container"
    >
      <TextInput
        :label="label"
        :value.sync="localValue[i]"
        :required="required"
        :limit="limit"
        :outlined="outlined"
      />
      <v-btn @click="removeField(i)" v-if="localValue.length > 1" class="remove">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
    <div  v-if="localValue.length < 5" class="d-flex justify-end mb-8">
      <v-btn @click="addField">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';

export default {
  name: 'SuitableInputs',
  props: {
    value: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    limit: {
      type: Number,
      required: true
    },
    required: {
      type: Boolean,
      required: true
    },
    outlined: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    TextInput,
  },
  data() {
    return {
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
  },
  watch: {
    // noRepeat (val) {
    //   this.$refs.number.validate()
    // }
  },
  methods: {
    addField() {
      this.localValue.push('');
    },
    removeField(index) {
      this.localValue.splice(index, 1);
    },
  },
};
</script>

<style>
</style>
