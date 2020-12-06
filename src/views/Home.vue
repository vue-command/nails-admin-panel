<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6" lg="6">
        <v-card
          class="mx-auto ma-5"
          max-width="344"
          outlined
          @click="goToOfflineCourses('offline-courses-page')"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                OFFLINE COURSES
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-card>
        <v-card
          class="mx-auto ma-5"
          max-width="344"
          outlined
          @click="goToOfflineCourses('online-courses-page')"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                ONLINE COURSES
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-card>
      </v-col>
      <v-col cols="6" lg="6">
        <v-card class="mx-auto ma-5" max-width="344" outlined @click="goToShop">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Shop
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-card>
        <v-card class="mx-auto ma-5" max-width="344" outlined @click="goToShop">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Shop categories
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    goToShop() {
      this.$router.push({ name: 'ShopEdit' });
    },
    goToOfflineCourses(nameCourses) {
      this.$router.push({ name: nameCourses });
    },
  },
};
</script>
