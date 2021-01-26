import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      expand: 'mdi-expand-more',
      home: 'mdi-home-circle',
      back: 'mdi-arrow-left',
    },
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        // orange
        primary: '#FFC44A',
        // light gray
        secondary: '#dde',
        darkGrey: '#333333',
        buttons: '#FFC44A',
        homefone: '#ffffff',
        warning: '#FAFF00',
        // shop
        substrate: '#F4F4F4',
        secondaryGray: '#262624',
        whitefone: '#ffffff',
        shopfont: '#808080',
        // courses
        coursesGray: '#4D4D4D',
        notPaidAndPublished: '#369ab3',
      },
      dark: {
        // orange
        primary: '#FFC44A',
        // light gray
        secondary: '#dde',
        darkGrey: '#333333',
        buttons: '#FFC44A',
        homefone: '#262624',
        warning: '#FAFF00',
        secondaryGray: '#262624',
        // shop
        substrate: '#F4F4F4',
        lightFont: '#808080',
        // courses
        coursesGray: '#4D4D4D',
        notPaidAndPublished: '#369ab3',
      },
    },
  },
});
