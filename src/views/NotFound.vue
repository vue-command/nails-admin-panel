<template>
  <div class="text-center">
    <h1 class="not-found-title">404</h1>
    <h2>UH OH! You're lost.</h2>
    <p>
      The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to
      go back to the homepage.
    </p>
    <v-btn @click="$router.push({ name: 'home' })" color="buttons" rounded large >HOME Page</v-btn>
  </div>
</template>
<style scoped>
.not-found-title {
  font-size: 7.5em;
  margin: 15px 0px;
  font-weight: bold;
}
</style>