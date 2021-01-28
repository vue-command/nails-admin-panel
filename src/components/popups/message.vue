<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dark dense color="primary">
        <v-icon class="mr-4"> mdi-message-text </v-icon>
        <v-toolbar-title> Message </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon large> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h4>{{ messageType || '' }}</h4>
      </v-card-text>
      <v-card-text class="text-center">
        <h3>{{ messageText }}</h3>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'MessagePopup',
  computed: {
    ...mapState(['message', 'messageText', 'messageType']),
    dialog: {
      get () {
        return this.message
      },
      set (val) {
        !val && this.resetMessage()
      }
    }
  },
  methods: {
    ...mapMutations({
      setMessage: 'MESSAGE'
    }),
    resetMessage () {
      this.setMessage(null)
    }
  }
}
</script>
