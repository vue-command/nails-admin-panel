export default {
  user: {
    findByHash: 'user/findByHash',
  },
  offline: {
    get: 'course/offline',
    post: 'course/new/offline',
    put: 'course/offline',
    delete: 'course/offline',
  },
  online: {
    get: 'course/online',
    findvideo: 'course/online/findvideo',
    post: 'course/new/online',
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
    newCategory: 'shop/new/category',
    newSubcategory: 'shop/new/subcategory',
  },
  commodities: {
    commodities: 'shop/commodities',
    commodity: 'shop/commodity',
    subcommodities: 'shop/subcommodities',
    search: 'shop/search',
    newCommodity: 'shop/new/commodity',
    files: 'shop/commodity/files',
    file: 'shop/file',
  },
};
