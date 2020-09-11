<template>
  <v-card dark class="cardfone ma-16" width="350" min-height="360">
    <v-img :src="img" contain />
    <v-card-title class="buttons--text pa-0 pl-4 pt-4">
       {{accessDays}} days | $ {{ price }}
    </v-card-title>
    <v-card-title class="pa-0 pl-4">
       {{ name }}
    </v-card-title>
     <v-card-text class="pa-0 pl-4 pb-4">
        {{subtitle}}
     </v-card-text>
  </v-card>
</template>

<style scoped>
</style>

<script>

export default {
  name: 'course-card',
  props: ['img', 'name', 'price', 'id', 'offline', 'online', 'subtitle', 'accessDays'],
  data () {
    return {
    }
  },
  methods: {
    detailOfflineInfo () {
      this.$router.push({ name: 'course-offline', params: { id: this.id } })
    },
    detailOnlineInfo () {
      this.$router.push({ name: 'course-online', params: { id: this.id } })
    },
    payDetail () {
      this.$router.push({ name: 'personal-data' })
    }
  }
}
</script>
