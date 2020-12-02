<template>
  <v-app dark>
    <v-main class="homefone">
      <component :is="layout">
        <!-- <router-view /> -->
      </component>
      <!-- <notifications group="foo" position="top center" /> -->
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import CoursesLayout from './Layouts/CoursesLayout.vue';
import ShopLayout from './Layouts/ShopLayout.vue';
import DefaultLayout from './Layouts/DefaultLayout.vue';

export default {
  name: 'App',
  data() {
    return {
      snackbar: false,
      text: '',
      timeout: 8000,
      color: 'green',
    };
  },
  components: {
    CoursesLayout,
    ShopLayout,
    DefaultLayout,
  },
  computed: {
    layout() {
      return `${this.$route.meta?.layout || 'default'}-layout`;
    },
    ...mapState('offlineCourses', ['offlineError']),
    ...mapState('onlineCourses', ['onlineError']),
  },
  watch: {
    offlineError(val) {
      if (!val) return;
      this.snackbar = true;
      this.text = val;
      this.color = 'red';
    },
    onlineError(val) {
      if (!val) return;
      this.snackbar = true;
      this.text = val;
      this.color = 'red';
    },
  },
};
</script>

<style lang="scss">
html,
body,
.v-application {
  font-family: "Archivo Narrow" !important;
}
a {
  text-decoration: none;
}
.v-btn__content {
  justify-content: center !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.disabled-link {
  color: grey !important;
}
.vue-notification {
  background-color:#fa0 !important;
  padding: 5px;
  margin: 10px 0 0 0 ;
  font-size: 16px;
  border-left:none;
  text-align: center;
  border-radius: 5px;
  font-family: "Archivo Narrow" !important;
  font-weight: 700;
   &.error {
    background: #E54D42;
  }
}
</style>
