<template>
  <v-card flat dark>
    <h2>Offline Courses</h2>
    <v-btn @click="openForm(true);methodPost = true" v-if="showAddBtn">add new offline course</v-btn>
    <v-btn @click="openForm(false);methodPost = false" v-if="showBackBtn">back</v-btn>
    <Form :showForm.sync="showForm" :showCourses.sync="showCourses" :typeCourse="type" :id="id" :methodPost="methodPost"/>
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
        :editCourse="editCourse"
        :dialogId.sync="dialogId"
        :deleteCourseId="deleteCourseId"
      />
    </div>
    <v-dialog v-model="dialogId" max-width="290">
      <v-card>
        <v-card-title class="headline"> Are you sure you want to delete this course?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialogId = false">
            Disagree
          </v-btn>

          <v-btn color="green darken-1" text @click="deleteCourse(deleteId)">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    Form
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
      id: null,
      dialogId: false,
      deleteId: null,
      methodPost: false
    };
  },
  computed: {
    isHideMoreButtonOffline() {
      if (this.error) return false;
      return this.offlineCourses.length <= this.totalOfflineCourses;
    }
  },
  methods: {
    async getOfflineData() {
      const response = await (
        await fetch("https://nails-australia-staging.herokuapp.com/course/offline")
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
      if (response.offlineCourses) {
        response.offlineCourses.forEach(item => {
          this.offlineCourses.push(item);
        });
      } else this.error = true;
    },
    deleteCourse(id) {
      fetch(`https://nails-australia-staging.herokuapp.com/course/offline/${id}`, {
        method: "DELETE"
      });
      this.dialogId = false;
    },
    openForm(show) {
      this.showForm = show;
      this.showCourses = !show;
      this.showAddBtn = !show;
      this.showBackBtn = show;
      this.id = show ? this.id : null;
    },
    editCourse(show, id) {
      this.openForm(show);
      this.id = id;
    },
    deleteCourseId(id) {
      this.deleteId = id;
    }
  },
  created() {
    this.getOfflineData();
  }
};
</script>
