<template>
  <v-navigation-drawer app v-model="localDrawer" temporary>
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="orange--text text--accent-4">
        <v-list-item v-for="item in schema" :key="item.name" @click="goTo(item.name)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      group: null,
      schema: require('@/config/navigationDrawer').default,
    };
  },
  computed: {
    localDrawer: {
      get() {
        return this.drawer;
      },
      set(val) {
        this.$emit('update:drawer', val);
      },
    },
  },
  watch: {
    group() {
      this.localDrawer = false;
    },
    $route() {
      this.setIndex();
    },
  },
  methods: {
    goTo(name) {
      if (this.$route.name !== name) this.$router.push({ name });
    },
    setIndex() {
      this.group = this.schema.findIndex(item => item.name === this.$route.name);
    },
  },
  mounted() {
    this.setIndex();
  },
};
</script>