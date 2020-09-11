<template>
  <v-card>
    <div>
      <CourseCard
        v-for="(card, index) in onlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"
      />
    </div>
  </v-card>
</template>
<script>
import CourseCard from './CourseCard.vue' 

export default {
  components: {
    CourseCard
  },
  data () {
    return {
      onlineCourses: []
    }
  },
  methods: {
    async getOnlineData () {
      this.onlineCourses = await(await fetch('https://nails-australia-staging.herokuapp.com/course/online')).json().onlineCourses
    }
  },
  created() {
    this.getOnlineData()
  }
}
</script>