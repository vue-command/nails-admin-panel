<template>
  <v-card class="cardfone ma-8 shop-card" @click="handler(id)">
    <v-card flat class="px-0 pt-4 gray-background">
      <v-img :src="images[0]" width="100%" height="220" contain />
    </v-card>
    <v-card-text class="text-wrap">
      <h4 class="color-black">{{ name }}</h4>
      <h4>{{ description }}</h4>
    </v-card-text>
    <v-card-text class="price-wrap">
      <h4 class="color-black">{{ price }} AUD</h4>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
.shop-card {
  cursor: pointer;
}
.price-wrap {
  padding: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.text-wrap {
  padding: 10px;
  flex: 1;
}
.color-black {
  color: black;
}
.gray-background {
  background-color: #f4f4f4;
}
.shop-card {
  background-color: #f4f4f4;
  margin: 20px;
  width: calc(25% - 65px);
  height: 350px;
}
@media screen and (max-width: 1200px) {
  .shop-card {
    margin: 10px;
    width: calc(33% - 65px);
  }
}
@media screen and (max-width: 768px) {
  .shop-card {
    margin: 10px;
    width: calc(50% - 65px);
  }
}
@media screen and (max-width: 540px) {
  .shop-card {
    margin: 10px;
    width: -webkit-fill-available;
  }
}
</style>

<script>
export default {
  name: 'Card',
  props: ['images', 'name', 'price', 'description', 'id', 'clickHandler'],
  methods: {
    handler(id){
      console.log( this.clickHandler);
      this.clickHandler(id)
    }
  }
}
</script>
