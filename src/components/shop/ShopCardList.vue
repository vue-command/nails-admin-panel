<template>
  <v-card flat class="">
    <v-card-text class="text-h4 black--text ma-5"> ATTACHED IMAGES </v-card-text>

    <v-card flat class="d-flex justify-center flex-wrap">
      <v-card v-for="(image, index) in images" :key="index" class="ma-5" :width="width">
        <CoverImage width="100%" :height="width" :url="image.link" />
        <v-card-actions class="pa-2">
          <v-btn :disabled="disabled" color="error" @click="$emit('delete', image._id)">DELETE</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>

    <v-card-actions>
      <v-btn color="buttons" @click="$refs.inputUpload.click()" :disabled="disabled" class="my-10">Upload images</v-btn>
      <input
        v-show="false"
        ref="inputUpload"
        accept="image/*"
        type="file"
        @change="e => $emit('addFiles', e.target.files)"
        multiple
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import checkShopCardLink from '@/helpers/checkShopCardLink';

export default {
  name: 'ShopCardList',
  props: {
    images: {
      type: Array,
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
    disabled: {
      type: Boolean,
      default: true,
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