export default {
  users: {
    get: 'users',
  },
  orders: {
    get: 'order',
    patch: 'order',
  },
  offline: {
    get: 'course/offline',
    post: 'course/offline',
    put: 'course/offline',
    delete: 'course/offline',
  },
  online: {
    get: 'course/online',
    findvideo: 'course/online/findvideo',
    post: 'course/online',
    put: 'course/online',
    patch: 'course/online/set-published',
    delete: 'course/online',
    video: 'course/online/video',
    pdf: 'course/online/pdf',
  },
  categories: {
    categories: 'shop/categories',
    category: 'shop/category',
    subcategory: 'shop/subcategory',
    newCategory: 'shop/category',
    newSubcategory: 'shop/subcategory',
    put: 'shop/category',
    delete: 'shop/category',
  },
  commodities: {
    commodities: 'shop/commodities',
    commodity: 'shop/commodity',
    subcommodities: 'shop/subcommodities',
    search: 'shop/search',
    newCommodity: 'shop/commodity',
    files: 'shop/commodity/files',
    file: 'shop/file',
    isPublished: 'shop/set-published',
  },
  delivery: {
    get: 'delivery-prices',
    patch: 'delivery-prices',
  },
};
