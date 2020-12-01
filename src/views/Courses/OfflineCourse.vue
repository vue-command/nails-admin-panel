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
      v-if="!loading && course && !showForm"
      :category="course.category"
      :days="course.accessDays"
      :nameOfCourse="course.nameOfCourse"
      :subtitle="course.subtitle"
      :price="course.price"
      :author="course.author"
      :instructor="course.instructor"
      :infoBonus="course.infoBonus"
      :courseSuitable="course.thisCourseIsSuitableFor"
      :description="course.description"
      :dateOfCourses="course.dateOfCourses"
      :url="checkUrl(course)"
      :type="typeCourse"
      :coverImageSrc="coverImageSrc"
      btnTitle="BUY THIS COURSE"
      :btnCallBack="null"
    />
    <EditCourseForm
      v-if="showForm"
      :editCourseById="editCourseById"
      :typeCourse="typeCourse"
      :course="course"
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
      course: null,
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
      'offlineCourseById',
      'totalOfflineCourses',
      'loading',
    ]),
  },
  watch: {
    offlineCourseById(val) {
      if (!val) return;
      this.fillingInTheFields();
      this.course = val;
      this.showForm = false;
    },
  },
  methods: {
    fillingInTheFields() {
      // this.items[0].text = `${this.user.firstName} cabinet`;
      // this.items[1].text = `${this.user.firstName} courses`;
      this.items[2].text = this.offlineCourseById.nameOfCourse;
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
    // goToVideos() {
    //   if (this.$route.name !== 'offline-course-videos')
    // { this.$router.push({ name: 'online-course-videos' }); }
    // },
    // eslint-disable-next-line consistent-return
  },
  created() {
    // this.fillingInTheFields();
    if (!this.offlineCourseById) {
      this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSE_BY_ID', this.courseId);
    } else {
      this.items[2].text = this.offlineCourseById.nameOfCourse;
      this.course = this.offlineCourseById;
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
