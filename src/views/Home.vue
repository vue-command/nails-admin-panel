<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6" lg="6">
        <v-card
          v-for="item in homeSchema.sideLeft"
          :key="item.routeName"
          class="mx-auto ma-5"
          max-width="344"
          outlined
          @click="goTo(item.routeName)"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1"> {{ item.text }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="6" lg="6">
        <v-card
          v-for="item in homeSchema.sideRight"
          :key="item.routeName"
          class="mx-auto ma-5"
          max-width="344"
          outlined
          @click="goTo(item.routeName)"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1"> {{ item.text }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import homeSchema from '@/config/homeRoutingSchema'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      homeSchema,
    };
  },
  methods: {
    goTo(name) {
      this.$router.push({ name });
    },
  },
};
</script>
