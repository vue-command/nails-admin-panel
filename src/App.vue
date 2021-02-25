<template>
  <v-app dark>
    <div v-if="user">
      <v-app-bar color="indigo" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title><a class="white--text" :href="baseUrl">Nails AUSTRALIA</a></v-toolbar-title>
      </v-app-bar>
      <NavigationDrawer :drawer.sync="drawer"/>
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

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    };
  },
  components: {
    CoursesLayout: () => import('@/Layouts/CoursesLayout.vue'),
    ShopLayout: () => import('@/Layouts/ShopLayout.vue'),
    DefaultLayout: () => import('@/Layouts/DefaultLayout.vue'),
    UploadFiles: () => import('@/components/popups/UploadFiles.vue'),
    NavigationDrawer: () => import('@/components/NavigationDrawer.vue'),
  },
  computed: {
    layout() {
      return `${this.$route.meta?.layout || 'default'}-layout`;
    },
    ...mapState('onlineCourses', ['uploadDialog']),
    ...mapState('user', ['user']),
    baseUrl() {
      return process.env.BASE_URL
      // return process.env.VUE_APP_API_URL
    }
  },

  methods: {
    redirect() {
      let redirectPath = localStorage.getItem('redirectPath');
      localStorage.removeItem('redirectPath');
      if (!redirectPath) redirectPath = '/'
      if (this.$route.path !== redirectPath) this.$router.push(redirectPath)

    }
  },
  created() {
    this.$store.dispatch('shop/STORE_INIT');
    
    const arr = this.$route?.redirectedFrom?.split('/');
    const hash = arr?.length ? arr[arr.length - 1] : '0';
    this.$store.dispatch('user/GET_USER', hash); 

  },
  mounted() {
    // this.redirect()
    setTimeout(this.redirect, 500)
  }
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
