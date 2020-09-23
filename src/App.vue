<template>
  <v-app>
    <v-main>
      <component :is="layout">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script>
import CoursesLayout from './views/Layouts/CoursesLayout.vue'
import ShopLayout from './views/Layouts/ShopLayout.vue'
export default {
  name: "App",
  components: {
    CoursesLayout,
    ShopLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'shop') + '-layout'
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
.v-application--wrap {
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
