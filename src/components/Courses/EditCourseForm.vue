<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" md="7">
        <v-btn @click="back">back</v-btn>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
                v-model="category"
                :rules="[rules.required]"
                label="Category"
                outlined
                dark
              ></v-text-field>
              <v-text-field
                v-model="nameOfCourse"
                :rules="[rules.required]"
                label="Name of Course"
                outlined
                dark
                :counter="27"
                maxlength="27"
              ></v-text-field>

              <v-text-field
                v-model="subtitle"
                :rules="[rules.required]"
                label="Subtitle"
                outlined
                dark
                :counter="32"
                maxlength="32"
              ></v-text-field>
              <div v-if="typeCourse === 'offline'">
                <div
                  v-for="(textField, i) in dateOfCourses"
                  :key="i"
                  class="d-flex input-container"
                >
                  <v-text-field
                    :label="labelDateOfCourse"
                    v-model="dateOfCourses[i]"
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
                  v-model="availableSpots"
                  :rules="[rules.required, rules.onlyDigits]"
                  outlined
                  dark
                ></v-text-field>
              </div>

              <v-text-field
                v-model="days"
                :rules="[rules.required, rules.onlyDigits]"
                label="Access (days)"
                outlined
                dark
              ></v-text-field>
              <v-text-field
                v-model="price"
                :rules="[rules.required, rules.onlyDigits]"
                label="price"
                outlined
                dark
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
                v-model="author"
                :rules="[rules.required]"
                label="Author"
                outlined
                dark
              ></v-text-field>
              <v-text-field
                v-model="instructor"
                :rules="[rules.required]"
                label="Instructor"
                outlined
                dark
              ></v-text-field>
              <v-text-field
                v-model="infoBonus"
                :rules="[rules.required]"
                label="Info for bonus"
                outlined
                dark
              ></v-text-field>
              <div
                v-for="(textField, i) in courseSuitable"
                :key="i"
                class="d-flex input-container"
              >
                <v-text-field
                  :label="labelForSuitable"
                  v-model="courseSuitable[i]"
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
                v-model="description"
                :rules="[rules.required]"
                label="Description"
                outlined
                dark
                no-resize
              ></v-textarea>
              <v-file-input
                v-model="file"
                color="deep-purple accent-4"
                label="Cover picture"
                placeholder="Select your file"
                prepend-icon="mdi-paperclip"
                outlined
                dark
                @change="Preview_image"
                :show-size="1000"
              ></v-file-input>
              <v-btn
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
        <!-- <v-col
        cols="12"
        xs="12"
        order="2"
        sm="6"
        order-sm="2"
      > -->
        <CourseCard
          :accessDays="days"
          :url="url"
          :name="nameOfCourse"
          :subtitle="subtitle"
          :price="price"
          :type="typeCourse"
          :coverImageSrc="coverImageSrc"
        />
      </v-col>
      <CourseCardDetail
        :category="category"
        :days="days"
        :nameOfCourse="nameOfCourse"
        :subtitle="subtitle"
        :price="price"
        :author="author"
        :instructor="instructor"
        :infoBonus="infoBonus"
        :courseSuitable="courseSuitable"
        :description="description"
        :dateOfCourses="dateOfCourses"
        :url="url"
        :type="typeCourse"
        :coverImageSrc="coverImageSrc"
        :btnTitle="typeCourse === 'online' ? 'APPLY' : 'BY THIS COURSE'"
      />
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
// import {
//   VContainer,
//   VRow,
//   VCol,
//   VTextField,
//   VForm,
//   VBtn,
//   VTextarea,
//   VFileInput,
//   VIcon,
// } from 'vuetify/lib';
import 'nails-courses-card';
import 'nails-courses-card-detail';
import 'nails-courses-card-detail/dist/nails-courses-card-detail.css';
import 'nails-courses-card/dist/nails-courses-card.css';

export default {
  components: {
    // VContainer,
    // VRow,
    // VCol,
    // VTextField,
    // VForm,
    // VBtn,
    // VTextarea,
    // VFileInput,
    // VIcon,
  },
  name: 'course-form',
  props: ['typeCourse', 'course', 'back', 'coverImageSrc', 'editCourseById'],
  data() {
    return {
      category: '',
      nameOfCourse: '',
      subtitle: '',
      days: '',
      price: '',
      author: '',
      instructor: '',
      infoBonus: '',
      labelForSuitable: 'This course is suitable for',
      description: '',
      file: [],
      dateOfCourses: [''],
      availableSpots: '',
      courseSuitable: [''],
      labelDateOfCourse: 'date of the course',
      // labelAvailableSpots: "available spots",
      url: null,
      type: '',
      // copyDateOfCourses: null,
      rules: {
        required: (v) => !!v || 'input is required',
        minLengthName: (v) => v.length <= 15 || 'the maximum number of characters entered',
        onlyDigits: (v) => !/\D/g.test(v) || 'input should consist only of digits',
      },
    };
  },
  watch: {},
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.file);
    },
    checkForm() {
      if (this.$refs.form.validate()) {
        this.submitHandler();
      }
    },
    addField(entryField) {
      return entryField ? this.courseSuitable.push('') : this.dateOfCourses.push('');
    },
    removeField(index, entryField) {
      return entryField
        ? this.courseSuitable.splice(index, 1)
        : this.dateOfCourses.splice(index, 1);
    },
    // async editCourse (id) {
    //   this.currentCourse = await this.getCourseID(id)
    // },
    cancelHandler() {
      this.back();
    },
    submitHandler() {
      const data = {
        category: this.category,
        nameOfCourse: this.nameOfCourse,
        subtitle: this.subtitle,
        accessDays: Number(this.days),
        price: Number(this.price),
        author: this.author,
        instructor: this.instructor,
        infoForBonus: this.infoBonus,
        description: this.description,
        file: this.file,
      };
      const formData = new FormData();
      Object.entries(data).forEach(([name, value]) => formData.append(name, value));
      this.dateOfCourses.forEach((item) => formData.append('dateOfCourses[]', item));
      formData.append('availableSpots', this.availableSpots);
      this.courseSuitable.forEach((item) => formData.append('thisCourseIsSuitableFor[]', item));
      this.editCourseById(formData);
      // this.resetData();
    },
  },
  mounted() {
    this.category = this.course.category;
    this.nameOfCourse = this.course.nameOfCourse;
    this.subtitle = this.course.subtitle;
    this.days = this.course.accessDays;
    this.price = this.course.price;
    this.author = this.course.author;
    this.instructor = this.course.instructor;
    this.infoBonus = this.course.infoForBonus;
    this.description = this.course.description;
    this.url = this.course?.photo[0]?.link;
    this.dateOfCourses = this.course.dateOfCourses;
    this.availableSpots = this.course.availableSpots;
    this.courseSuitable = this.course.thisCourseIsSuitableFor;
  },
  created() {
    // if (this.idCourse) {
    //   this.editCourse(this.idCourse)
    // } else {
    //   this.resetData()
    // }
    window.onbeforeunload = () => 'Are you sure you want to leave?';
  },
  beforeDestroy() {
    window.onbeforeunload = () => null;
  },
};
</script>
