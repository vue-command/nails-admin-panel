<template>
  <v-container>
    <v-row>
      <v-btn @click="openFormHandler('online')" v-if="showBtnAddCourse">add online course</v-btn>
      <v-btn @click="openFormHandler('offline')" v-if="showBtnAddCourse">add offline course</v-btn>
      <v-btn  v-if="showBackBtn" @click="backHandler">back</v-btn>
      <v-col cols="12" offset-sm="2" sm="8" class="pa-0 mb-4">
      </v-col>
      <v-form ref="form" v-if="showForm">
        <v-row>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="category"
              :rules="[rules.required]"
              label="Category"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="nameOfCourse"
              :rules="[rules.required]"
              label="Name of Course"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="subtitle"
              :rules="[rules.required]"
              label="Subtitle"
              outlined
            ></v-text-field>
          </v-col>
          <v-col v-if="type === 'offline'" cols="12" offset-sm="4" sm="4" class="pa-0" >
            <div v-for="(textField, i) in dateOfCourses" :key="i" class="d-flex input-container">
                <v-text-field
                  :label="textField.label1"
                  v-model="textField.value1"
                  :rules="[rules.required]"
                  outlined
  
                ></v-text-field>
                <v-text-field
                  :label="textField.label2"
                  v-model="textField.value2"
                  :rules="[rules.required]"
                  outlined
  
                  class="ml-4"
                ></v-text-field>
                <v-btn @click="remove(i)" v-if="i !== 0" class="remove"><v-icon>mdi-delete</v-icon></v-btn>
            </div>
            <div class="d-flex justify-end mb-8">
              <v-btn @click="add" ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
            
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field v-model="days" :rules="[rules.required]" label="Access (days)" outlined></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="price"
              :rules="[rules.required]"
              label="price"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="author"
              :rules="[rules.required]"
              label="Author"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="inctructor"
              :rules="[rules.required]"
              label="Instructor"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="infoBonus"
              :rules="[rules.required]"
              label="Info for bonus"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
          <div v-for="(textField, i) in courseSuitable" :key="i" class="d-flex input-container">
                <v-text-field
                  :label="textField.label"
                  v-model="textField.text"
                  :rules="[rules.required]"
                  outlined
  
                ></v-text-field>
                <v-btn @click="removeSuitable(i)" v-if="i !== 0" class="remove"><v-icon>mdi-delete</v-icon></v-btn>
            </div>
            <div class="d-flex justify-end mb-8">
              <v-btn @click="addSuitable" ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-textarea
              v-model="description"
              :rules="[rules.required]"
              label="Description"
              outlined
              no-resize
            ></v-textarea>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-file-input
              v-model="file"
              color="deep-purple accent-4"
              label="Cover picture"
              placeholder="Select your file"
              prepend-icon="mdi-paperclip"
              outlined
              @change="Preview_image"
              :show-size="1000"
            ></v-file-input>
          </v-col>
          <v-col cols="12" style="text-align:center" class="pa-0">
            <v-btn
              color="buttons"
              rounded
              outlined
              small
              min-width="90"
              class="yellow-button mt-4"
              @click="checkForm"
            >submit</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <PreviewCourse 
        v-if="showPreview"
        :category="this.category"
        :days="this.days"
        :img="this.file"
        :nameOfCourse="this.nameOfCourse"
        :subtitle="this.subtitle"
        :price="this.price"
        :author="this.author"
        :inctructor="this.inctructor"
        :infoBonus="this.infoBonus"
        :courseSuitable="this.courseSuitable"
        :description="this.description"
        :dateOfCourses="this.dateOfCourses"
        :url="this.url"
        />
    </v-row>
  </v-container>
</template>
<style scoped>
.main-content {
  padding-top: 20px !important;
}
.input-container {
  position: relative;
}
.remove {
  position:absolute;
  top:0;
  right:0;
}
</style>
<script>
import PreviewCourse from './PreviewCourse.vue'
export default {
  name: 'add-course',
  components: {
    PreviewCourse
  },
  data () {
    return {
      category: '',
      nameOfCourse: '',
      subtitle: '',
      dateOfCourses: [
        { 
          label1: 'date of the course', 
          value1: '',
          label2: 'available spots',
          value2: ''
        },
       
      ],
      days: '',
      price: '',
      author: '',
      inctructor: '',
      infoBonus: '',
      courseSuitable: [
        {
          label: 'This course is suitable for',
          text: ''
        }
      ],
      description: '',
      file:[],
      url:null,
      type: '',
      showForm: '',
      showBtnAddCourse:true,
      showBackBtn: false,
      showPreview: false,
      rules: {
        required: (v) => !!v || 'input is required',
        minLengthName: (v) => v.length <= 15 || 'the maximum number of characters entered',
        mailValidation: (v) =>
          /^(\w+\.?\w+\.?\w+?|\d+\.?\d+\.?\d+)([@])(\w+|\d+)\.{1}[a-zA-Z]{2,3}$/.test(v) || 'invalid email',
        phoneValidation: (v) =>
          /^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/.test(
            v
          ) || 'invalid number'
      }
    }
  },

  methods: {
      Preview_image() {
      this.url = URL.createObjectURL(this.file)
    },
    sendData () {
      // this.$store.dispatch('', {
      //   businessName: this.businessName,
      //   email: this.email,
      //   phone: this.phone,
      //   author: this.author,
      //   instructor: this.instructor,
      //   category: this.category,
      //   nameOfCourse: this.nameOfCourse,
      //   subtitle: this.subtitle,
      //   access: this.access,
      //   price: this.price,
      //   courseSuitable: this.courseSuitable,
      //   description: this.description,
      //   textFields: this.textFields
      // });

      // ['businessName', 'email', 'phone', 'author', 'instructor', 'category', 'nameOfCourse', 'subtitle', 'access', 'price', 'courseSuitable', 'description', 'checkbox1', 'checkbox2'].forEach((item) => { this[item] = '' })
    },
    checkForm () {
      if (this.$refs.form.validate()) {
        this.showPreview = true
        this.showForm = false
        // this.sendData()
      }
    },
    add () {
        this.dateOfCourses.push({ 
          label1: 'date of the course', 
          value1: '',
          label2: 'available spots',
          value2: ''
        })
     },
     addSuitable () {
        this.courseSuitable.push({ 
          label: 'This course is suitable for', 
          text: '',
        })
     },

     remove (index) {
         this.dateOfCourses.splice(index, 1)
     },
      removeSuitable (index) {
         this.dateOfCourses.splice(index, 1)
     },
    //  onlineHandler () {
    //   this.typeCourse ='online'
    //   this.showForm = true
    //   this.showBackBtn = true
    //   this.showBtnAddCourse = false
    // },
    openFormHandler (typeCourse) {
      this.type = typeCourse
      this.showForm = true
      this.showBackBtn = true
      this.showBtnAddCourse = false
    },
    backHandler () {
      this.showForm= false
      this.type = ''
      this.showBackBtn = false
      this.showBtnAddCourse = true
    }
  }
}
</script>
