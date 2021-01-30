<template>
  <v-text-field
    ref="number"
    v-model="localValue"
    :label="label"
    :disabled="disabled"
    :rules="[rules.required, rules.onlyDigits, rules.limit, rules.noRepeat]"
    :outlined="outlined"
  />
</template>

<script>
export default {
  name: 'NumberInput',
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
      default: 10,
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
    outlined: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      rules: {
        required: v => {
          const a = this.required && !!v;
          const b = !this.required;
          // res = a XOR b
          const res = !(a && b) && (a || b);
          return res || 'Input is required';
        },
        onlyDigits: v => !/\D/g.test(v) || 'input should consist only of digits',
        limit : v => v.length <= this.limit || `Max ${this.limit} characters`,
        noRepeat: value =>
          !this.noRepeat || value.split(' ').join('') !== this.noRepeat.split(' ').join('') || 'Digits must not match',
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
  watch: {
    noRepeat() {
      this.$refs.number.validate();
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
