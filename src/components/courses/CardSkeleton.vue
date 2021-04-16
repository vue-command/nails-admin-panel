<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      v-for="(item, index) in count"
      :key="index"
      :width="width"
      :height="height"
      class="ma-12 skeleton-course-card"
      :class="{ 'hide-first-btn': type === 'offline' }"
    >
      <v-skeleton-loader type="card,article,actions"></v-skeleton-loader>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '300',
    },
    height: {
      type: String,
      default: '480',
    },
    count: {
      type: Number,
      default: 4,
    },
    type: {
      type: String,
      default: 'online',
    },
  },
};
</script>

<style lang="scss">
.skeleton-course-card {
  & .v-skeleton-loader__card-heading .v-skeleton-loader__heading,
  .v-skeleton-loader__article .v-skeleton-loader__heading {
    display: none !important;
  }
  & .v-skeleton-loader__actions .v-skeleton-loader__button:first-child {
    margin-right: 20px !important;
  }
  & .v-skeleton-loader__image {
    height: 300px !important;
  }
  & .v-skeleton-loader__actions {
    text-align: left;
    padding: 16px;
  }
  & .v-skeleton-loader__button {
    border-radius: 28px;
    height: 30px;
    width: 95px;
  }
  & .v-skeleton-loader__paragraph .v-skeleton-loader__text:nth-child(1) {
    max-width: 50%;
    margin-top: 10px;
  }
  & .v-skeleton-loader__paragraph .v-skeleton-loader__text:nth-child(2) {
    max-width: 70%;
    margin-top: 15px;
  }
  & .v-skeleton-loader__paragraph .v-skeleton-loader__text:nth-child(3) {
    max-width: 60%;
    margin-top: 15px;
  }
}
.hide-first-btn {
  & .v-skeleton-loader__card-heading .v-skeleton-loader__heading,
  .v-skeleton-loader__article .v-skeleton-loader__heading,
  .v-skeleton-loader__actions .v-skeleton-loader__button:first-child {
    display: none;
  }
}
</style>