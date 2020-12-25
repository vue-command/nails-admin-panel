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

};
