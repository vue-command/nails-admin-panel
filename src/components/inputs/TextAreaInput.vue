<template>
  <v-textarea
    :label="label"
    v-model.trim="localValue"
    :disabled="disabled"
    :rules="[rules.required]"
    outlined
    rows="8"
    dark
    no-resize
  />
</template>

<script>
export default {
  name: 'TextAreaInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
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
  },
};
</script>

<style>
</style>
