<template>
  <v-container v-if="show">
    <v-row>
      <v-col cols="12" xs="12">
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :disabled="item.disabled">
              <router-link
                :to="item.path"
                class="text-uppercase orange--text"
                :class="{ 'disabledPathBreadcrumbs--text': item.disabled }"
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
import { breadcrumbsFactory } from '@/helpers/breadcrumbs';

export default {
  name: 'Breadcrumbs',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('onlineCourses', ['course', 'video']),
    ...mapState('offlineCourses', { offlineCourse: 'course' }),
    ...mapState('shop', ['commodity', 'categories', 'isCommodityLoading']),
    courseId() {
      return this.$route.params.courseid ?? '';
    },
    lessonId() {
      return this.$route.params.lessonid ?? '';
    },
    courseName() {
      return this?.course?.nameOfCourse ?? '';
    },
    purchasedCourseName() {
      return this?.purchasedCourse?.nameOfCourse ?? '';
    },
    offlineCourseName() {
      return this?.offlineCourse?.nameOfCourse ?? '';
    },
    lessonName() {
      return this?.video?.name ?? '';
    },
    commodityName() {
      if (this.$route.params.commodityId == 'new') return 'New commodity';
      return this?.commodity?.name ?? '';
    },
    routeName() {
      return this.$route.name;
    },
    show() {
      return this.$route.name !== 'home';
    },
    items() {
      return this.breadcrumbs.map((route, index) => Object.assign({ disabled: index === 0 }, route)).reverse();
    },
    breadcrumbs: breadcrumbsFactory(),
  },
};
</script>