<template>
  <v-row v-if="commodity">
    <v-col cols="12" sm="6" lg="5">
      <!-- <v-row class="image-row d-flex justify-center"> -->
      <v-card flat class="px-5">
        <v-img :src="currentLink" :lazy-src="noImage" height="400px" contain></v-img>
        <!-- </v-row> -->
        <!-- <v-row class="justify-center"> -->
        <!-- center-active mandatory -->
        <v-slide-group v-model="activeCard" center-active mandatory show-arrows>
          <v-slide-item v-slot:default="{ active, toggle }" v-for="img in previewImgs" :key="img._id">
            <v-img
              @click="toggle"
              :src="img.link"
              :lazy-src="noImage"
              width="60"
              height="60"
              contain
              active
              alt="Commodity image"
              :class="[active ? 'card-active' : 'card-disabled', 'mx-2']"
            ></v-img>
          </v-slide-item>
        </v-slide-group>
      </v-card>
      <!-- </v-row> -->
    </v-col>

    <v-col cols="12" sm="6" offset-lg="1" lg="5">
      <!-- <v-row>
            <v-col cols="12"> -->
      <h2 class="dgrey--text">{{ commodity.name }}</h2>
      <h4 class="shopfont--text">{{ commodity.brand }}</h4>
      <div class="caption mt-12">
        <h2 max-width="150px" class="speciﬁcations mt-1">{{ commodity.speciﬁcations }}</h2>
      </div>
      <div class="price d-flex flex-column justify-end align-center align-sm-end">
        <h3 class="darkGrey--text my-6 mx-0">{{ commodity.price }} AUD</h3>
        <v-card flat style="position: relative; box-sizing: border-box" class="px-4 px-sm-10">
          <span
            v-if="!commodity.amount"
            style="position: absolute; top: -20px; font-size: 14px; left: 50%; transform: translateX(-50%)"
            >not available</span
          >
          <v-btn
            :disabled="!commodity.amount"
            small
            width="100%"
            class="pa-2 mt-2 dgrey--text"
            color="orange"
            >Add to card</v-btn
          >
          <v-btn
            :disabled="!commodity.amount"
            small
            width="100%"
            class="pa-2 mt-4 white--text"
            color="dgrey"
            >Buy it now</v-btn
          >
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'ShopCardDetail',
  props:{
    commodity: {
      type:Object,
      required: false,
    }
  },
  data() {
    return {
      activeCard: 0,
      noImage: require('@/assets/noImage300x300.png'),
    };
  },
  computed: {
    previewImgs() {
      return this.commodity?.images ?? [];
    },
    currentLink() {
      return this.commodity?.images[this.activeCard]?.link ?? this.noImage;
    },
  },
  watch: {
  },
  methods: {

  },
  async mounted() {
  },
};
</script>

<style lang="scss">
@import '@/css/variables.scss';
.card-active {
  opacity: 1;
}
.card-disabled {
  cursor: pointer;
  opacity: 0.4;
}
// This should not be removed
.speciﬁcations {
  white-space: pre-wrap;
}
.price {
  width: 100%;
}

@media screen and (max-width: 320px) {
  .caption {
    h2 {
      font-size: 14px;
    }
  }
}
</style>
