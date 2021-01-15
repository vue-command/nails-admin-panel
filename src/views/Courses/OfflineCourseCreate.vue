<template>
  <v-container>
    <v-row>
      <!-- <EditCourseForm typeCourse="offline"/> -->
      <v-col cols="12" xs="12" md="7">
        <OfflineForm
          :course.sync="courseData"
          mode="create"
          @submit="submit"
        />
      </v-col>
      <v-col
        cols="12"
        xs="12"
        md="5"
        class="d-flex flex-column justify-space-between align-center"
      >
        <CourseCard :course="courseData" :type="type" />
      </v-col>
      <v-col cols="12" xs="12">
        <CourseDetail
          :course="courseData"
          :type="type"
          btnTitle="BUY THIS COURSE"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import { mapActions } from 'vuex';

import CourseDetail from '@/components/courses/CourseDetail.vue';
import CourseCard from '@/components/courses/CourseCard.vue';
import OfflineForm from '@/components/forms/OfflineForm.vue';

export default {
  components: {
    CourseDetail,
    CourseCard,
    OfflineForm,
  },
  name: 'OfflineCourseCreate',
  data() {
    return {
      courseData: {},
      type: 'offline',
    };
  },
  methods: {
    ...mapActions('offlineCourses', {
      postCourse: 'POST_COURSE',
    }),
    async submit(data) {
      const id = await this.postCourse(data);
      if (id) {
        this.$router.push({
          name: 'offline-course',
          params: {
            courseid: id,
          },
        });
      }
    },
  },
};
</script>
