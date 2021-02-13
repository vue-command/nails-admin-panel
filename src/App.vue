<template>
  <v-app dark>
    <div v-if="user">
      <v-app-bar color="indigo" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Nails AUSTRALIA</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="red--text text--accent-4">
            <v-list-item @click="goTo('Home')">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item @click="goTo('offline-courses')">
              <v-list-item-icon>
                <v-icon>$offlineCourse</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Offline courses</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('online-courses')">
              <v-list-item-icon>
                <v-icon>$onlineCourse</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Online courses</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('shop')">
              <v-list-item-icon>
                <v-icon>$shop</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Shop</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('shop-categories')">
              <v-list-item-icon>
                <v-icon>$shopCategories</v-icon>
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
        </v-container>
      </v-main>
      <UploadFiles v-if="uploadDialog" />
      <error-message />
      <simple-message />
    </div>
    <h2 v-else class="text-center">User does not found</h2>
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
      drawer: false,
      group: null,
    };
  },
  components: {
    CoursesLayout,
    ShopLayout,
    DefaultLayout,
    UploadFiles: () => import('@/components/popups/UploadFiles.vue'),
  },
  computed: {
    layout() {
      return `${this.$route.meta?.layout || 'default'}-layout`;
    },
    ...mapState('onlineCourses', ['uploadDialog']),
    ...mapState('user', ['user']),
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    goTo(name) {
      if (this.$route.name !== name) this.$router.push({ name });
    },
  },
  created() {
    this.$store.dispatch('shop/STORE_INIT');
    const arr = this.$route?.redirectedFrom?.split('/');
    const hash = arr?.length ? arr[arr.length - 1] : '0';
    this.$store.dispatch('user/GET_USER', hash);
  },
};
</script>

<style>
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
  /* text-align: center; */
}
.disabled-link {
  color: grey !important;
}
.v-snack__content {
  text-align: center !important;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-button:start:decrement,
::-webkit-scrollbar-button:end:increment {
  height: 10px;
  background-color: transparent;
}
::-webkit-scrollbar-track-piece {
  background-color: #ffffff00;
  -webkit-border-radius: 16px;
}
::-webkit-scrollbar-thumb:vertical {
  cursor: crosshair;
  height: 10px;
  background-color: #666;
  border: 1px solid #eee;
  -webkit-border-radius: 16px;
}
</style>
