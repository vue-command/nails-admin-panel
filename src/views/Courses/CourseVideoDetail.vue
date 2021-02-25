<template>
  <v-container fluid>
    <v-row>
      <!-- <v-col cols="12" xs="12" v-if="loading">
        <Spinner />
      </v-col> -->
      <v-col v-if="video" cols="12" xs="12" offset-md="2" md="8" class="player-container">
        <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions"> </video-player>
      </v-col>
      <v-col v-if="video" cols="12" xs="12" offset-md="2" md="8">
        <v-card-title>{{ video.description }}</v-card-title>
      </v-col>
      <v-col v-if="video" cols="12" xs="12" offset-md="2" md="8">
        <CoverImage :url="checkVideoLink(video)" :width="'100%'" :height="'auto'" />
        <v-card flat class="d-flex justify-center my-16 transparent">
          <VideoPdfs />
        </v-card>
        <!-- <v-card v-if="pdfs.length && !isAdmin" flat class="d-flex justify-center mt-16 transparent">
          <a v-for="pdf in video.pdfs" :key="pdf._id" :href="pdf.link" target="_blank" class="mx-8"
            ><v-img src="@/assets/pdf.svg" width="50px"
          /></a>
        </v-card> -->
      </v-col>
      <v-col cols="12" xs="12">
        <div v-if="!showForm" class="d-flex justify-center mt-8">
          <v-btn rounded color="buttons" large min-width="160" class="yellow-button" @click="showForm = true">
            Edit
          </v-btn>
        </div>
        <v-form v-if="showForm" ref="form-video">
          <div v-for="(item, name) in data" :key="name">
            <TextInput
              v-if="schema[name].type === 'text'"
              :value.sync="data[name]"
              :label="schema[name].label"
              :limit="schema[name].limit"
              :required="schema[name].required"
            />
            <div v-if="schema[name].type === 'file'" class="my-4">
              <v-btn v-if="valInput(name)" @click="data[name] = null" color="buttons" rounded small outlined primary>
                change file
              </v-btn>
              <FileInput
                v-else
                :value.sync="data[name]"
                :label="schema[name].label"
                :icon="schema[name].icon"
                :size="schema[name].size"
                :accept="schema[name].accept"
                :required="schema[name].required"
              />
            </div>

            <TextAreaInput
              v-if="schema[name].type === 'textarea'"
              :value.sync="data[name]"
              :label="schema[name].label"
              :limit="schema[name].limit"
              :required="schema[name].required"
            />
          </div>
        </v-form>
        <div v-if="showForm" class="d-flex flex-column align-center flex-sm-row justify-sm-center">
          <v-btn
            rounded
            color="buttons"
            large
            min-width="160"
            class="yellow-button my-8 my-sm-0 mr-sm-4"
            @click="closeForm"
            >Cancel</v-btn
          >
          <v-btn rounded color="buttons" large min-width="160" class="yellow-button" @click="sendData">Submit</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

import CoverImage from '@/components/CoverImage.vue';
// import Spinner from '@/components/Spinner.vue';
import checkVideoLink from '@/helpers/checkVideoLink';
import VideoPdfs from '@/components/courses/VideoPdfs.vue';

const schema = require('@/config/editLessonSchema').default;

export default {
  components: {
    CoverImage,
    // Spinner,
    TextInput: () => import('@/components/inputs/TextInput.vue'),
    TextAreaInput: () => import('@/components/inputs/TextAreaInput.vue'),
    FileInput: () => import('@/components/inputs/FileInput.vue'),
    videoPlayer,
    VideoPdfs,
  },
  data() {
    return {
      // loading: false,
      volume: 0,
      showForm: false,
      schema,
      data: Object.entries(schema).reduce((acc, [key, value]) => {
        let field = '';
        if (value.type === 'file') field = null;
        return Object.assign(acc, { [key]: field });
      }, {}),
    };
  },
  computed: {
    // ...mapState(['loading']),
    ...mapState('user', ['user']),
    ...mapState('onlineCourses', ['course', 'video']),
    playerOptions() {
      return {
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: this.video?.link,
          },
        ],
        // poster: this.video?.coverImg?.link,
      };
    },
    // isAdmin() {
    //   return this.course?.idUser === this.user._id;
    // },
    pdfs() {
      return this?.video?.pdfs ?? []
    }
  },
  watch: {
    showForm(val) {
      if (!val) return;
      this.fillingFields();
    },
  },
  methods: {
    ...mapActions('onlineCourses', {
      getVideo: 'GET_VIDEO',
      getCourse: 'GET_COURSE',
      putVideo: 'PUT_VIDEO',
    }),
    checkVideoLink,
    valInput(name) {
      return !(this.data[name] === null || this.data[name] instanceof File);
    },
    closeForm() {
      this.showForm = false;
    },
    fillingFields() {
      if (this.video) {
        Object.keys(this.data).forEach(key => {
          this.data[key] = this.video[key];
        });
      }
    },
    noObjNull(val) {
      return val === null || (typeof val === 'object' && !(val instanceof File));
    },
    sendData() {
      if (!this.$refs['form-video'].validate()) return;
      this.data.description = this.data.description
        .split(' ')
        .filter(str => str)
        .join(' ');
      const fd = new FormData();
      Object.entries(this.data).forEach(([name, value]) => {
        if (this.noObjNull(value)) return;
        if (value instanceof File) fd.append('file', value);
        else fd.append(name, value);
      });
      this.putVideo({
        fd,
        id: this.$route.params.videoid,
      });
      this.showForm = false;
    },
  },
  created() {
    this.getVideo(this.$route.params.videoid);
    this.getCourse(this.$route.params.courseid);
  },
};
</script>
<style>
.vjs_video_3-dimensions {
  height: unset;
  width: unset;
}
.video-js {
  width: 100%;
  height: 500px;
}
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
<style scoped>
/* .pdf-link:not(:last-child) {
  margin-right: 50px;
} */
</style>
