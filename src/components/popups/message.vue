<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="color"
    top
    position="top center"
  >
    <h3>{{ messageType || "Unknown message type" }}</h3>
    <h3>{{ messageText || "Unknown message" }}</h3>
    <template v-slot:action="{ attrs }">
      <!-- <v-card> -->
      <v-btn icon v-bind="attrs" @click="snackbar = false">
        <v-icon>mdi-close</v-icon></v-btn
      >
      <!-- <v-card-text class="text-center mt-10">
          <h4>{{ errorType || "Unknown error type" }}</h4>
        </v-card-text>
        <v-card-text class="text-center">
          <p>{{ errorMessage || "Unknown Error" }}</p>
        </v-card-text>
      </v-card> -->
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'MessagePopup',
  data() {
    return {
      timeout: 8000,
      color: '#FFC44A',
    };
  },
  computed: {
    ...mapState(['message', 'messageText', 'messageType']),
    snackbar: {
      get() {
        return this.message;
      },
      set(val) {
        // eslint-disable-next-line no-unused-expressions
        !val && this.resetMessage();
      },
    },
  },
  methods: {
    ...mapMutations({
      setMessage: 'MESSAGE',
    }),
    resetMessage() {
      this.setMessage(null);
    },
  },
};
</script>
