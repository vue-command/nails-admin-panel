<template>
  <v-card>
    <v-card-title> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </v-card-title>
    <v-card-text>
      Number of order: {{order.numberOfOrder}}
    </v-card-text>
    <v-card-text>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, ducimus ipsum? Sequi iusto minus at, neque
      blanditiis debitis non odit id consequatur in, ad quasi! Quas dolorem maxime tempora cumque.
    </v-card-text>
    <v-card-actions>
      <v-btn>Button</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CommodityOrderItem',
  props: {
    order: {
      type: Object,
      requaired: true
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    commodities(){
      return this.order.cart.slice(0, this.order.cart.length - 1)
    },
    delivery(){
      return this.order.cart[this.order.cart.length - 1]
    },
  },
  methods: {},
  mounted() {},
};
</script>
