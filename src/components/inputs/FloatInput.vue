<template>
  <v-text-field
    ref="num"
    type="number"
    v-model.number="localValue"
    :label="label"
    :disabled="disabled"
    :rules="[rules.required, rules.onlyPositive, rules.limit]"
    :outlined="outlined"
  />
</template>

<script>
export default {
  name: 'FloatInput',
  props: {
    value: {
      type: Number,
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
    positive: {
      type: Boolean,
      default: true,
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
        onlyPositive: v => {
          const a = this.positive && v >= 0;
          const b = !this.positive;
          // res = a XOR b
          const res = !(a && b) && (a || b);
          return res || 'only positive';
        },
        limit: v => v <= this.limit || `Max value: ${this.limit}`,
      },
    };
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(val) {
        if (typeof val == 'string') return
        if (Number.isNaN(Number(val))) {
          this.$emit('update:value', 0);
        } else {
          this.$emit('update:value', val);
        }
      },
    },
  },
  watch: {
    noRepeat() {
      this.$refs.num.validate();
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
