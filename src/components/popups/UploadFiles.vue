<template>
  <v-card
    flat
    class="homefone upload-dialog"
    v-if="filteredError.length || filteredQueue.length"
  >
    <h3 class="text-center">Upload files</h3>
    <v-progress-linear
      v-for="(item, index) in filteredError"
      :key="index + 14"
      v-model="item.progress"
      color="error"
      class="ma-2"
      height="25"
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>

    <v-progress-linear
      v-for="(item, index) in filteredQueue"
      :key="index"
      v-model="item.progress"
      color="buttons"
      class="ma-2"
      height="25"
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
    <v-card-actions class="ma-2">
      <v-btn
        v-if="filteredError.length && !filteredQueue.length"
        color="buttons"
        rounded
        class="yellow-button"
        @click="repeat"
        >Repeat</v-btn
      >
      <v-spacer/>
      <v-btn
        v-if="filteredError.length && !filteredQueue.length"
        color="buttons"
        rounded
        class="yellow-button"
        @click="close"
        >Close</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UploadFiles',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState('onlineCourses', ['queue']),
    filteredQueue () {
      return this.queue.filter(obj => !obj.error)
    },
    filteredError () {
      return this.queue.filter(obj => obj.error)
    }
  },
  watch: {
    filteredQueue (newVal, oldVal) {
      if (newVal?.length && newVal?.length !== oldVal?.length) {
        this.addLesson(newVal[0])
      }
    }
  },
  methods: {
    ...mapActions('onlineCourses', {
      addLesson: 'ADD_LESSON',
      addQueue: 'ADD_QUEUE'
    }),
    repeat () {
      this.addQueue(
        this.filteredError.map(obj =>
          Object.assign({}, obj, {
            error: false
          })
        )
      )
    },
    close () {
      this.addQueue([])
    }
  },
  created () {},
  beforeDestroy () {}
}
</script>

<style>
.upload-dialog {
  width: 300px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 20;
}
</style>
