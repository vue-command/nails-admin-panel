<template>
  <v-dialog v-model="dialog" max-width="480px" class="pa-4">
    <v-card flat>
      <v-toolbar dark dense color="#900">
        <v-icon class="mr-4"> $delete </v-icon>
        <v-toolbar-title> Delete </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('update:dialog', false)">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h4>Are you sure you want to delete this course?</h4>
      </v-card-text>
    </v-card>
    <v-card-actions class="homefone">
      <v-spacer></v-spacer>
      <v-btn color="buttons" text large @click="$emit('update:dialog', false)">Cancel</v-btn>
      <v-btn color="#900" text large @click="confirmDelete">OK</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-dialog>
</template>

<script>

export default {
  name: 'PopupDelete',
  props: ['dialog', 'confirmDelete'],
  methods: {
  },
};
</script>
