<template>
  <v-card flat dark>
    <h2>Offline Courses</h2>
    <v-btn @click="openForm(true)" v-if="showAddBtn">add new offline course</v-btn>
    <v-btn @click="openForm(false)" v-if="showBackBtn">back</v-btn>
    <Form :showForm.sync="showForm" :showCourses.sync="showCourses" :typeCourse="type" />
    <div v-if="showCourses" class="d-flex flex-wrap justify-center">
      <CourseCard
        v-for="(card, index) in offlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo[0].link"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"
      />
    </div>
    <v-btn v-if="!isHideMoreButtonOffline" @click="getMoreOfflineCourses">more</v-btn>
  </v-card>
</template>
<script>
import CourseCard from "./CourseCard.vue";
import Form from "./Form.vue";

export default {
  name: "offline-courses",
  components: {
    CourseCard,
    Form,
  },
  data() {
    return {
      offlineCourses: [],
      showBtnMore: true,
      totalOfflineCourses: null,
      error: false,
      showForm: false,
      showCourses: true,
      showAddBtn: true,
      showBackBtn: false,
      type: "offline",
    };
  },
  computed: {
    isHideMoreButtonOffline() {
      if (this.error) return false;
      return this.offlineCourses.length <= this.totalOfflineCourses;
    },
  },
  methods: {
    async getOfflineData() {
      const response = await (
        await fetch(
          "https://nails-australia-staging.herokuapp.com/course/offline"
        )
      ).json();
      this.offlineCourses = response.offlineCourses;
      this.totalOfflineCourses = response.total;
    },
    async getMoreOfflineCourses() {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/offline?skip=${this.offlineCourses.length}`
        )
      ).json();
      if (response.offlineCourses !== undefined) {
        response.offlineCourses.forEach((item) => {
          this.offlineCourses.push(item);
        });
      } else this.error = true;
    },
    openForm(show) {
      this.showForm = show;
      this.showCourses = !show;
      this.showAddBtn = !show;
      this.showBackBtn = show;
    },
  },
  created() {
    this.getOfflineData();
  },
};
</script>
