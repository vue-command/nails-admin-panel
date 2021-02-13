<template>
  <div>
    <v-form ref="form">
      <div v-for="(item, name) in data" :key="name">
        <TextInput
          v-if="schema[name].type === 'text'"
          :value.sync="data[name]"
          :label="schema[name].label"
          :limit="schema[name].limit"
          :required="schema[name].required"
        />
        <FileInput
          v-if="schema[name].type === 'file'"
          :value.sync="data[name]"
          :label="schema[name].label"
          :icon="schema[name].icon"
          :size="schema[name].size"
          :accept="schema[name].accept"
          :required="schema[name].required"
        />
        <PdfInputs
          v-if="schema[name].type === 'pdfFile'"
          :pdfs.sync="data[name]"
          :options="schema[name]"
        />
        <TextAreaInput
          v-if="schema[name].type === 'textarea'"
          :value.sync="data[name]"
          :label="schema[name].label"
          :limit="schema[name].limit"
          :required="schema[name].required"
        />
      </div>
    </v-form>
    <div
      class="d-flex flex-column align-center flex-sm-row justify-sm-center my-8"
    >
      <v-btn
        rounded
        color="buttons"
        large
        min-width="160"
        class="yellow-button mr-sm-4 mb-8 mb-sm-0"
        :disabled="disabled"
        @click="clearFormInputs"
        >Cancel</v-btn
      >
      <v-btn
        rounded
        color="buttons"
        large
        min-width="160"
        class="yellow-button"
        :disabled="disabled"
        @click="validateForm"
        >Submit</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import TextInput from '@/components/inputs/TextInput.vue'
import TextAreaInput from '@/components/inputs/TextAreaInput.vue'
import FileInput from '@/components/inputs/FileInput.vue'
import PdfInputs from '@/components/courses/PdfInputs.vue'

const schema = require('@/config/uploadLessonSchema').default

export default {
  name: 'AddVideoForm',
  props: ['showForm'],
  components: {
    TextInput,
    TextAreaInput,
    FileInput,
    PdfInputs
  },
  data () {
    return {
      schema,
      data: Object.entries(schema).reduce((acc, [key, value]) => {
        let field = ''
        if (value.type === 'pdfFile') {
          field = new Array(value.count).fill(null)
        }
        if (value.type === 'file') field = null
        return Object.assign(acc, { [key]: field })
      }, {}),
      disabled: false
    }
  },
  computed: {
    ...mapState('onlineCourses', ['queue'])
  },
  watch: {
    queue (val) {
      if (val.length) return
      this.getCourse(this.$route.params.courseid)
      this.disabled = false
      this.clearFormInputs()
    }
  },
  methods: {
    ...mapActions('onlineCourses', {
      getCourse: 'GET_COURSE',
      addQueue: 'ADD_QUEUE'
    }),
    clearFormInputs () {
      this.$refs.form.reset()
      this.$emit('update:showForm', false)
    },
    sendData () {
      this.disabled = true
      const fd = new FormData()
      const uploadLessons = []
      Object.entries(this.data).forEach(([name, value]) => {
        if (Array.isArray(value)) {
          Object.values(this.data[name]).forEach(value => {
            value && fd.append('files', value)
          })
        } else {
          if (value instanceof File) fd.append('files', value)
          else fd.append(name, value)
        }
      })
      uploadLessons.push({
        id: this.$route.params.courseid,
        lesson: fd,
        progress: 0,
        error: false,
        index: 0
      })
      this.addQueue(uploadLessons)
    },
    validateForm () {
      if (this.$refs.form.validate()) this.sendData()
    }
  }
}
</script>

<style>
</style>
