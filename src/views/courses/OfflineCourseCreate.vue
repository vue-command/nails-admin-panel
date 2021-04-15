<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" md="7">
        <OfflineForm :course.sync="courseData" :loading="loading" :schema="schema" mode="create" @submit="submit" />
      </v-col>
      <v-col v-if="courseData" cols="12" xs="12" md="5" class="d-flex flex-column justify-space-between align-center">
        <CourseCard :course="courseData" :type="type" :preview="true" />
      </v-col>
      <v-col v-if="courseData" cols="12" xs="12">
        <CourseDetail :course="courseData" :type="type" btnTitle="BUY THIS COURSE" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

import CourseDetail from '@/components/courses/CourseDetail.vue';
import CourseCard from '@/components/courses/CourseCard.vue';
import OfflineForm from '@/components/forms/OfflineForm.vue';

const schema = require('@/config/offlineCourseSchema').default;

export default {
  components: {
    CourseDetail,
    CourseCard,
    OfflineForm,
  },
  name: 'OfflineCourseCreate',
  data() {
    return {
      loading: false,
      schema,
      courseData: null,
      type: 'offline',
    };
  },
  methods: {
    ...mapActions('offlineCourses', {
      postCourse: 'POST_COURSE',
    }),
    async submit(data) {
      this.loading = true;
      const id = await this.postCourse(data);
      this.loading = false;
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
