<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-sm="2" sm="8" class="pa-0 mb-4">
        <v-card flat class="transparent" style="color:#fff;">
          <v-card-title>Portal terms of use</v-card-title>
          <v-card-text
            style="color:#fff;"
          >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel reprehenderit repellendus nesciunt voluptatibus porro saepe dicta numquam aliquid aperiam explicabo a nisi sapiente, velit, veritatis nobis. Placeat doloremque in inventore.</v-card-text>
        </v-card>
      </v-col>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="businessName"
              :rules="[rules.required]"
              label="Category"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.mailValidation]"
              label="E-mail"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="phone"
              :rules="[rules.required, rules.phoneValidation]"
              label="Phone number"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col v-if="type='offline'" cols="12" offset-sm="4" sm="4" class="pa-0" >
            <div v-for="(textField, i) in textFields" :key="i" class="d-flex input-container">
                <v-text-field
                  :label="textField.label1"
                  v-model="textField.value1"
                  :rules="[rules.required]"
                  outlined
                  dark
                ></v-text-field>
                <v-text-field
                  :label="textField.label2"
                  v-model="textField.value2"
                  :rules="[rules.required]"
                  outlined
                  dark
                  class="ml-4"
                ></v-text-field>
                <v-btn @click="remove(i)" v-if="i !== 0" class="remove"><v-icon>mdi-delete</v-icon></v-btn>
            </div>
            <div class="d-flex justify-end mb-8">
              <v-btn @click="add" ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
            
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field v-model="author" :rules="[rules.required]" label="Author" outlined dark></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="instructor"
              :rules="[rules.required]"
              label="Instructor"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="category"
              :rules="[rules.required]"
              label="Category"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="nameOfCourse"
              :rules="[rules.required]"
              label="Name of course"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="subtitle"
              :rules="[rules.required]"
              label="Subtitle"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field
              v-model="access"
              :rules="[rules.required]"
              label="Access (days)"
              outlined
              dark
            ></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-text-field v-model="price" :rules="[rules.required]" label="Price" outlined dark></v-text-field>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-textarea
              v-model="courseSuitable"
              :rules="[rules.required]"
              label="This course is suitable for"
              outlined
              dark
              no-resize
            ></v-textarea>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-textarea
              v-model="description"
              :rules="[rules.required]"
              label="Description"
              outlined
              dark
              no-resize
            ></v-textarea>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-checkbox
              v-model="checkbox1"
              :rules="[rules.required]"
              label="Agree to privacy policy"
              dark
            ></v-checkbox>
          </v-col>
          <v-col cols="12" offset-sm="4" sm="4" class="pa-0">
            <v-checkbox
              v-model="checkbox2"
              :rules="[rules.required]"
              label="Agree to portal terms of use"
              dark
            ></v-checkbox>
          </v-col>
          <v-col cols="12" style="text-align:center" class="pa-0">
            <v-btn
              color="buttons"
              rounded
              outlined
              small
              dark
              min-width="90"
              class="yellow-button mt-4"
              @click="checkForm"
            >submit</v-btn>
          </v-col>
        </v-row>
      </v-form>
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
export default {
  name: 'personal-data',
  data () {
    return {
      businessName: '',
      email: '',
      phone: '',
      author: '',
      instructor: '',
      category: '',
      nameOfCourse: '',
      subtitle: '',
      access: '',
      price: '',
      courseSuitable: '',
      description: '',
      checkbox1: '',
      checkbox2: '',
      textFields: [
        { 
          label1: 'date of the course', 
          value1: '',
          label2: 'available spots',
          value2: ''
        },
       
      ],
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
    sendData () {
      console.log(this.textFields, this.businessName,)
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
        this.sendData()
      }
    },
    add () {
        this.textFields.push({ 
          label1: 'date of the course', 
          value1: '',
          label2: 'available spots',
          value2: ''
        })
     },

     remove (index) {
         this.textFields.splice(index, 1)
     }
  }
}
</script>
