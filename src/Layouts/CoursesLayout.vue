<template>
  <v-container fluid>
    <!-- <v-btn
        v-if="coursesName.includes(this.$route.name)"
        @click="goTo('Home')"
        class="ma-8"
        ><v-img src="img/home.svg"
      /></v-btn> -->
    <!-- <v-btn
        v-if="coursesName.includes(this.$route.name)"
        @click="goTo('courses')"
        >Courses</v-btn
      > -->
    <Breadcrumbs />
    <router-view />
  </v-container>
</template>
<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue';

export default {
  components: {
    Breadcrumbs,
  },
  data: () => ({
    coursesName: ['offline-courses'],
  }),
  methods: {
    goTo(namePage) {
      if (this.$route.name !== namePage) this.$router.push({ name: namePage });
    },
  },
  beforeCreate() {
    this.$vuetify.theme.dark = true;
  },
  beforeDestroy() {
    this.$vuetify.theme.dark = false;
  },
};
</script>
