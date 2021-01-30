<template>
  <v-file-input
    :label="label"
    v-model="localValue"
    :disabled="disabled"
    :rules="[rules.required, rules.size]"
    :prepend-icon="icon"
    :show-size="1000"
    :accept="accept"
    :hide-input="hideInput"
    :outlined="outlined"
  />
</template>

<script>
export default {
  name: 'FileInput',
  props: {
    value: {
      type: File,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 1000,
    },
    accept: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    hideInput: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
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
        size: v => !v || v?.size < this.size * 1000 || `File size should be less than ${this.fileSize}`,
      },
    };
  },
  computed: {
     fileSize() {
      const arr = ['KB', 'MB', 'GB', 'TB'];
      let size = this.size;
      let index = 0;
      while (size >= 1000 && index < arr.length - 1) {
        size /= 1000;
        index += 1;
      }
      return `${size}${arr[index]}`;
    },
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
