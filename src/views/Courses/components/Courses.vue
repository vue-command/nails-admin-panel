<template>
  <v-card flat class="transparent">
    <h2 style="color: #fff" class="ma-8">{{ this.title }}</h2>
    <v-btn
      @click="addCourse
      "
      >{{addCourseTitle}}</v-btn
    >
    <div class="d-flex flex-wrap justify-center">
      <CourseCard
        v-for="card in courses"
        :key="card._id"
        :accessDays="card.accessDays"
        :url="validateImg(card)"
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
    'addCourse',
    'addCourseTitle',
  ],
  components: {
    CourseCard,
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
      coverImageSrc: '../assets/noImage.jpg',
    };
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
