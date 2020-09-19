<template>
   <v-card  flat dark>
     <h2>Online Courses</h2>
     <v-btn @click="goToForm('online')">add new online course</v-btn>
     <div class="d-flex flex-wrap justify-center">
         <CourseCard v-for="(card, index) in onlineCourses"
        :key="index"
        :accessDays="card.accessDays"
        :img="card.photo[0].link"
        :name="card.nameOfCourse"
        :subtitle="card.subtitle"
        :price="card.price"
        :id="card._id"/>
     </div>
        <v-btn v-if="isHideMoreButtonOnline" @click="getMoreOnlineCourses">more</v-btn>
  </v-card>
</template>
<script>
import CourseCard from './CourseCard.vue' 

export default {
  name:'online-courses',
  components: {
    CourseCard
  },
  data () {
    return {
      onlineCourses: [],
      showBtnMore: true,
      totalOnlineCourses:null,
      error:false
    }
  },
  computed: {
     isHideMoreButtonOnline () {
        if (this.error) return false
      return this.onlineCourses.length <= this.totalOnlineCourses
    },
  },
  methods: {
    async getOnlineData () {
     const response = await(await fetch('https://nails-australia-staging.herokuapp.com/course/online')).json()
     this.onlineCourses = response.onlineCourses
     this.totalOnlineCourses = response.total
    },
    async getMoreOnlineCourses () {
      const response = await(await fetch(`https://nails-australia-staging.herokuapp.com/course/offline?skip=${this.onlineCourses.length}`)).json()
      if (response.onlineCourses !== undefined) {
         response.onlineCourses.forEach(item => {
                this.onlineCourses.push(item)
              })
      }else this.error = true 
    },
    goToForm (type) {
       this.$router.push({name: "form-courses",params: {type:`${type}`}})
    }
  },
  mounted() {
    this.getOnlineData()
  }
}
</script>