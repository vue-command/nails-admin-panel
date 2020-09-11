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
  <v-btn @click="onlineHandler" v-if="showBtnAddCourse">add online course</v-btn>
  <v-btn @click="offlineHandler" v-if="showBtnAddCourse">add offline course</v-btn>
  <v-btn  v-if="showBackBtn" @click="backHandler">back</v-btn>
  <v-card v-if="showAddCourse">
    <AddCourse :type="typeCourse"/>
  </v-card>
   <v-card v-if="showOnlineCourse" flat dark class="d-flex flex-wrap justify-center">
     <h2 >Online Courses</h2>
    <CourseCard v-for="(card, index) in onlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"/>
  </v-card>
  <v-card v-if="showOfflineCourse" flat dark class="d-flex flex-wrap justify-space-around ">
    <CourseCard v-for="(card, index) in offlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"/>
  </v-card>
  <v-card></v-card>
</v-card>
 
</template>
<script>
import AddCourse from './AddCourse.vue'
import CourseCard from './CourseCard.vue'

export default {
  name:'courses',
  components:{
    CourseCard,
    AddCourse
  }, data () {
    return {
      onlineCourses: [],
      offlineCourses: [],
      showOnlineCourse:true,
      showOfflineCourse:true,
      showAddCourse:false,
      showBtnAddCourse:true,
      typeCourse:'',
      showBackBtn: false
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
    onlineHandler () {
      
    },
    offlineHandler () {
      this.typeCourse ='offline'
      this.showOnlineCourse = false
      this.showOfflineCourse = false
      this.showBtnAddCourse = false
      this.showAddCourse = true
      this.showBackBtn= true
    },
    backHandler () {
      this.showBackBtn= false
      this.typeCourse =''
      this.showOnlineCourse = true
      this.showOfflineCourse = true
      this.showBtnAddCourse = true
      this.showAddCourse = false
    }

  },
  created() {
    this.getOnlineData()
    this.getOfflineData()
  }
}
</script>