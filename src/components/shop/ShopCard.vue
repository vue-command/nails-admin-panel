<template>
  <v-card
    :width="width"
    :height="height"
    rounded="0"
    shaped
    color="lgrey"
    class="ma-4"
    @click="$emit('click', card._id)"
  >
    <CoverImage width="100%" height="250" :url="checkShopCardLink(card)" />
    <v-card-text class="pa-2 pb-0">
      <span>
        <p class="text-h6 ma-0 pa-0 text-truncate font-weight-bold dgrey--text text-start">
          {{ card.name }}
        </p>
        <p class="text-subtitle-1 ma-0 text-truncate font-weight-medium dgrey--text text-start">
          {{ card.brand }}
        </p>
      </span>
      <p class="text-end text-subtitle-1 ma-0 pa-0 font-weight-bold dgrey--text">{{ card.price }} AUD</p>
    </v-card-text>
  </v-card>
</template>

<script>
import checkShopCardLink from '@/helpers/checkShopCardLink';
export default {
  name: 'ShopCard',
  props: {
    card: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: '300',
    },
    height: {
      type: String,
      default: '300',
    },
  },
  components: {
    CoverImage: () => import('@/components/CoverImage.vue'),
  },
  methods: {
    checkShopCardLink,
  },
};
</script>

<style>
</style>