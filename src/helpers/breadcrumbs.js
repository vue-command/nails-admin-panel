export function breadcrumbsFactory() {
  return function createBreadcrumbs() {
    const routes = [
      //! Home
      {
        id: 0,
        parentId: null,
        path: '/',
        name: 'home',
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
      //! Users
      {
        id: 40,
        parentId: 0,
        path: '/users',
        name: 'users',
        text: `Users`,
      },
      //! Orders
      {
        id: 50,
        parentId: 0,
        path: '/orders',
        name: 'orders',
        text: `Orders`,
      },
      //! Delivery
      {
        id: 50,
        parentId: 0,
        path: '/delivery',
        name: 'delivery',
        text: `Delivery`,
      },
      //! Commodities
      {
        id: 60,
        parentId: 0,
        path: '/commodities',
        name: 'commodities',
        text: `Commodities`,
      },
      {
        id: 61,
        parentId: 60,
        path: `/commodities/${this.commodityId}`,
        name: 'commodity-edit',
        text: this.commodityName,
      },
      {
        id: 62,
        parentId: 60,
        path: '/commodities/create',
        name: 'commodity-create',
        text: 'New commodity',
      },
      //! Categories
      {
        id: 70,
        parentId: 0,
        path: '/categories',
        name: 'categories',
        text: `Categories`,
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
