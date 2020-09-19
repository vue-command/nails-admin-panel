<template>
<v-card flat dark>
  <v-btn
    @click="goToCourses('online')"
  >online courses</v-btn>
  <v-btn
    @click="goToCourses('')"
  >offline courses</v-btn>
  <!-- <v-card v-if="showOfflineCourse" flat dark class="d-flex flex-wrap justify-space-around ">
    <CourseCard v-for="(card, index) in offlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo[0].link"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"/>
  </v-card>
  <v-card></v-card> -->
</v-card>
 
</template>
<script>
import CourseCard from './CourseCard.vue'

export default {
  name:'courses',
  components:{
    CourseCard,
  }, data () {
    return {
      onlineCourses: [],
      offlineCourses: [],
      showOnlineCourse:true,
      showOfflineCourse:true,
    }
  },
  methods: {
    // async getOnlineData () {
    //   const response = await(await fetch('https://nails-australia-staging.herokuapp.com/course/online')).json()
    //   this.onlineCourses = await response.onlineCourses
    // },
    // async getOfflineData () {
    //   const response = await(await fetch('https://nails-australia-staging.herokuapp.com/course/offline')).json()
    //   this.offlineCourses = await response.offlineCourses
    // },    
    goToCourses(type) {
       !!type ? this.$router.push({name: "online-courses"}) : this.$router.push({name: "offline-courses"})
    }
  },
  created() {
    // this.getOnlineData()
    // this.getOfflineData()
  }
}
</script>