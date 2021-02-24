<template>
  <v-row>
    <v-col cols="12" sm="12" lg="4" v-for="(pdf, index) in data" :key="index" class=" py-0 py-lg-2">
      <FileInput
        :value.sync="data[index]"
        :label="options.label"
        :icon="options.icon"
        :size="options.size"
        :accept="options.accept"
        :required="options.required"
      />
    </v-col>
  </v-row>
</template>

<style scoped>
</style>

<script>
import FileInput from '@/components/inputs/FileInput.vue';

export default {
  props: {
    pdfs: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  name: 'PdfInputs',
  components: {
    FileInput,
  },
  data() {
    return {};
  },
  computed: {
    data: {
      get() {
        return this.pdfs;
      },
      set(val) {
        this.$emit('update:pdfs', val);
      },
    },
  },
  watch: {
    // localData: {
    //   deep: true,
    //   handler (val) {
    //     this.$emit('update:data', val)
    //   }
    // }
  },
  methods: {},
};
</script>
