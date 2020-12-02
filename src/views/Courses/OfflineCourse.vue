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
    <Spinner v-if="loading" />
    <CourseCardDetail
      v-if="!loading && currentOfflineCourse && !showForm"
      :category="currentOfflineCourse.category"
      :days="currentOfflineCourse.accessDays"
      :nameOfCourse="currentOfflineCourse.nameOfCourse"
      :subtitle="currentOfflineCourse.subtitle"
      :price="currentOfflineCourse.price"
      :author="currentOfflineCourse.author"
      :instructor="currentOfflineCourse.instructor"
      :infoBonus="currentOfflineCourse.infoBonus"
      :courseSuitable="currentOfflineCourse.thisCourseIsSuitableFor"
      :description="currentOfflineCourse.description"
      :dateOfCourses="currentOfflineCourse.dateOfCourses"
      :url="checkUrl(currentOfflineCourse)"
      :type="typeCourse"
      :coverImageSrc="coverImageSrc"
      btnTitle="BUY THIS COURSE"
      :btnCallBack="null"
    />
    <EditCourseForm
      v-if="showForm"
      :editCourseById="editCourseById"
      :typeCourse="typeCourse"
      :course="currentOfflineCourse"
      :back="backForm"
      :coverImageSrc="coverImageSrc"
      :courseId="courseId"
    />
    <div
      class="d-flex flex-column align-center flex-sm-row justify-sm-center mt-8"
    >
      <v-btn
        v-if="!showForm"
        @click="showForm = true"
        color="buttons"
        rounded
        large
        dark
        min-width="160"
        class="yellow-button"
        >Edit</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Spinner from '@/components/Spinner.vue';
import EditCourseForm from '@/components/Courses/EditCourseForm.vue';
import 'nails-courses-card-detail';
import 'nails-courses-card-detail/dist/nails-courses-card-detail.css';

export default {
  name: 'offline-course-page',
  components: {
    Spinner,
    EditCourseForm,
  },
  data() {
    return {
      courseId: this.$route.params.courseid,
      // course: null,
      // ready: false,
      showForm: false,
      typeCourse: 'offline',
      // eslint-disable-next-line global-require
      coverImageSrc: require('@/assets/noImage.jpg'),
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'offline Courses',
          disabled: false,
          href: '/offline-courses-page',
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
    ...mapState('offlineCourses', [
      'offlineCourses',
      'currentOfflineCourse',
      'totalOfflineCourses',
      'loading',
    ]),
  },
  watch: {
    currentOfflineCourse(val) {
      if (!val) return;
      this.showForm = false;
      this.fillingInTheFields();
      // this.course = val;
    },
  },
  methods: {
    fillingInTheFields() {
      // this.items[0].text = `${this.user.firstName} cabinet`;
      // this.items[1].text = `${this.user.firstName} courses`;
      this.items[2].text = this.currentOfflineCourse.nameOfCourse;
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
    editCourseById(data) {
      this.$store.dispatch('userCourses/PUT_USER_COURSE_ID', {
        data,
        id: this.courseId,
      });
    },
    backForm() {
      this.showForm = false;
    },
  },
  created() {
    // this.fillingInTheFields();
    if (!this.currentOfflineCourse) {
      this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSE_BY_ID', this.courseId);
    } else {
      this.items[2].text = this.currentOfflineCourse.nameOfCourse;
      // this.course = this.currentOfflineCourse;
      // this.ready = true
    }
  },
  beforeDestroy() {
    this.$store.dispatch('offlineCourses/CLEAR_OFFLINE_COURSE_BY_ID');
  },
};
</script>

<style>
</style>
