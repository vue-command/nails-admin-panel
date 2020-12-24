<template>
  <div>
    <Spinner v-if="loading" />
    <CourseCardDetail
      v-if="!loading && onlineCourseById"
      :category="onlineCourseById.category"
      :days="onlineCourseById.accessDays"
      :nameOfCourse="onlineCourseById.nameOfCourse"
      :subtitle="onlineCourseById.subtitle"
      :price="onlineCourseById.price"
      :author="onlineCourseById.author"
      :instructor="onlineCourseById.instructor"
      :infoBonus="onlineCourseById.infoBonus"
      :courseSuitable="onlineCourseById.thisCourseIsSuitableFor"
      :description="onlineCourseById.description"
      :dateOfCourses="onlineCourseById.dateOfCourses"
      :url="checkUrl(onlineCourseById)"
      :type="typeCourse"
      :coverImageSrc="coverImageSrc"
      btnTitle="BUY THIS COURSE"
      :btnCallBack="null"
      :isPaid="onlineCourseById.isPaid"
      :isPublished="onlineCourseById.isPublished"
    />
    <div
      v-if="!loading && onlineCourseById"
      class="d-flex flex-column align-center flex-sm-row justify-sm-center mt-8"
    >
      <v-btn
        @click="goToVideos"
        color="buttons"
        rounded
        large
        dark
        min-width="160"
        class="yellow-button mb-4 mb-sm-0 mr-0 mr-sm-4"
        >Videos</v-btn
      >
      <v-btn
        @click="$store.dispatch('onlineCourses/PUBLISH', courseId)"
        :disabled="!onlineCourseById.isPaid || onlineCourseById.isPublished"
        color="buttons"
        rounded
        large
        dark
        min-width="160"
        class="yellow-button"
        >publish</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Spinner from '@/components/Spinner.vue';
import 'nails-courses-card-detail';
import 'nails-courses-card-detail/dist/nails-courses-card-detail.css';

export default {
  name: 'online-course',
  components: {
    Spinner,
  },
  data() {
    return {
      courseId: this.$route.params.courseid,
      course: null,
      ready: false,
      typeCourse: 'online',
      // eslint-disable-next-line global-require
      coverImageSrc: require('@/assets/noImage.jpg'),
    };
  },
  computed: {
    ...mapState('onlineCourses', [
      'onlineCourses',
      'onlineCourseById',
      'totalOnlineCourses',
      'loading',
    ]),
  },
  watch: {},
  methods: {
    checkUrl(card) {
      let img;
      if (card.photo && Array.isArray(card.photo) && card.photo.length) {
        img = card.photo[0].link;
      }
      if (!img) {
        img = this.coverImageSrc;
      }
      return img;
    },
    goToVideos() {
      if (this.$route.name !== 'online-course-videos') {
        this.$router.push({ name: 'online-course-videos' });
      }
    },
  },
  created() {
    this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_BY_ID', this.courseId);
  },
};
</script>

<style></style>
