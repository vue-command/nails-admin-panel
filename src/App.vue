<template>
  <v-app>
    <v-main>
      <component :is="layout">
        <!-- <router-view /> -->
      </component>
      <notifications group="foo" />
    </v-main>
  </v-app>
</template>

<script>
import CoursesLayout from './Layouts/CoursesLayout.vue';
import ShopLayout from './Layouts/ShopLayout.vue';
import DefaultLayout from './Layouts/DefaultLayout.vue';

export default {
  name: 'App',
  components: {
    CoursesLayout,
    ShopLayout,
    DefaultLayout,
  },
  computed: {
    layout() {
      return `${this.$route.meta?.layout || 'default'}-layout`;
    },
  },
};
</script>

<style>
html,
body,
.v-application {
  font-family: "Archivo Narrow" !important;
  /* background: #cbcbcb !important; */
}
.v-btn__content {
  justify-content: center !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
