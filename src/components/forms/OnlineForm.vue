<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" xs="12" md="6">
        <div v-for="(field, name) in schema.sideLeft" :key="name">
          <TextInput
            v-if="field.type === 'text'"
            :value.sync="data[name]"
            :label="field.label"
            :required="field.required"
            :limit="field.limit"
          />
          <NumberInput
            v-if="field.type === 'number'"
            :value.sync="data[name]"
            :label="field.label"
            :limit="field.limit"
            :required="field.required"
          />
        </div>
      </v-col>
      <v-col cols="12" xs="12" md="6">
        <div v-for="(field, name) in schema.sideRight" :key="name">
          <TextInput
            v-if="field.type === 'text'"
            :value.sync="data[name]"
            :label="field.label"
            :required="field.required"
            :limit="field.limit"
          />
          <SuitableInputs
            v-if="field.type === 'suitable'"
            :value.sync="data[name]"
            :label="field.label"
            :required="field.required"
            :limit="field.limit"
          />
          <TextAreaInput
            v-if="field.type === 'textarea'"
            :value.sync="data[name]"
            :label="field.label"
            :required="field.required"
            :limit="field.limit"
          />
          <div v-if="field.type === 'file'">
            <v-btn
              v-if="Array.isArray(data[name])"
              @click="data[name] = null"
              color="buttons"
              rounded
              small
              outlined
              primary
            >
              change file
            </v-btn>
            <FileInput
              v-else
              :value.sync="data[name]"
              :label="field.label"
              :required="field.required"
              :icon="field.icon"
              :accept="field.accept"
              :size="field.size"
            />
          </div>
        </div>
      </v-col>
      <v-col cols="12" xs="12">
        <div class="d-flex justify-center">
          <v-btn
            v-if="mode === 'edit'"
            color="buttons"
            rounded
            outlined
            large
            dark
            min-width="90"
            class="yellow-button mt-4 mr-8"
            @click="$emit('back')"
            >cancel</v-btn
          >
          <v-btn
            color="buttons"
            rounded
            outlined
            large
            dark
            min-width="90"
            class="yellow-button mt-4"
            @click="checkForm"
            >submit</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';

import TextInput from '@/components/inputs/TextInput.vue';
import NumberInput from '@/components/inputs/NumberInput.vue';
import SuitableInputs from '@/components/inputs/SuitableInputs.vue';
import TextAreaInput from '@/components/inputs/TextAreaInput.vue';
import FileInput from '@/components/inputs/FileInput.vue';

const schema = require('@/config/onlineCourseSchema').default;

export default {
  name: 'OnlineForm',
  props: {
    course: {
      type: Object,
      default: undefined,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  components: {
    TextInput,
    NumberInput,
    SuitableInputs,
    TextAreaInput,
    FileInput,
  },
  data() {
    return {
      schema,
      data: Object.keys(Object.assign({}, schema.sideLeft, schema.sideRight)).reduce((acc, key) => {
        const obj = { [key]: '' };
        if (schema.sideLeft[key]?.type === 'suitable' || schema.sideRight[key]?.type === 'suitable') {
          obj[key] = [''];
        }
        if (schema.sideLeft[key]?.type === 'file' || schema.sideRight[key]?.type === 'file') {
          obj[key] = null;
        }
        return Object.assign(acc, obj);
      }, {}),
    };
  },
  computed: {
    ...mapState('user', ['user']),
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.$emit('update:course', this.data);
      },
    },
  },
  methods: {
    checkForm() {
      if (this.$refs.form.validate()) {
        this.submit();
      }
    },
    fillingForm() {
      if (this.course) {
        Object.keys(this.data).forEach(key => {
          this.data[key] = this.course[key];
        });
      }
    },
    async submit() {
      if (this.mode === 'create') {
        this.data.description = this.data.description
          .split(' ')
          .filter(str => str)
          .join(' ');
        this.data.idUser = this.user._id;
        this.data.isPublished = false;
        const { thisCourseIsSuitableFor, ...rest } = this.data;

        const fd = new FormData();

        Object.entries(rest).forEach(([name, value]) => {
          if (value instanceof File) fd.append('file', value);
          else fd.append(name, value);
        });

        thisCourseIsSuitableFor.forEach(str => {
          fd.append('thisCourseIsSuitableFor[]', str);
        });

        this.$emit('submit', fd);
      } else {
        if (Array.isArray(this.data.photo)) delete this.data.photo;
        this.$emit('submit', this.data);
      }
    },
  },
  mounted() {
    this.fillingForm();
  },
};
</script>

<style>
</style>
