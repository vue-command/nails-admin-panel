export default {
  offline: {
    get: 'course/offline',
    post: 'course/new/offline',
    put: 'course/offline',
    delete: 'course/offline',
  },
  online: {
    get: 'course/online',
    get_videos: 'course/online/video',
    get_video: 'course/online/findvideo',
    post: '',
    put: '',
    patch: '/course/online/set-published',
    delete: '',
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
    newCommodity: '/shop/new/commodity',
    addFiles: 'shop/commodity/files',
    deleteFile: 'shop/commodity/files',
    newSubcategory: 'Fshop/file',
  },
};
