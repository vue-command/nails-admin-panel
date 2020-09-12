<template>
  <v-app>
      <v-main>
      <router-view />
    </v-main>
 </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
};
</script>

<style>
html,
body,
.v-application {
  font-family: 'Archivo Narrow' !important;
  background: #cbcbcb !important;
}
.v-application--wrap {
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
