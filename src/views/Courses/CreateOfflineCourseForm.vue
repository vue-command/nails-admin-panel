<template>
  <v-container>
    <v-row>
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
      <v-col cols="12" xs="12" md="7">
        <!-- <v-btn @click="back">back</v-btn> -->
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
                :counter="40"
                maxlength="40"
              ></v-text-field>

              <v-text-field
                v-model="subtitle"
                :rules="[rules.required]"
                label="Subtitle"
                outlined
                dark
                :counter="40"
                maxlength="40"
              ></v-text-field>
              <!-- <div v-if="typeCourse === 'offline'"> -->
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
              <!-- </div> -->

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
                :rules="[rules.imageRule]"
                :show-size="1000"
              ></v-file-input>
              <v-btn
                color="buttons"
                :disabled="loading"
                rounded
                outlined
                large
                dark
                min-width="90"
                class="yellow-button mt-4 mr-8"
                @click="checkForm"
                >submit</v-btn
              >
              <!-- <v-btn
                color="buttons"
                rounded
                outlined
                large
                dark
                :disabled="!currentCourse"
                min-width="90"
                class="yellow-button mt-4"
                @click="cancelHandler"
                >cancel</v-btn
              > -->
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
          :type="'offline'"
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
        :type="'offline'"
        :coverImageSrc="coverImageSrc"
        :btnTitle="'BY THIS COURSE'"
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

import { mapState } from 'vuex';

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
  name: 'create-offline-course',
  // props: ['typeCourse', 'getCourseID', 'sendData', 'back', 'idCourse', 'coverImageSrc'],
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
      // eslint-disable-next-line global-require
      coverImageSrc: require('@/assets/noImage.jpg'),
      // copyDateOfCourses: null,
      rules: {
        required: (v) => !!v || 'input is required',
        minLengthName: (v) => v.length <= 15 || 'the maximum number of characters entered',
        onlyDigits: (v) => !/\D/g.test(v) || 'input should consist only of digits',
        imageRule: (v) => !v || v.size < 2000000 || 'Image size should be less than 2 MB!',
      },
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'offline Courses',
          disabled: false,
          href: '/offline-courses-page',
        },
        {
          text: 'create Offline Course',
          disabled: true,
          href: '#',
        },
      ],
      // currentCourse: null,
    };
  },
  computed: {
    ...mapState('offlineCourses', ['loading', 'newOfflineCourse']),
  },
  watch: {
    newOfflineCourse(val) {
      if (!val) return;
      this.$router.push({
        name: 'offline-course-page',
        params: {
          // eslint-disable-next-line no-underscore-dangle
          courseid: val._id,
        },
      });
    },
    // idCourse(val) {
    //   if (val) {
    //     this.editCourse(val);
    //   } else {
    //     this.resetData();
    //   }
    // },
    // currentCourse(value) {
    //   if (this.typeCourse === 'offline') {
    //     this.dateOfCourses = value.dateOfCourses;
    //     this.copyDateOfCourses = Array.from(value.dateOfCourses);
    //     this.availableSpots = value.availableSpots;
    //   }
    //   this.category = value.category;
    //   this.nameOfCourse = value.nameOfCourse;
    //   this.subtitle = value.subtitle;
    //   this.days = value.accessDays;
    //   this.price = value.price;
    //   this.author = value.author;
    //   this.instructor = value.instructor;
    //   this.infoBonus = value.infoForBonus;
    //   this.description = value.description;
    //   this.url = value.photo[0]?.link;
    //   // this.dateOfCourses = value.dateOfCourses;
    //   // this.copyDateOfCourses = Array.from(value.dateOfCourses);
    //   // this.availableSpots = value.availableSpots;
    //   // this.file = value.photo[0].link;
    //   this.courseSuitable = value.thisCourseIsSuitableFor;
    //   this.copyCourseSuitable = Array.from(value.thisCourseIsSuitableFor);
    // },
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.file);
    },
    // resetData() {
    //   [
    //     'category',
    //     'nameOfCourse',
    //     'subtitle',
    //     'days',
    //     'price',
    //     'author',
    //     'instructor',
    //     'infoBonus',
    //     'description',
    //     'type',
    //   ].forEach((item) => {
    //     this[item] = '';
    //   });
    //   this.file = [];
    //   this.url = null;
    //   this.courseSuitable = [''];
    //   this.dateOfCourses = [''];
    //   this.availableSpots = '';
    // },
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
    // async editCourse(id) {
    //   this.currentCourse = await this.getCourseID(id);
    // },
    // cancelHandler() {
    //   if (this.typeCourse === 'offline') {
    //     this.dateOfCourses = Array.from(this.copyDateOfCourses);
    //     this.availableSpots = this.currentCourse.availableSpots;
    //   }
    //   this.category = this.currentCourse.category;
    //   this.nameOfCourse = this.currentCourse.nameOfCourse;
    //   this.subtitle = this.currentCourse.subtitle;
    //   this.days = this.currentCourse.accessDays;
    //   this.price = this.currentCourse.price;
    //   this.author = this.currentCourse.author;
    //   this.instructor = this.currentCourse.instructor;
    //   this.infoBonus = this.currentCourse.infoForBonus;
    //   this.description = this.currentCourse.description;
    //   this.url = this.currentCourse.photo[0].link;
    //   // this.dateOfCourses = Array.from(this.copyDateOfCourses);
    //   // this.availableSpots = this.currentCourse.availableSpots;
    //   this.courseSuitable = Array.from(this.copyCourseSuitable);
    // },
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
        // availableSpots: this.availableSpots,
      };
      const formData = new FormData();
      // if (this.typeCourse === 'offline') {
      this.dateOfCourses.forEach((item) => formData.append('dateOfCourses[]', item));
      formData.append('availableSpots', this.availableSpots);
      // }
      Object.entries(data).forEach(([name, value]) => formData.append(name, value));
      this.courseSuitable.forEach((item) => formData.append('thisCourseIsSuitableFor[]', item));
      this.$store.dispatch('offlineCourses/CREATE_OFFLINE_COURSE', formData);
      // this.resetData();
    },
  },
  created() {
    // if (this.idCourse) {
    //   this.editCourse(this.idCourse);
    // } else {
    //   this.resetData();
    // }
    window.onbeforeunload = () => 'Are you sure you want to leave?';
  },
  beforeDestroy() {
    window.onbeforeunload = () => null;
  },
};
</script>
