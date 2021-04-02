export default {
  users: {
    findByHash: 'user/findByHash',
    find: 'user/find',
  },
  orders: {
    get: 'order',
    patch: 'order'
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
    put:'shop/category',
    delete:'shop/category'
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
  delivery: {
    get: 'delivery-prices',
    put: 'delivery-prices',
  },
};
