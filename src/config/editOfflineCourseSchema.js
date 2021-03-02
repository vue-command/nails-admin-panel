export default {
  sideLeft: {
    // businessName: {
    //   label: 'Business name',
    //   type: 'text',
    //   required: true,
    // },
    category: {
      label: 'Category',
      type: 'text',
      required: true,
    },
    nameOfCourse: {
      label: 'Name of Course',
      type: 'text',
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
      limit: 250,
      required: true,
    },
    dateOfCourses: {
      label: 'Date of course',
      type: 'dateCourse',
    },
  },
  sideRight: {
    thisCourseIsSuitableFor: {
      label: 'This course is suitable for',
      type: 'suitable',
      limit: 100,
      required: true,
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
      required: false,
    },
  },
};
