<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" class="d-flex justify-start">
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
      </v-col>
      <v-col cols="12" xs="12">
        <h2 class="ma-4 text-title">OFFLINE COURSES</h2>
      </v-col>
      <v-col cols="12" xs="12">
        <v-btn @click="$router.push({ name: 'create-offline-course' })"
          >add new offline course</v-btn
        >
      </v-col>
      <v-col cols="12" xs="12" v-if="loading">
        <Spiner />
      </v-col>

      <!-- <div v-if="showBanerNoData" class="text-message">No courses data received.</div> -->
      <v-col cols="12" xs="12" v-if="emtyCourses">
        <div class="text-message">No courses have been added yet.</div>
      </v-col>
      <v-col cols="12" xs="12" v-if="!loading && offlineCourses">
        <v-row class="d-flex justify-center">
          <v-col
            cols="12"
            xs="12"
            sm="6"
            md="4"
            lg="3"
            v-for="course in offlineCourses"
            :key="course._id"
          >
            <v-card @click="goToCourse(course._id)">
              <v-card-title class="d-flex justify-center"
                ><h2>{{ course.nameOfCourse }}</h2></v-card-title
              >
              <CoverImage :url="checkUrl(course)" :height="300" />
              <v-card-actions>
                <v-btn
                  @click="
                    $store.dispatch(
                      'offlineCourses/REMOVE_OFFLINE_COURSE',
                      course._id
                    )
                  "
                  >delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" xs="12" v-if="!emtyCourses && isHideMoreBtn">
        <v-btn
          @click="
            $store.dispatch('offlineCourses/GET_MORE_OFFLINE_COURSES', {
              skip: offlineCourses.length,
            })
          "
          >More</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.text-title,
.text-message {
  color: #fff;
}
.text-message {
  font-size: 22px;
  margin-top: 50px;
}
</style>
<script>
import { mapState } from 'vuex';

// import Courses from '@/components/Courses/Courses.vue';
// import 'nails-courses-admin-form';
// import 'nails-courses-admin-form/dist/nails-courses-admin-form.css';
import Spiner from '@/components/Spinner.vue';
import CoverImage from '@/components/CoverImage.vue';

export default {
  name: 'offline-courses-page',
  components: {
    // Courses,
    Spiner,
    CoverImage,
  },
  data: () => ({
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
        disabled: true,
        href: '#',
      },
    ],
  }),
  computed: {
    ...mapState('offlineCourses', ['offlineCourses', 'totalOfflineCourses', 'loading']),
    emtyCourses() {
      return !this.loading && !this.offlineCourses?.length;
    },
    isHideMoreBtn() {
      return this.offlineCourses.length < this.totalOfflineCourses;
    },
  },
  watch: {
    // offlineCourses(val) {
    //   // eslint-disable-next-line no-useless-return
    //   if (!val) return;
    // },
  },
  methods: {
    goToCourse(id) {
      this.$router.push({
        name: 'offline-course-page',
        params: {
          courseid: id,
        },
      });
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
  },
  created() {
    this.$store.dispatch('offlineCourses/GET_OFFLINE_COURSES');
  },
};
</script>
