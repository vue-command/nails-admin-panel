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
                v-model="inctructor"
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
        />
        <!-- <v-card flat dark class="ma-4 d-flex flex-column" width="350" height="300">
          <v-img :src="url" contain />
          <v-card-title class="buttons--text pa-0 pl-4 pt-4">{{ days }} days | $ {{ price }}</v-card-title>
          <v-card-title class="pa-0 pl-4">{{ nameOfCourse }}</v-card-title>
          <v-card-text class="pa-0 pl-4 pb-4 d-flex">{{ subtitle }}</v-card-text>
          <v-card v-if="type === 'online'" flat class="ml-4 mb-4 d-flex">
            <v-btn
              color="buttons"
              rounded
              small
              outlined
              primary
              min-width="90"
              class="yellow-button mr-4"
            >pay</v-btn>
            <v-btn color="buttons" rounded small min-width="90" dark class="yellow-button">more</v-btn>
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
            >more</v-btn>
          </v-card>
        </v-card>-->
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
  props: ["showForm", "typeCourse"],
  data() {
    return {
      category: "",
      nameOfCourse: "",
      subtitle: "",
      days: "",
      price: "",
      author: "",
      inctructor: "",
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
    };
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
        this.$router.push({
          name: "preview-course",
          params: {
            data: {
              category: this.category,
              nameOfCourse: this.nameOfCourse,
              subtitle: this.subtitle,
              dateOfCourses: this.dateOfCourses,
              accessDays: Number(this.days),
              price: Number(this.price),
              author: this.author,
              inctructor: this.inctructor,
              infoForBonus: this.infoBonus,
              thisCourseIsSuitableFor: this.courseSuitable,
              description: this.description,
              file: this.file,
            },
            img: this.url,
          },
        });
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
  },
  mounted() {
    console.log(this.$route.params.type);
  },
  beforeDestroy() {
    // this.$route.params.type = ''
  },
};
</script>