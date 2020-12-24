<template>
  <v-card dark class="cardfone ma-12">
    <CoverImage :url="checkUrl(course)" :width="400" :height="250" class="image-course"/>
    <v-card-title class="buttons--text pa-0 pl-4 pt-4">
      {{ course.accessDays }} days | $ {{ course.price }}
    </v-card-title>
    <v-card-title class="pa-0 pl-4">
      {{ course.name }}
    </v-card-title>
    <v-card-text class="pa-0 px-4 pb-4 text-start">
      {{ course.subtitle }}
    </v-card-text>
    <v-card-actions v-if="type === 'online'" class="pl-4 pb-4">
      <v-btn
        color="buttons"
        rounded
        small
        outlined
        primary
        min-width="90"
        class="yellow-button mr-4"
        @click="payDetailForm"
        >pay</v-btn
      >
      <v-btn
        color="buttons"
        rounded
        small
        min-width="90"
        dark
        class="yellow-button"
        @click="detailInfoCard('course-online')"
        >more</v-btn
      >
    </v-card-actions>
    <v-card-actions v-else class="pl-4 pb-4">
      <v-btn
        color="buttons"
        rounded
        outlined
        small
        dark
        min-width="90"
        class="yellow-button"
        @click="mok"
        >more</v-btn
      >
    </v-card-actions>
    <!-- <v-card-actions v-else class="pl-4 pb-4">
      <v-btn
        color="buttons"
        rounded
        small
        outlined
        primary
        min-width="90"
        class="yellow-button mr-4"
        @click="editCourse(id)"
        >Edit</v-btn
      >
      <v-btn
        color="buttons"
        rounded
        small
        min-width="90"
        dark
        class="yellow-button"
        @click="removeCourse(id)"
        >Delete</v-btn
      >
    </v-card-actions> -->
  </v-card>
</template>

<style scoped>
/* .cardfone {
  width: 550px;
  min-height:360px;
}
.image-course {
  height: 360px;
}
@media screen and (max-width: 1300px) {
.cardfone {
  width: 440px;
}
}
@media screen and (max-width: 1100px) {
.cardfone {
  width: 350px;
}
.image-course {
  height:300px;
}
}
@media screen and (max-width: 1000px) {
.cardfone {
  width: 320px;
}
}
@media screen and (max-width: 905px) {
.cardfone {
  width: 380px;
}
} */
</style>

<script>
import CoverImage from '@/components/CoverImage.vue';

export default {
  name: 'course-card',
  props: [
    'course',
    'type',
  ],
  components: {
    CoverImage,
  },
  data() {
    return {
      // eslint-disable-next-line global-require
      coverImageSrc: require('@/assets/noImage.jpg'),
    };
  },
  watch: {
  },
  methods: {
    checkUrl(card) {
      let img;
      if (card instanceof File) {
        img = URL.createObjectURL(card);
        return img;
      }

      if (card.photo && Array.isArray(card.photo) && card.photo.length) {
        img = card.photo[0].link;
      }
      if (!img) {
        img = this.coverImageSrc;
      }
      return img;
    },
    mok() {
    },
    // detailInfoCard(route) {
    //   if (this.detailInfo) this.detailInfo(route, this.id);
    // },
    // payDetailForm() {
    //   if (this.payDetail) this.payDetail();
    // },
  },
};
</script>
