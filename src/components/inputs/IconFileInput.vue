<template>
  <v-tooltip top :color="colorText">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="attrs"
        icon
        :color="colorIcon"
        :disabled="disabled"
        @click="$refs['file-input'].$children[0].$el.click()"
      >
        <v-icon large> {{ icon }} </v-icon>
      </v-btn>

      <v-file-input
        v-on="on"
        v-bind="attrs"
        ref="file-input"
        class="d-none"
        v-model="localValue"
        :rules="[rules.required, rules.size]"
        :show-size="1000"
        :accept="accept"
      />
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'IconFileInput',
  props: {
    value: {
      type: File,
    },
    text: {
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
    colorIcon: {
      type: String,
      default: '',
    },
    colorText: {
      type: String,
      default: '',
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
  methods: {},
};
</script>
<style>
.v-icon--left {
  margin-right: 8px;
}
</style>
