<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12">
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :disabled="item.disabled">
              <router-link
                :to="item.href"
                class="uppercase"
                :class="{ 'disabled-link': item.disabled }"
              >
                {{ item.text }}
              </router-link>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Breadcrumbs',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('onlineCourses', ['onlineCourses', 'onlineCourseById', 'currentVideo']),
    ...mapState('offlineCourses', ['offlineCourses', 'currentOfflineCourse']),
    courseId() {
      return this.$route.params.courseid;
    },
    course() {
      if (this.type === 'online-courses') return this.onlineCourseById;
      if (this.type === 'offline-courses') return this.currentOfflineCourse;
      return {};
    },
    courseName() {
      return this.course?.nameOfCourse;
    },
    videoId() {
      return this.$route.params.videoid;
    },
    route() {
      return this.$route;
    },
    itemsOption() {
      const option = [
        {
          text: 'Home',
          href: '/',
        },
      ];
      const on = [
        {
          text: 'Online Courses',
          href: '/online-courses',
        },
        {
          text: this.courseName,
          href: `/online-courses/${this.courseId}`,
        },
        {
          text: 'videos',
          href: `/online-courses/${this.courseId}/videos`,
        },
        {
          text: this.currentVideo?.name,
          href: '#',
        },
      ];
      const off = [
        {
          text: 'Offline Courses',
          href: '/offline-courses',
        },
      ];
      const course = [
        {
          text: this.courseName,
          href: '#',
        },
      ];
      const create = [
        {
          text: 'Create offline course',
          href: '#',
        },
      ];
      if (this.type === 'online-courses') return option.concat(on);
      if (this.type === 'offline-courses') {
        return this.$route.fullPath.includes('create-offline-course')
          ? option.concat(off).concat(create)
          : option.concat(off).concat(course);
      }
      return option;
    },
    items() {
      return this.itemsOption.slice(0, this.paths.length).map((item, index, arr) => {
        // eslint-disable-next-line no-param-reassign
        item.disabled = index === arr.length - 1;
        return item;
      });
    },
    type() {
      return this.paths[1];
    },
    paths() {
      return this.$route.fullPath.split('/');
    },
  },
  watch: {},
  methods: {},
  created() {},
};
</script>

<style scoped>
.uppercase {
  text-transform: uppercase;
}
</style>
