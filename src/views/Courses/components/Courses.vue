<template>
  <v-card flat class="transparent">
    <h2 style="color: #fff" class="ma-8">{{ this.title }}</h2>
    <!-- <v-btn
      @click="
        openForm(true);
        methodPost = true;
      "
      v-if="showAddBtn"
      >add new offline course</v-btn
    > -->
    <!-- <v-btn
      @click="
        openForm(false);
        methodPost = false;
      "
      v-if="showBackBtn"
      >back</v-btn
    > -->
    <!-- <OfflineCoursesForm
      :showForm.sync="showForm"
      :showCourses.sync="showCourses"
      :id="id"
      :methodPost="methodPost"
      :openForm="openForm"
      :getOfflineData="getOfflineData"
      :sendData="sendData"
    /> -->
    <!-- <div v-if="showSpiner" class="mt-16">
      <v-progress-circular
        :size="100"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div> -->
    <div class="d-flex flex-wrap justify-center">
      <CourseCard
        v-for="card in courses"
        :key="card._id"
        :accessDays="card.accessDays"
        :URL="validateImg(card)"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"
        :removeCourse="deleteRequest"
        :editCourse="editCourse"
      />
    </div>
    <v-dialog v-model="showDialog" max-width="290">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete this course?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="showDialog = false"
            >Disagree</v-btn
          >

          <v-btn color="green darken-1" text @click="deleteCourse">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn v-if="showMoreButton" @click="more">more</v-btn>
  </v-card>
</template>
<script>
import CourseCard from './CourseCard.vue';
// import CoursesForm from "./OfflineCoursesForm.vue";

export default {
  name: 'courses',
  props: [
    'courses',
    'total',
    'title',
    'type',
    'removeCourse',
    'editCourse',
    'more',
  ],
  components: {
    CourseCard,
    // CoursesForm,
  },
  data() {
    return {
      // offlineCourses: null,
      // showBtnMore: true,
      // totalOfflineCourses: null,
      // error: false,
      // showForm: false,
      // showCourses: true,
      // showAddBtn: true,
      // showBackBtn: false,
      // id: null,
      showDialog: false,
      removableId: null,
      // methodPost: false,
      // showSpiner: true,
      coverImageSrc: '../assets/noImage.jpg',
    };
  },

  watch: {
    // offlineCourses() {
    //   !this.offlineCourses
    //     ? (this.showSpiner = true)
    //     : (this.showSpiner = false);
    // },
  },

  computed: {
    showMoreButton() {
      return this.courses.length < this.total;
    },
  },

  methods: {
    // async getOfflineData() {
    //   const response = await (
    //     await fetch(
    //       "https://nails-australia-staging.herokuapp.com/course/offline"
    //     )
    //   ).json();
    //   this.offlineCourses = response.offlineCourses;
    //   this.totalOfflineCourses = response.total;
    // },

    // async getMoreOfflineCourses() {
    //   const response = await (
    //     await fetch(
    //       `https://nails-australia-staging.herokuapp.com/course/offline?skip=${this.offlineCourses.length}`
    //     )
    //   ).json();
    //   if (response.offlineCourses) {
    //     this.offlineCourses = [
    //       ...this.offlineCourses,
    //       ...response.offlineCourses,
    //     ];
    //   } else this.error = true;
    // },

    // async deleteCourse(id) {
    //   const { deleted } = await (
    //     await fetch(
    //       `https://nails-australia-staging.herokuapp.com/course/offline/${id}`,
    //       {
    //         method: "DELETE",
    //       }
    //     )
    //   ).json();
    //   if (deleted) {
    //     await this.getOfflineData();
    //     this.showDialog = false;
    //   }
    // },

    deleteRequest(id) {
      this.removableId = id;
      this.showDialog = true;
    },

    deleteCourse() {
      this.removeCourse(this.removableId);
      this.showDialog = false;
    },

    validateImg(card) {
      let img = card?.photo[0]?.link;
      if (!img) {
        img = this.coverImageSrc;
      }
      return img;
    },

    // openForm(show) {
    //   this.showForm = show;
    //   this.showCourses = !show;
    //   this.showAddBtn = !show;
    //   this.showBackBtn = show;
    //   this.id = show ? this.id : null;
    // },

    // editCourse(show, id) {
    //   this.openForm(show);
    //   this.id = id;
    // },

    // deleteCourseId(id) {
    //   this.deleteId = id;
    // },
  },

  created() {
    // this.getOfflineData();
  },
};
</script>
