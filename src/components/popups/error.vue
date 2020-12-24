<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="color"
    top
    position="top center"
  >
    <h3>{{ errorType || "Unknown error type" }}</h3>
    <h3>{{ errorMessage || "Unknown Error" }}</h3>
    <template v-slot:action="{ attrs }">
      <!-- <v-card> -->
      <v-btn icon large text v-bind="attrs" @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
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
  name: 'ErrorMessage',
  data() {
    return {
      timeout: 8000,
      color: '#900',
    };
  },
  computed: {
    ...mapState(['error', 'errorMessage', 'errorType']),
    snackbar: {
      get() {
        return this.error;
      },
      set(val) {
        // eslint-disable-next-line no-unused-expressions
        !val && this.resetError();
      },
    },
  },
  methods: {
    ...mapMutations({
      setError: 'ERROR',
    }),
    resetError() {
      this.setError(null);
    },
  },
};
</script>
