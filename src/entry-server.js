// import { createApp } from './app';

// export default (context) => new Promise((resolve, reject) => {
//   const { app, router } = createApp();

//   router.push(context.url);
//   // eslint-disable-next-line consistent-return
//   router.onReady(() => {
//     const matchedComponents = router.getMatchedComponents();
//     // нет подходящих маршрутов, отклоняем с 404
//     if (!matchedComponents.length) {
//       // eslint-disable-next-line prefer-promise-reject-errors
//       return reject({ code: 404 });
//     }

//     // Promise должен разрешиться экземпляром приложения, который будет отрендерен
//     resolve(app);
//   }, reject);
// });
