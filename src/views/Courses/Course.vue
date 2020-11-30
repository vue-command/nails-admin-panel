<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :disabled="item.disabled">
          <router-link
            :to="item.href"
            :class="{ 'disabled-link': item.disabled }"
          >
            {{ item.text.toUpperCase() }}</router-link
          >
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <Spinner v-if="loading"/>
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
    />
    <div
      class="d-flex flex-column align-center flex-sm-row justify-sm-center mt-8"
    >
      <v-btn
        @click="goToVideos"
        color="buttons"
        rounded
        large
        dark
        min-width="160"
        class="yellow-button"
        >Videos</v-btn
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
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Online Courses',
          disabled: false,
          href: '/online-courses-page',
        },
        {
          text: '',
          disabled: true,
          href: '#',
        },
      ],
    };
  },
  computed: {
    ...mapState('onlineCourses', ['onlineCourses', 'onlineCourseById', 'totalOnlineCourses', 'loading']),
  },
  watch: {
    onlineCourseById() {
      this.fillingInTheFields();
    },
  },
  methods: {
    fillingInTheFields() {
      // this.items[0].text = `${this.user.firstName} cabinet`;
      // this.items[1].text = `${this.user.firstName} courses`;
      if (this.onlineCourseById) {
        this.items[2].text = `${this.onlineCourseById.nameOfCourse}`;
      }
    },
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
      if (this.$route.name !== 'online-course-videos') { this.$router.push({ name: 'online-course-videos' }); }
    },
    // eslint-disable-next-line consistent-return

  },
  created() {
    this.$store.dispatch('onlineCourses/GET_ONLINE_COURSE_BY_ID', this.courseId);
    // this.fillingInTheFields();
  },
};
</script>

<style>
</style>
