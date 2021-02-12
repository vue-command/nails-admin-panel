export default {
  sideLeft: {
    businessName: {
      label: 'Business name',
      type: 'text',
      required: true,
    },
    category: {
      label: 'Category',
      type: 'text',
      required: true,
    },
    nameOfCourse: {
      label: 'Name of Course',
      type: 'text',
      limit: 60,
      required: true,
    },
    subtitle: {
      label: 'Subtitle',
      type: 'text',
      limit: 60,
      required: true,
    },
    accessDays: {
      label: 'Access (days)',
      type: 'number',
      limit: 3,
      required: true,
    },
    price: {
      label: 'Price',
      type: 'number',
      limit: 5,
      required: true,
    },
    author: {
      label: 'Author',
      type: 'text',
      required: true,
    },
    instructor: {
      label: 'Instructor',
      type: 'text',
      required: true,
    },
    infoForBonus: {
      label: 'Info for bonus',
      type: 'text',
      required: true,
      limit: 250,
    },
  },
  sideRight: {
    thisCourseIsSuitableFor: {
      label: 'This course is suitable for',
      type: 'suitable',
      required: true,
      limit: 100,
    },
    description: {
      label: 'Description',
      type: 'textarea',
      limit: 2000,
      required: true,
    },
    photo: {
      label: 'Cover picture',
      type: 'file',
      icon: 'mdi-camera',
      accept: 'image/png, image/jpeg, image/bmp',
      size: 10000,
      required: true,
    },
  },
};
