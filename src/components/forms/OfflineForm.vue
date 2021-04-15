<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" xs="12" md="6">
        <div v-for="(field, name) in schema.sideLeft" :key="name">
          <TextInput
            v-if="field.type === 'text'"
            :value.sync="data[name]"
            :label="field.label"
            :limit="field.limit"
            :required="field.required"
          />
          <NumberInput
            v-if="field.type === 'number'"
            :value.sync="data[name]"
            :label="field.label"
            :limit="field.limit"
            :required="field.required"
          />
          <DateCourseInputs
            v-if="field.type === 'dateCourse'"
            :value.sync="data[name]"
            :label="field.label"
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
          />
          <SuitableInputs
            v-if="field.type === 'suitable'"
            :value.sync="data[name]"
            :limit="field.limit"
            :label="field.label"
            :required="field.required"
          />
          <TextAreaInput
            v-if="field.type === 'textarea'"
            :value.sync="data[name]"
            :label="field.label"
            :limit="field.limit"
            :required="field.required"
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
              :icon="field.icon"
              :size="field.size"
              :accept="field.accept"
              :required="field.required"
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div v-for="(field, name) in schema.bottom" :key="name">
          <DateCourseInputs
            v-if="field.type === 'dateCourse'"
            :value.sync="data[name]"
            :label="field.label"
            :required="field.required"
          />
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
            :disabled="loading"
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
import TextInput from '@/components/inputs/TextInput.vue';
import NumberInput from '@/components/inputs/NumberInput.vue';
import DateCourseInputs from '@/components/inputs/DateCourseInputs.vue';
import SuitableInputs from '@/components/inputs/SuitableInputs.vue';
import TextAreaInput from '@/components/inputs/TextAreaInput.vue';
import FileInput from '@/components/inputs/FileInput.vue';

// const schema = require('@/config/offlineCourseSchema').default;

export default {
  name: 'OfflineForm',
  props: {
    course: {
      type: Object,
      default: undefined,
    },
    schema: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TextInput,
    NumberInput,
    SuitableInputs,
    TextAreaInput,
    FileInput,
    DateCourseInputs,
  },
  data() {
    return {
      data: Object.keys({ ...this.schema.sideLeft, ...this.schema.sideRight, ...this.schema.bottom }).reduce(
        (acc, key) => {
          const obj = { [key]: '' };
          if (this.schema.sideRight[key]?.type === 'suitable') {
            obj[key] = [''];
          }
          if (this.schema.bottom[key]?.type === 'dateCourse') {
            obj[key] = [
              {
                date: '',
                availableSpots: '',
              },
            ];
          }
          if (this.schema.sideRight[key]?.type === 'file') {
            obj[key] = null;
          }
          return Object.assign(acc, obj);
        },
        {}
      ),
    };
  },
  watch: {
    data: {
      deep: true,
      handler() {
        // eslint-disable-next-line no-unused-expressions
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
        Object.keys(this.course).forEach(key => {
          this.data[key] = this.course[key];
        });
      }
    },
    async submit() {
      // eslint-disable-next-line no-underscore-dangle
      delete this.data._id;
      this.data.description = this.data.description
        .split(' ')
        .filter(str => str)
        .join(' ');
      this.data.dateOfCourses = this.data.dateOfCourses.map(obj => {
        // eslint-disable-next-line no-unused-vars
        const { _id, ...rest } = obj;
        return rest;
      });
      if (Array.isArray(this.data.photo)) delete this.data.photo;
      const { dateOfCourses, thisCourseIsSuitableFor, ...rest } = this.data;

      const fd = new FormData();

      Object.entries(rest).forEach(([name, value]) => {
        if (value instanceof File) fd.append('file', value);
        else fd.append(name, value);
      });
      dateOfCourses.forEach(obj => {
        fd.append('dateOfCourses[]', JSON.stringify(obj));
      });
      thisCourseIsSuitableFor.forEach(str => {
        fd.append('thisCourseIsSuitableFor[]', str);
      });

      this.$emit('submit', fd);
    },
  },
  mounted() {
    this.fillingForm();
  },
};
</script>

