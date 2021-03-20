export function breadcrumbsFactory() {
  return function createBreadcrumbs() {
    const routes = [
      //! Home
      {
        id: 0,
        parentId: null,
        path: '/',
        name: 'Home',
        text: `Home`,
      },
      //! Online courses
      {
        id: 21,
        parentId: 0,
        path: '/online-courses',
        name: 'online-courses',
        text: `Online courses`,
      },
      {
        id: 22,
        parentId: 21,
        path: '/online-courses/create-online-course',
        name: 'create-online-course',
        text: `Create online course`,
      },
      {
        id: 23,
        parentId: 21,
        path: `/online-courses/${this.courseId}`,
        name: 'online-course',
        text: `${this.courseName}`,
      },
      {
        id: 24,
        parentId: 23,
        path: `/online-courses/${this.courseId}/videos`,
        name: 'online-course-lessons',
        text: `Online course lessons`,
      },
      {
        id: 25,
        parentId: 24,
        path: `/online-courses/${this.courseId}/videos/${this.lessonId}`,
        name: 'online-course-lesson',
        text: `${this.lessonName}`,
      },
      //! Offline courses
      {
        id: 30,
        parentId: 0,
        path: '/offline-courses',
        name: 'offline-courses',
        text: `Offline courses`,
      },
      {
        id: 32,
        parentId: 30,
        path: `/courses-offline/create-online-course`,
        name: 'create-offline-course',
        text: `Create online course`,
      },
      {
        id: 31,
        parentId: 30,
        path: `/courses-offline/${this.courseId}`,
        name: 'offline-course',
        text: `${this.offlineCourseName}`,
      },
    ];

    function search(current) {
      if (!current) return [];
      return [current].concat(search(routes.find(route => route.id === current.parentId)));
    }
    const currentRoute = routes.find(route => route.name === this.routeName);
    if (!currentRoute) return [];

    return search(currentRoute);
  };
}
