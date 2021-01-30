<template>
  <v-text-field
    :label="label"
    v-model="localValue"
    :disabled="disabled"
    :rules="[rules.required, rules.limit, rules.noRepeat]"
    outlined
    dark
  />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
     limit: {
      type: Number,
      default: 25,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    noRepeat: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      rules: {
        required: (v) => {
          const a = this.required && !!v;
          const b = !this.required;
          // res = a XOR b
          const res = !(a && b) && (a || b);
          return res || 'Input is required';
        },
        limit : v => v.length <= this.limit || `Max ${this.limit} characters`,
        noRepeat: (value) => (
          !this.noRepeat
            || value !== this.noRepeat
            || 'Text must not match'
        ),
      },
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
  methods: {
    showInput() {
      this.$emit('update:disabled', false);
    },
  },
};
</script>

<style>
</style>
