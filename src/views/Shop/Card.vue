<template>
  <v-card class="cardfone ma-8 shop-card" @click="cardClick" min-width="210">
    <v-card flat class="px-0 pt-4 gray-background">
      <v-img :src="image" width="100%" height="220" contain />
    </v-card>
    <v-card-text class="text-wrap">
      <h4 class="color-black">{{ name }}</h4>
      <h4>{{ brand }}</h4>
    </v-card-text>
    <v-card-text class="price-wrap">
      <h4 class="color-black">{{ price }} AUD</h4>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
@import '@/css/variables.scss';
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
  background-color: $lightGray;
}
.shop-card {
  background-color: $lightGray;
  margin: 20px;
  width: calc(25% - 65px);
  height: 350px;
}
@media screen and (max-width: 1450px) {
  .shop-card {
    margin: 10px;
    width: calc(33% - 65px);
  }
}
@media screen and (max-width: 1095px) {
  .shop-card {
    margin: 10px;
    width: calc(50% - 65px);
  }
}
@media screen and (max-width: 569px) {
  .shop-card {
    margin: 10px;
    width: -webkit-fill-available;
  }
}
</style>

<script>
export default {
  name: 'Card',
  props: ['image', 'name', 'price', 'brand', 'id', 'clickHandler'],
  methods: {
    cardClick(){
      if(this.clickHandler) this.clickHandler(this.id)
    }
  }
}
</script>
