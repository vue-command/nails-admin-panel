<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" md="7">
        <!-- <v-btn @click="back">back</v-btn> -->
        <v-form ref="form">
          <v-row>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
                v-model="courseData.category"
                :rules="[rules.required]"
                label="Category"
                outlined
                dark
              ></v-text-field>
              <v-text-field
                v-model="courseData.nameOfCourse"
                :rules="[rules.required]"
                label="Name of Course"
                outlined
                dark
                :counter="40"
                maxlength="40"
              ></v-text-field>

              <v-text-field
                v-model="courseData.subtitle"
                :rules="[rules.required]"
                label="Subtitle"
                outlined
                dark
                :counter="40"
                maxlength="40"
              ></v-text-field>
              <div v-if="typeCourse === 'offline'">
                <div
                  v-for="(textField, i) in courseData.dateOfCourses"
                  :key="i"
                  class="d-flex input-container"
                >
                  <v-text-field
                    label="date of the course"
                    v-model="courseData.dateOfCourses[i]"
                    :rules="[rules.required]"
                    outlined
                    dark
                  ></v-text-field>
                  <v-btn
                    @click="removeField(i, '')"
                    v-if="i !== 0"
                    class="remove"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
                <div class="d-flex justify-end mb-8">
                  <v-btn @click="addField('')">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
                <v-text-field
                  label="available spots"
                  v-model="courseData.availableSpots"
                  :rules="[rules.required, rules.onlyDigits]"
                  outlined
                  dark
                ></v-text-field>
              </div>

              <v-text-field
                v-model="courseData.accessDays"
                :rules="[rules.required, rules.onlyDigits]"
                label="Access (days)"
                outlined
                dark
              ></v-text-field>
              <v-text-field
                v-model="courseData.price"
                :rules="[rules.required, rules.onlyDigits]"
                label="price"
                outlined
                dark
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
                v-model="courseData.author"
                :rules="[rules.required]"
                label="Author"
                outlined
                dark
              ></v-text-field>
              <v-text-field
                v-model="courseData.instructor"
                :rules="[rules.required]"
                label="Instructor"
                outlined
                dark
              ></v-text-field>
              <v-text-field
                v-model="courseData.infoForBonus"
                :rules="[rules.required]"
                label="Info for bonus"
                outlined
                dark
              ></v-text-field>
              <div
                v-for="(textField, i) in courseData.thisCourseIsSuitableFor"
                :key="i"
                class="d-flex input-container"
              >
                <v-text-field
                  label="this course is suitable for"
                  v-model="courseData.thisCourseIsSuitableFor[i]"
                  :rules="[rules.required]"
                  outlined
                  dark
                ></v-text-field>
                <v-btn
                  @click="removeField(i, 'suitable')"
                  v-if="i !== 0"
                  class="remove"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
              <div class="d-flex justify-end mb-8">
                <v-btn @click="addField('suitable')">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>

              <v-textarea
                v-model="courseData.description"
                :rules="[rules.required]"
                label="Description"
                outlined
                dark
                no-resize
              ></v-textarea>
              <v-file-input
                v-model="courseData.photo"
                color="deep-purple accent-4"
                label="Cover picture"
                prepend-icon="mdi-paperclip"
                outlined
                dark
                :show-size="1000"
              ></v-file-input>
              <v-btn
                v-if="back"
                color="buttons"
                rounded
                outlined
                large
                dark
                min-width="90"
                class="yellow-button mt-4 mr-8"
                @click="cancelHandler"
                >cancel</v-btn
              >
              <v-btn
                color="buttons"
                rounded
                outlined
                large
                dark
                min-width="90"
                class="yellow-button mt-4"
                @click="checkForm"
                >submit</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        md="5"
        class="d-flex flex-column justify-space-between align-center"
      >
        <CourseCard :course="courseData" :type="typeCourse" />
      </v-col>
      <CourseDetail
        :course="courseData"
        :type="typeCourse"
        :btnTitle="typeCourse === 'online' ? 'APPLY' : 'BY THIS COURSE'"
      />
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
import CourseCard from '@/components/courses/CourseCard.vue';
import CourseDetail from '@/components/courses/CourseDetail.vue';
import { mapState } from 'vuex';

export default {
  components: {
    CourseCard,
    CourseDetail,
  },
  name: 'course-form',
  props: ['typeCourse', 'course', 'back'],
  data() {
    return {
      courseData: {
        category: '',
        nameOfCourse: '',
        subtitle: '',
        accessDays: '',
        price: '',
        author: '',
        instructor: '',
        infoForBonus: '',
        description: '',
        photo: null,
        dateOfCourses: [''],
        availableSpots: '',
        thisCourseIsSuitableFor: [''],
      },
      rules: {
        required: (v) => !!v || 'input is required',
        minLengthName: (v) => v.length <= 15 || 'the maximum number of characters entered',
        onlyDigits: (v) => !/\D/g.test(v) || 'input should consist only of digits',
      },
    };
  },
  computed: {
    ...mapState(['error']),
    ...mapState('offlineCourses', ['newOfflineCourse']),
  },
  watch: {},
  methods: {
    checkForm() {
      if (this.$refs.form.validate()) {
        this.submitHandler();
      }
    },
    addField(entryField) {
      return entryField ? this.courseData.thisCourseIsSuitableFor.push('') : this.courseData.dateOfCourses.push('');
    },
    removeField(index, entryField) {
      return entryField
        ? this.courseData.thisCourseIsSuitableFor.splice(index, 1)
        : this.courseData.dateOfCourses.splice(index, 1);
    },
    cancelHandler() {
      this.back();
    },
    fillingForm() {
      if (this.course) {
        Object.keys(this.courseData).forEach((key) => {
          this.courseData[key] = this.course[key];
        });
      }
    },
    async submitHandler() {
      const { dateOfCourses, thisCourseIsSuitableFor, ...rest } = this.courseData;
      const fd = new FormData();
      Object.entries(rest).forEach(([name, value]) => {
        if (value) {
          if (value instanceof File) fd.append('file', value);
          else if (typeof value !== 'object') fd.append(name, value);
        }
      });
      dateOfCourses.forEach((str) => {
        if (str) {
          fd.append('dateOfCourses[]', str);
        }
      });
      thisCourseIsSuitableFor.forEach((str) => {
        if (str) {
          fd.append('thisCourseIsSuitableFor[]', str);
        }
      });
      if (!this.course) {
        await this.$store.dispatch('offlineCourses/CREATE_OFFLINE_COURSE', fd);
        if (!this.error) {
          this.$router.push({
            name: 'offline-course',
            params: {
              // eslint-disable-next-line no-underscore-dangle
              courseid: this.newOfflineCourse._id,
            },
          });
        }
      } else {
        await this.$store.dispatch('offlineCourses/EDIT_OFFLINE_COURSE', {
          data: fd,
          // eslint-disable-next-line no-underscore-dangle
          id: this.course._id,
        });
      }
    },
  },
  mounted() {
    this.fillingForm();
  },
  created() {
    // window.onbeforeunload = () => 'Are you sure you want to leave?';
  },
  beforeDestroy() {
    // window.onbeforeunload = () => null;
  },
};
</script>
