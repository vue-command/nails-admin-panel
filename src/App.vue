<template>
  <v-app dark>
    <v-app-bar app color="orange" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title><a class="white--text" :href="baseUrl">Nails AUSTRALIA</a></v-toolbar-title>
    </v-app-bar>

    <NavigationDrawer :drawer.sync="drawer" />

    <v-main v-if="user" class="homefone">
      <component :is="layout">
        <!-- <router-view /> -->
      </component>
    </v-main>

    <UploadFiles v-if="uploadDialog" />
    <error-message />
    <simple-message />

    <h2
      v-if="!user"
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
      class="text-center"
    >
      User does not found
    </h2>
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
    ...mapState('users', ['user']),
    baseUrl() {
      return process.env.BASE_URL;
      // return process.env.VUE_APP_API_URL
    },
  },

  methods: {
    redirect() {
      let redirectPath = localStorage.getItem('redirectPath');
      localStorage.removeItem('redirectPath');
      if (!redirectPath) redirectPath = '/';
      if (this.$route.path !== redirectPath) this.$router.push(redirectPath);
    },
  },
  created() {
    this.$store.dispatch('categories/GET_CATEGORIES');

    const arr = this.$route?.redirectedFrom?.split('/');
    const hash = arr?.length ? arr[arr.length - 1] : '0';
    this.$store.dispatch('users/GET_USER', hash);
  },
  mounted() {
    setTimeout(this.redirect, 500);
  },
};
</script>

<style>
html,
body,
.v-application {
  font-family: 'Archivo Narrow' !important;
}
a {
  text-decoration: none;
}
.v-btn__content {
  justify-content: center !important;
}
::-webkit-scrollbar {
  width: 10px; /* width for vertical scroll */
  height: 8px; /* height for horizontal scroll */
  background-color: var(--v-homefone-base);
}

/* slider scrollbar */
::-webkit-scrollbar-thumb {
  background-color: var(--v-orange-base);
  border-radius: 9em;
}
</style>
