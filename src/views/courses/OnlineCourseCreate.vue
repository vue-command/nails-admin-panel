<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" md="7">
        <OnlineForm :course.sync="courseData" :schema="schema" mode="create" @submit="submit" />
      </v-col>
      <v-col v-if="courseData" cols="12" xs="12" md="5" class="d-flex flex-column justify-space-between align-center">
        <CourseCard :course="courseData" :type="type" :preview="true"/>
      </v-col>
      <v-col v-if="courseData" cols="12" xs="12">
        <CourseDetail :course="courseData" :type="type" btnTitle="BUY THIS COURSE" />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import { mapActions } from 'vuex';

import CourseDetail from '@/components/courses/CourseDetail.vue';
import CourseCard from '@/components/courses/CourseCard.vue';
import OnlineForm from '@/components/forms/OnlineForm.vue';

const schema = require('@/config/onlineCourseSchema').default;


export default {
  components: {
    CourseDetail,
    CourseCard,
    OnlineForm,
  },
  name: 'OnlineCourseCreate',
  data() {
    return {
      schema,
      courseData: null,
      type: 'online',
    };
  },
  methods: {
    ...mapActions('onlineCourses', {
      postCourse: 'POST_COURSE',
    }),
    async submit(data) {
      const id = await this.postCourse(data);
      if (id) {
        this.$router.push({
          name: 'online-course',
          params: {
            courseid: id,
          },
        });
      }
    },
  },
};
</script>
