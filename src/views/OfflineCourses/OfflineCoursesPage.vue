<template>
  <div>
    <Spiner v-if="isLoading" />
    <div v-if="showBanerNoData">no Data</div>
    <div v-if="showBanerEmtyCourses">emty Courses</div>
    <OfflineCourses v-if="showCourses" :offlineCourses="offlineCourses" />
    <OfflineCoursesForm v-if="showForm" :showForm.sync="showForm"/>
  </div>
</template>
<script>
import OfflineCourses from "./Components/OfflineCourses.vue";
import Spiner from "./Components/Spiner.vue";
export default {
  name: "offline-courses-page",
  components: {
    OfflineCourses,
    Spiner,
  },
  data: () => ({
    offlineCourses: null,
    totalOfflineCourses: null,
    isLoading: true,
    showForm: false,
  }),
  computed: {
    showCourses() {
      return (
        !this.isLoading &&
        this.offlineCourses !== null &&
        this.offlineCourses?.length > 0 && !this.showForm
      );
    },
    showBanerNoData() {
      return !this.isLoading && this.offlineCourses === null;
    },
    showBanerEmtyCourses() {
      return !this.isLoading && this.offlineCourses?.length === 0;
    },
  },
  methods: {
    // async editCourseOffline(id) {
    //   const response = await (
    //     await fetch(
    //       `https://nails-australia-staging.herokuapp.com/course/offline/${id}`
    //     )
    //   ).json();
    //   this.id = id
    //   this.currentCourse = await response.offlineCourse;
    //   console.log(currentCourse);
    // },
    async getOfflineData() {
      const response = await (
        await fetch(
          "https://nails-australia-staging.herokuapp.com/course/offline"
        )
      ).json();
      if (!response?.error) {
        this.offlineCourses = response.offlineCourses;
        this.totalOfflineCourses = response.total;
      }
      this.isLoading = false;
    },
    async sendData(
      data,
      courseSuitable,
      dateOfCourses,
      methodPost = false,
      id = null
    ) {
      const formData = new FormData();
      const offlineRequest =
        "https://nails-australia-staging.herokuapp.com/course/new/offline";
      console.log(data);
      console.log(courseSuitable);
      console.log(dateOfCourses);
      console.log(methodPost);
      for (const name in data) {
        formData.append(name, data[name]);
      }

      dateOfCourses.forEach((item) => formData.append("dateOfCourses[]", item));

      courseSuitable.forEach((item) =>
        formData.append("thisCourseIsSuitableFor[]", item)
      );
      let url = undefined;
      url = methodPost
        ? offlineRequest
        : `${offlineRequest.replace(/[/]new/gi, "")}/${id}`;

      const method = methodPost ? "POST" : "PUT";

      const {
        newOfflineCourse: newOfflineCourse,
        updatedOfflineCourse: updatedOfflineCourse,
      } = await (
        await fetch(url, {
          method,
          body: formData,
        })
      ).json();
      // if (newOfflineCourse) {
      //   this.openForm(false);
      //   this.getOfflineData();
      // }
      // if (updatedOfflineCourse) {
      //   this.openForm(false);
      //   this.getOfflineData();
      // }
    },
  },
};
</script>
