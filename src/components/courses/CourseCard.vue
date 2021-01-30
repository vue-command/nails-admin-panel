<template>
  <v-hover v-slot="{ hover }" open-delay="100">
    <v-card
      dark
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      class="ma-12"
      :width="400"
      @click="$emit('click', course._id)"
    >
      <CoverImage :url="checkLink(course)" :width="400" :height="250" />
      <v-card-title class="buttons--text pa-0 pl-4 pt-4">
        {{ course.accessDays }} days | $ {{ course.price }}
      </v-card-title>
      <v-card-title class="pa-0 pl-4">
        {{ courseName }}
      </v-card-title>
      <v-card-text class="pa-0 px-4 pb-4 text-start">
        {{ courseSubtitle }}
      </v-card-text>
      <v-card-actions v-if="type === 'online'">
        <v-btn color="buttons" rounded small outlined primary min-width="90" class="yellow-button mr-4">pay</v-btn>
      </v-card-actions>
      <v-card-actions v-if="type === 'offline'">
        <v-btn color="buttons" rounded small outlined primary min-width="90" class="yellow-button mr-4">pay</v-btn>
        <v-btn color="buttons" rounded small min-width="90" dark class="yellow-button">more</v-btn>
        <v-spacer />
        <v-btn v-if="deleteBtn" color="buttons" rounded small outlined primary @click.stop="$emit('delete', course._id)"
          >delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<style scoped></style>

<script>
import CoverImage from '@/components/CoverImage.vue';
import checkLink from '@/helpers/checkLink';

export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'online',
    },
    deleteBtn: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  computed: {
    courseName() {
      return this.course?.nameOfCourse?.length < 25 ? this.course?.nameOfCourse : this.course?.nameOfCourse?.slice(0, 22) + '...';
    },
    courseSubtitle() {
      return this.course?.subtitle?.length < 70 ? this.course?.subtitle : this.course?.subtitle?.slice(0, 67) + '...';
    },
  },
  watch: {},
  methods: {
    checkLink,
  },
};
</script>
