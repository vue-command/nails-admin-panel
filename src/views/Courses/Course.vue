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
    <CourseCardDetail
      v-if="ready"
      :category="course.category"
      :days="course.days"
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
import 'nails-courses-card-detail';
import 'nails-courses-card-detail/dist/nails-courses-card-detail.css';

export default {
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
      if (this.$route.name !== 'online-course-videos') { this.$router.push({ name: 'online-course-videos' }); }
    },
    // eslint-disable-next-line consistent-return
    async getCourseID(id) {
      try {
        const { onlineCourse, error } = await (
          await fetch(`${process.env.VUE_APP_API_URL}/course/online/${id}`)
        ).json();
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        } else {
          this.course = onlineCourse;
          this.items[2].text = `${onlineCourse.nameOfCourse}`;
          this.ready = true;
        }
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong',
        });
        return null;
      }
    },
  },
  created() {
    this.getCourseID(this.courseId);
  },
};
</script>

<style>
</style>
