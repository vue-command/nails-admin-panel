<template>
  <v-container>
    <v-row>
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

      <v-col cols="12" xs="12" v-if="emtyCourses">
        <div class="text-message">No courses have been added yet.</div>
      </v-col>

      <v-col cols="12" xs="12" v-if="!emtyCourses">
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
                  @click.stop="
                    dialog = true;
                    deleteId = course._id;
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
    <confirmDelete :dialog.sync="dialog" :confirmDelete="confirmDelete" />
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

import Spiner from '@/components/Spinner.vue';
import CoverImage from '@/components/CoverImage.vue';
import confirmDelete from '@/components/popups/confirmDelete.vue';

export default {
  name: 'offline-courses',
  components: {
    // Courses,
    Spiner,
    CoverImage,
    confirmDelete,
  },
  data: () => ({
    // eslint-disable-next-line global-require
    coverImageSrc: require('@/assets/noImage.jpg'),
    dialog: false,
    deleteId: null,
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
  watch: {},
  methods: {
    confirmDelete() {
      this.$store.dispatch('offlineCourses/REMOVE_OFFLINE_COURSE', this.deleteId);
      this.dialog = false;
    },
    goToCourse(id) {
      this.$router.push({
        name: 'offline-course',
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
