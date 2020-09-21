<template>
  <v-container fluid v-if="showForm">
    <v-row>
      <v-col cols="12" xs="12" sm="7">
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
              <div v-for="(textField, i) in dateOfCourses" :key="i" class="d-flex input-container">
                <v-text-field
                  :label="labelDateOfCourse"
                  v-model="textField.date"
                  :rules="[rules.required]"
                  outlined
                  dark
                ></v-text-field>
                <v-text-field
                  :label="labelAvailableSpots"
                  v-model="textField.spots"
                  :rules="[rules.required]"
                  outlined
                  dark
                  class="ml-4"
                ></v-text-field>
                <v-btn @click="removeField(i,'')" v-if="i !== 0" class="remove">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
              <div class="d-flex justify-end mb-8">
                <v-btn @click="addField('')">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
              <v-text-field
                v-model="days"
                :rules="[rules.required,rules.onlyDigits]"
                label="Access (days)"
                outlined
                dark
              ></v-text-field>
              <v-text-field
                v-model="price"
                :rules="[rules.required,rules.onlyDigits]"
                label="price"
                outlined
                dark
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="12" md="6">
              <v-text-field v-model="author" :rules="[rules.required]" label="Author" outlined dark></v-text-field>
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
              <div v-for="(textField, i) in courseSuitable" :key="i" class="d-flex input-container">
                <v-text-field
                  :label="labelForSuitable"
                  v-model="courseSuitable[i]"
                  :rules="[rules.required]"
                  outlined
                  dark
                ></v-text-field>
                <v-btn @click="removeField(i,'suitable')" v-if="i !== 0" class="remove">
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
              >submit</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12" xs="12" sm="5">
        <CourseCard
          :accessDays="days"
          :img="url"
          :name="nameOfCourse"
          :subtitle="subtitle"
          :price="price"
          :type="typeCourse"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>
<script>
import CourseCard from './CourseCard.vue'
export default {
  components:{
    CourseCard
  },
  name: "form-courses",
  props: ["showForm", "typeCourse", 'id'],
  data() {
    return {
      category: "",
      nameOfCourse: "",
      subtitle: "",
      days: "",
      price: "",
      author: "",
      instructor: "",
      infoBonus: "",
      labelForSuitable: "This course is suitable for",
      description: "",
      file: [],
      dateOfCourses: [
        {
          date: "",
          spots: "",
        },
      ],
      courseSuitable: [""],
      labelDateOfCourse: "date of the course",
      labelAvailableSpots: "available spots",
      url: null,
      type: "",
      rules: {
        required: (v) => !!v || "input is required",
        minLengthName: (v) =>
          v.length <= 15 || "the maximum number of characters entered",
        onlyDigits: (v) =>
          !/\D/g.test(v) || "input should consist only of digits",
      },
      currentCourse: null
    };
  },
  watch: {
    id() {
     if(this.id) {
      this.typeCourse === 'offline' ? this.editCourseOffline(this.id) : this.editCourseOnline(this.id)
    }
    },
    currentCourse(value) {
      this.category = value.category
      this.nameOfCourse =  value.nameOfCourse
      this.subtitle = value.subtitle
      this.days = value.accessDays
      this.price = value.price
      this.author = value.author
      this.instructor = value.instructor
      this.infoBonus = value.infoForBonus
      this.description = value.description
      this.url = value.photo[0].link
      // this.dateOfCourses = value.dateOfCourses
      // this.courseSuitable = value.thisCourseIsSuitableFor
    }
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.file);
    },
    resetData(fromPreviewHandler) {
      [
        "category",
        "nameOfCourse",
        "subtitle",
        "days",
        "price",
        "author",
        "inctructor",
        "infoBonus",
        "description",
        "type",
      ].forEach((item) => {
        this[item] = "";
      });
      this.file = [];
      this.url = null;
      this.courseSuitable = [""];
      this.dateOfCourses = [
        {
          date: "",
          spots: "",
        },
      ];
    },
    checkForm() {
      if (this.$refs.form.validate()) {
      }
    },
    addField(entryField) {
      return !!entryField
        ? this.courseSuitable.push("")
        : this.dateOfCourses.push({
            date: "",
            spots: "",
          });
    },
    removeField(index, entryField) {
      return !!entryField
        ? this.courseSuitable.splice(index, 1)
        : this.dateOfCourses.splice(index, 1);
    },
    async editCourseOffline(id) {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/offline/${id}`
        )
      ).json();
      this.currentCourse = await response.offlineCourse
    },
      async editCourseOnline(id) {
      const response = await (
        await fetch(
          `https://nails-australia-staging.herokuapp.com/course/online/${id}`
        )
      ).json();
      this.currentCourse = await response.onlineCourse
    }
  },
};
</script>
