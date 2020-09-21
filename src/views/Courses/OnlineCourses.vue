<template>
  <v-card flat dark>
    <h2>Online Courses</h2>
    <v-btn @click="openForm(true)" v-if="showAddBtn">add new online course</v-btn>
    <v-btn @click="openForm(false)" v-if="showBackBtn">back</v-btn>
    <Form :showForm.sync="showForm" :showCourses.sync="showCourses" :typeCourse="type" :id="id" />
    <div v-if="showCourses" class="d-flex flex-wrap justify-center">
      <CourseCard
        v-for="(card, index) in onlineCourses"
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
        <v-card-title class="headline">Use Google's location service?</v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialogId = false; deleteCourseId(null)">
            Disagree
          </v-btn>

          <v-btn color="green darken-1" text @click="deleteCourse(id)">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn v-if="isHideMoreButtonOnline" @click="getMoreOnlineCourses">more</v-btn>
  </v-card>
</template>
<script>
import CourseCard from "./CourseCard.vue";
import Form from "./Form.vue";

export default {
  name: "online-courses",
  components: {
    CourseCard,
    Form
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
      type: "online",
      dialogId: false,
      id: null
    };
  },
  computed: {
    isHideMoreButtonOnline() {
      if (this.error) return false;
      return this.onlineCourses.length <= this.totalOnlineCourses;
    }
  },
  methods: {
    async getOnlineData() {
      const response = await (
        await fetch("https://nails-australia-staging.herokuapp.com/course/online")
      ).json();
      this.onlineCourses = response.onlineCourses;
      this.totalOnlineCourses = response.total;
    },
    async getMoreOnlineCourses() {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/offline?skip=${this.onlineCourses.length}`
        )
      ).json();
      if (response.onlineCourses !== undefined) {
        response.onlineCourses.forEach(item => {
          this.onlineCourses.push(item);
        });
      } else this.error = true;
    },
    deleteCourse(id) {
       fetch(`https://nails-australia-staging.herokuapp.com/course/online/${id}`,{
         method: 'DELETE'
       })
       this.dialogId = false
       this.id = null
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
      this.id = id
    }
  },
  mounted() {
    this.getOnlineData();
  }
};
</script>
