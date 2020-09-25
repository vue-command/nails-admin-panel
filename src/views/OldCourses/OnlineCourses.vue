<template>
  <v-card flat class="transparent">
    <h2 style="color:#fff" class="ma-8">Online Courses</h2>
    <v-btn
      @click="
        openForm(true);
        methodPost = true;
      "
      v-if="showAddBtn"
      >add new online course</v-btn
    >
    <v-btn
      @click="
        openForm(false);
        methodPost = false;
      "
      v-if="showBackBtn"
      >back</v-btn
    >
    <Form
      :showForm.sync="showForm"
      :showCourses.sync="showCourses"
      :typeCourse="type"
      :id="id"
      :methodPost="methodPost"
      :getOnlineData="getOnlineData"
      :openForm="openForm"
    />
    <div v-if="showSpiner" class="mt-16">
      <v-progress-circular
        :size="100"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-if="showCourses" class="d-flex flex-wrap justify-center">
      <CourseCard
        v-for="(card, index) in onlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="validateImg(card)"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"
        :editCourse="editCourse"
        :showDialog.sync="showDialog"
        :deleteCourseId="deleteCourseId"
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
          <v-btn color="green darken-1" text @click="deleteCourse(deleteId)"
            >Agree</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn v-if="isHideMoreButtonOnline" @click="getMoreOnlineCourses"
      >more</v-btn
    >
  </v-card>
</template>
<script>
import CourseCard from './CourseCard.vue';
import Form from './Form.vue';

export default {
  name: 'online-courses',
  components: {
    CourseCard,
    Form,
  },
  data() {
    return {
      onlineCourses: [],
      showBtnMore: true,
      totalOnlineCourses: null,
      error: false,
      showForm: false,
      showCourses: true,
      showAddBtn: true,
      showBackBtn: false,
      type: 'online',
      showDialog: false,
      id: null,
      deleteId: null,
      methodPost: false,
      showSpiner: true,
    };
  },
  watch: {
    showDialog() {
      if (!this.showDialog) this.deleteId = null;
    },
    onlineCourses() {
      if (this.onlineCourses.length <= 0) {
        this.showSpiner = true;
      } else {
        this.showSpiner = false;
      }
    },
  },
  computed: {
    isHideMoreButtonOnline() {
      return (
        this.onlineCourses.length < this.totalOnlineCourses
        && !this.error
        && !this.showForm
      );
    },
  },
  methods: {
    async getOnlineData() {
      const response = await (
        await fetch(
          'https://nails-australia-staging.herokuapp.com/course/online',
        )
      ).json();
      this.onlineCourses = response.onlineCourses;
      this.totalOnlineCourses = response.total;
    },
    async getMoreOnlineCourses() {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online?skip=${this.onlineCourses.length}`,
        )
      ).json();

      if (response.onlineCourses) {
        // this.onlineCourses = [...this.onlineCourses, ...response.onlineCourses];
        this.onlineCourses = this.onlineCourses.concat(response.onlineCourses);
      } else this.error = true;
    },
    validateImg(card) {
      let img = card?.photo[0]?.link;
      if (!img) {
        img = this.coverImageSrc;
      }
      return img;
    },
    async deleteCourse(id) {
      const { deleted } = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/${id}`,
          {
            method: 'DELETE',
          },
        )
      ).json();
      if (deleted) {
        await this.getOnlineData();
        this.showDialog = false;
      }
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
    },
  },
  created() {
    this.getOnlineData();
  },
};
</script>
