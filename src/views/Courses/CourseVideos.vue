<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" class="d-flex justify-start">
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :disabled="item.disabled">
              <router-link
                :to="item.href"
                :class="{ 'disabled-link': item.disabled }"
              >
                {{ item.text.toUpperCase() }}</router-link
              >
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="12" xs="12" v-if="videos">
        <h2 align="center">{{ course.nameOfCourse }}</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="noVideos">
        <h2 align="center">You don't have video yet</h2>
      </v-col>
      <v-col cols="12" xs="12" v-if="!ready">
        <Spinner />
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
        v-for="(video, index) in videos"
        :key="video._id"
      >
        <v-card
          v-if="videos"
          class="my-8"
          @click="goToDetailVideo(video._id)"
        >
          <v-card-title class="d-flex justify-center"
            ><h2>
              {{ video.name }}
            </h2></v-card-title
          >
          <!-- <v-img :src="coverImage(index)" height="350px"></v-img> -->
          <CoverImage :url="coverImage(index)" :height="350" />
          <!-- <v-card-actions class="d-flex justify-end">
            <v-btn
              rounded
              color="buttons"
              large
              min-width="160"
              class="yellow-button"
              @click.stop="
                dialog = true;
                deleteId = video._id;
              "
              >Delete</v-btn
            >
          </v-card-actions> -->
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" v-if="videos">
        <h3 align="center">{{ course.description }}</h3>
      </v-col>
      <!-- <v-dialog v-model="dialog" persistent max-width="320">
        <v-card>
          <v-card-title> Do you really want to remove video ?</v-card-title>
          <v-card-actions class="justify-center">
            <v-btn
              color="buttons"
              rounded
              large
              class="yellow-button"
              text
              @click="canselHandler"
            >
              Disagree
            </v-btn>
            <v-btn
              color="buttons"
              rounded
              large
              class="yellow-button"
              text
              @click="deleteVideo"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-row>
  </v-container>
</template>

<script>

import CoverImage from '@/views/Courses/components/CoverImage.vue';
import Spinner from '@/views/Courses/components/Spinner.vue';

export default {
  components: {
    Spinner,
    CoverImage,
  },
  data() {
    return {
      courseId: this.$route.params.courseid,
      videos: null,
      ready: false,
      course: null,
      dialog: false,
      // eslint-disable-next-line global-require
      coverImageSrc: require('@/assets/noImage.jpg'),
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Online Courses',
          disabled: false,
          href: '/online-courses-page',
        },
        {
          text: '',
          disabled: false,
          href: `/online-courses-page/course/${this.$route.params.courseid}`,
        },
        {
          text: 'videos',
          disabled: true,
          href: '#',
        },
      ],

      // nameOfVideo: '',
      // videoFile: null,
      // description: '',
      // imgFile: null,
      // pdfFiles: new Array(3).fill(null),
      // rules: {
      //   videoRule: (v) => v?.size < 1000000000 || 'Video size should be less than 1 GB!',
      //   imageRule: (v) => !v || v.size < 2000000 || 'Image size should be less than 2 MB!',
      //   pdfRule: (v) => !v || v.size < 100000000 || 'Video size should be less than 100 MB!',
      //   required: (v) => !!v || 'input is required',
      // },
    };
  },
  computed: {
    // ...mapState('userCourses', [
    //   'course',
    //   'courseId',
    //   'courseVideos',
    //   'uploading',
    // ]),
    // ...mapState('auth', ['user']),
    noVideos() {
      return !this?.videos?.length && this.ready;
    },
    // showBtnAddVideo() {
    //   return !this.showForm && this.ready && this?.videos?.length < 5;
    // },
  },
  watch: {
    // user(newVal) {
    //   if (!newVal) return;
    //   this.fillingInTheFields();
    // },
    // course(val) {
    //   if (!val) return;
    //   this.items[2].text = `${val.nameOfCourse}`;
    // },
    // course(newVal) {
    //   if (!newVal) return;
    //   this.course = newVal;
    //   this.fillingInTheFields();
    // },
    // courseVideos(videos) {
    //   if (!videos) return;
    //   this.course = this.course;
    //   this.videos = this.courseVideos;
    //   this.showForm = false;
    //   this.ready = true;
    // },
  },
  methods: {
    // clearFormInputs() {
    //   this.nameOfVideo = '';
    //   this.videoFile = null;
    //   this.description = '';
    //   this.imgFile = null;
    //   this.pdfFiles = new Array(3).fill(null);
    //   this.showForm = false;
    // },
    // canselHandler() {
    //   this.dialog = false;
    //   this.deleteId = null;
    // },
    fillingInTheFields() {
      this.items[0].text = `${this.user.firstName} cabinet`;
      this.items[1].text = `${this.user.firstName} courses`;
    },
    // deleteVideo() {
    //   this.$store.dispatch('userCourses/REMOVE_VIDEO_COURSE', {
    //     id: this.deleteId,
    //     courseId: this.courseId,
    //   });
    //   this.dialog = false;
    //   this.deleteId = null;
    // },
    coverImage(index) {
      return this.videos[index].coverImg?.link || this.coverImageSrc;
    },
    // eslint-disable-next-line consistent-return
    async getCourseID(id) {
      try {
        const { onlineCourse, error } = await (
          await fetch(`${process.env.VUE_APP_API_URL}/course/online/${id}`)
        ).json();
        if (error) {
          this.$notify({
            group: 'foo',
            title: 'Error',
            type: 'error',
            text: error,
          });
        } else {
          this.course = onlineCourse;
          this.items[2].text = `${onlineCourse.nameOfCourse}`;
          this.videos = onlineCourse.videos;
          this.ready = true;
        }
      } catch (error) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong',
        });
        return null;
      }
    },
    // sendData() {
    //   const data = {
    //     name: this.nameOfVideo,
    //     videoFile: this.videoFile,
    //     description: this.description,
    //     imgFile: this.imgFile,
    //     pdfFiles: this.pdfFiles,
    //   };
    //   const fd = new FormData();
    //   Object.entries(data).forEach(([name, value]) => {
    //     if (Array.isArray(value)) {
    //       Object.values(data[name]).forEach((value) => {
    //         if (value) fd.append('files', value);
    //       });
    //     } else if (value instanceof File) fd.append('files', value);
    //     else if (value) fd.append(name, value);
    //   });
    //   if (this.$refs.form.validate()) {
    //     this.$store.dispatch('userCourses/CREATE_VIDEOS_COURSE', {
    //       fd,
    //       id: this.courseId,
    //     });
    //     this.clearFormInputs();
    //   }
    // },
    goToDetailVideo(id) {
      this.$router.push({
        name: 'online-course-video',
        params: {
          videoid: id,
        },
      });
    },
  },
  // mounted () {},
  created() {
    this.getCourseID(this.courseId);
    // if (this.courseId !== this.courseId) {
    //   this.$store.dispatch('userCourses/GET_USER_COURSE_ID', this.courseId);
    // } else {
    //   this.fillingInTheFields();
    //   this.items[2].text = `${this.course.nameOfCourse}`;
    //   this.course = this.course;
    //   this.videos = this.courseVideos;
    //   this.ready = true;
    // }
  },
};
</script>

<style></style>
