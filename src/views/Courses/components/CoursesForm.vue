<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12" sm="7">
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
              ></v-text-field>

              <v-text-field
                v-model="subtitle"
                :rules="[rules.required]"
                label="Subtitle"
                outlined
                dark
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
                class="yellow-button mt-4"
                @click="checkForm"
                >submit</v-btn
              >
              <v-btn
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
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" xs="12" sm="5">
        <CourseCard
          :accessDays="days"
          :url="url"
          :name="nameOfCourse"
          :subtitle="subtitle"
          :price="price"
          :type="typeCourse"
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
      />
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
export default {
  components: {
    // CourseCard,
    // CourseCardDetail,
  },
  name: 'courses-form',
  props: ['typeCourse', 'id', 'getCourseID', 'sendData', 'back'],
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
      copyDateOfCourses: null,
      rules: {
        required: (v) => !!v || 'input is required',
        minLengthName: (v) => v.length <= 15 || 'the maximum number of characters entered',
        onlyDigits: (v) => !/\D/g.test(v) || 'input should consist only of digits',
      },
      currentCourse: null,
    };
  },
  watch: {
    id(val) {
      if (val) {
        this.editCourse(val);
      } else {
        this.resetData();
      }
    },
    currentCourse(value) {
      if (this.typeCourse === 'offline') {
        this.dateOfCourses = value.dateOfCourses;
        this.copyDateOfCourses = Array.from(value.dateOfCourses);
        this.availableSpots = value.availableSpots;
      }
      this.category = value.category;
      this.nameOfCourse = value.nameOfCourse;
      this.subtitle = value.subtitle;
      this.days = value.accessDays;
      this.price = value.price;
      this.author = value.author;
      this.instructor = value.instructor;
      this.infoBonus = value.infoForBonus;
      this.description = value.description;
      this.url = value.photo[0]?.link;
      // this.dateOfCourses = value.dateOfCourses;
      // this.copyDateOfCourses = Array.from(value.dateOfCourses);
      // this.availableSpots = value.availableSpots;
      // this.file = value.photo[0].link;
      this.courseSuitable = value.thisCourseIsSuitableFor;
      this.copyCourseSuitable = Array.from(value.thisCourseIsSuitableFor);
    },
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.file);
    },
    resetData() {
      [
        'category',
        'nameOfCourse',
        'subtitle',
        'days',
        'price',
        'author',
        'instructor',
        'infoBonus',
        'description',
        'type',
      ].forEach((item) => {
        this[item] = '';
      });
      this.file = [];
      this.url = null;
      this.courseSuitable = [''];
      this.dateOfCourses = [''];
      this.availableSpots = '';
    },
    checkForm() {
      if (this.$refs.form.validate()) {
        this.submitHandler();
      }
    },
    addField(entryField) {
      return entryField
        ? this.courseSuitable.push('')
        : this.dateOfCourses.push('');
    },
    removeField(index, entryField) {
      return entryField
        ? this.courseSuitable.splice(index, 1)
        : this.dateOfCourses.splice(index, 1);
    },

    async editCourse(id) {
      this.currentCourse = await this.getCourseID(id);
    },

    cancelHandler() {
      if (this.typeCourse === 'offline') {
        this.dateOfCourses = Array.from(this.copyDateOfCourses);
        this.availableSpots = this.currentCourse.availableSpots;
      }
      this.category = this.currentCourse.category;
      this.nameOfCourse = this.currentCourse.nameOfCourse;
      this.subtitle = this.currentCourse.subtitle;
      this.days = this.currentCourse.accessDays;
      this.price = this.currentCourse.price;
      this.author = this.currentCourse.author;
      this.instructor = this.currentCourse.instructor;
      this.infoBonus = this.currentCourse.infoForBonus;
      this.description = this.currentCourse.description;
      this.url = this.currentCourse.photo[0].link;
      // this.dateOfCourses = Array.from(this.copyDateOfCourses);
      // this.availableSpots = this.currentCourse.availableSpots;
      this.courseSuitable = Array.from(this.copyCourseSuitable);
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
        // availableSpots: this.availableSpots,
      };
      const formData = new FormData();
      if (this.typeCourse === 'offline') {
        this.dateOfCourses.forEach((item) => formData.append('dateOfCourses[]', item));
        formData.append('availableSpots', this.availableSpots);
      }

      Object.entries(data).forEach(([name, value]) => formData.append(name, value));

      this.courseSuitable.forEach((item) => formData.append('thisCourseIsSuitableFor[]', item));

      this.sendData(formData);
      // this.resetData();
    },
  },

  created() {
    if (this.id) {
      this.editCourse(this.id);
    } else {
      this.resetData();
    }
  },
};
</script>
