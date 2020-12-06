<template>
  <v-app dark>
    <v-app-bar color="indigo" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Nails AUSTRALIA</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="red--text text--accent-4"
        >
          <v-list-item @click="goTo('Home')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item   @click="goTo('offline-courses-page')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Offline courses</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goTo('online-courses-page')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Online courses</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goTo('ShopEdit')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shop</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goTo('shop-categories')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shop categories</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="homefone main-content">
      <v-container>
        <component :is="layout">
          <!-- <router-view /> -->
        </component>
        <!-- <notifications group="foo" position="top center" /> -->
      </v-container>
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
      drawer: false,
      group: null,
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
  methods: {
    goTo(name) {
      if (this.$route.name !== name) this.$router.push({ name });
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
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
  font-family: 'Archivo Narrow' !important;
}
.main-content {
  min-height: calc(100vh - 64px);
  width: 100vw;
  margin: 0 auto;
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
  background-color: #fa0 !important;
  padding: 5px;
  margin: 10px 0 0 0;
  font-size: 16px;
  border-left: none;
  text-align: center;
  border-radius: 5px;
  font-family: 'Archivo Narrow' !important;
  font-weight: 700;
  &.error {
    background: #e54d42;
  }
}
</style>
