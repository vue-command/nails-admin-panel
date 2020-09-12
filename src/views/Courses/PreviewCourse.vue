<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        order="2"
        sm="6"
        order-sm="2"
        class="d-flex flex-column justify-space-between align-center align-sm-start"
      >
        <v-card flat class="mb-8 transparent" dark>
          <v-card-title class="pa-0 pl-4">{{ category }}</v-card-title>
          <v-card-text class="pa-0 pl-4 buttons--text">{{ type }} course</v-card-text>
          <v-card-title class="pa-0 pl-4">{{ nameOfCourse }}</v-card-title>
          <v-card-text class="pa-0 pl-4">{{ subtitle }}</v-card-text>
          <v-card-title class="pa-0 pl-4 buttons--text"
            >{{ days }} days | $ {{ price }}</v-card-title
          >
        </v-card>
        <v-card flat class="transparent d-flex flex-column align-center" dark>
          <v-card-title>This course is cuitable for:</v-card-title>
          <ul>
            <li v-for="(item, index) in courseSuitable" :key="index">{{ item }}</li>
          </ul>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" order="1" sm="6" order-sm="2" align="center" justify="center">
        <v-img width="400px" :src="url"></v-img>
      </v-col>
      <v-col cols="12" xs="12" order="2">
        <v-card-text class="mt-16 whitefone--text d-flex justify-center justify-sm-start"
          >Author and instructor of the course: {{ inctructor }}</v-card-text
        >
      </v-col>
      <v-col cols="12" xs="12" order="2">
        <v-card flat dark class="transparent">
          <v-card-title class="d-flex justify-center justify-sm-start"
            >On this course:</v-card-title
          >
          <v-card-text>{{ description }}</v-card-text>
          <v-card-text>{{ infoBonus }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12"  order="2" class="mt-4" >
        <v-card dark class="ma-12" max-width="350" min-height="300">
          <v-img :src="url" contain />
          <v-card-title class="buttons--text pa-0 pl-4 pt-4">
            {{ days }} days | $ {{ price }}
          </v-card-title>
          <v-card-title class="pa-0 pl-4">
            {{ nameOfCourse }}
          </v-card-title>
          <v-card-text class="pa-0 pl-4 pb-4 d-flex">
            {{ subtitle }}
          </v-card-text>
          <v-card v-if="type === 'online'" flat class="ml-4 mb-4 d-flex">
            <v-btn
              color="buttons"
              rounded
              small
              outlined
              primary
              min-width="90"
              class="yellow-button mr-4"
              >pay</v-btn
            >
            <v-btn
              color="buttons"
              rounded
              small
              min-width="90"
              dark
              class="yellow-button"
              >more</v-btn
            >
          </v-card>
          <v-card v-else flat class="ml-4 pb-4 d-flex">
            <v-btn
              color="buttons"
              rounded
              outlined
              small
              dark
              min-width="90"
              class="yellow-button"
              >more</v-btn
            >
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12"  order="2">
        <v-btn @click="previewHandler('')">Edit Details</v-btn>
        <v-btn @click="sendData">Publish</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
  export default {
    props: [
      'img',
      'nameOfCourse',
      'subtitle',
      'price',
      'author',
      'inctructor',
      'infoBonus',
      'courseSuitable',
      'description',
      'days',
      'category',
      'dateOfCourses',
      'url',
      'resetData',
      'previewHandler',
      'formHandler',
      'type',
    ],
    // name: 'course-online',
    data() {
      return {};
    },
    computed: {},
    methods: {
      sendData() {
        const formData = new FormData();
        let data = {
          category: this.category,
          nameOfCourse:this.nameOfCourse,
          subtitle: this.subtitle,
          // dateOfCourses:this.dateOfCourses,
          accessDays: Number(this.days),
          price: Number(this.price),
          author: this.author,
          inctructor: this.inctructor,
          infoForBonus: this.infoBonus,
          // thisCourseIsSuitableFor:this.courseSuitable,
          description: this.description,
          file: this.img,
        }
        console.log(data);
        for (const name in data) {
          formData.append(name, data[name]);
        }
        if (this.type === 'offline') {
         formData.append('dateOfCourses',JSON.stringify(this.dateOfCourses))
        }
        formData.append('thisCourseIsSuitableFor',JSON.stringify(this.courseSuitable))
        console.log(formData);
        fetch('https://nails-australia-staging.herokuapp.com/course/new/offline', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body:formData,
        });
        this.resetData('preview');
      },
    },
    mounted() {},
  };
</script>
