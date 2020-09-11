<template>
<v-card flat dark>
  <v-checkbox
    v-model="showOfflineCourse"
    label="Offline Courses"
    dark
  ></v-checkbox>
    <v-checkbox
    v-model="showOnlineCourse"
    label="Online Courses"
    dark
  ></v-checkbox>
   <v-card v-if="showOnlineCourse" flat dark>
     <h2>Online Courses</h2>
     <div class="d-flex flex-wrap justify-center">
         <CourseCard v-for="(card, index) in onlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"/>
     </div>
  </v-card>
  <v-card v-if="showOfflineCourse" flat dark class="d-flex flex-wrap justify-space-around ">
    <CourseCard v-for="(card, index) in offlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo[0]"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"/>
  </v-card>
  <v-card></v-card>
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
    async getOnlineData () {
      const response = await(await fetch('https://nails-australia-staging.herokuapp.com/course/online')).json()
      this.onlineCourses = await response.onlineCourses
    },
    async getOfflineData () {
      const response = await(await fetch('https://nails-australia-staging.herokuapp.com/course/offline')).json()
      this.offlineCourses = await response.offlineCourses
    },    

  },
  created() {
    this.getOnlineData()
    this.getOfflineData()
  }
}
</script>