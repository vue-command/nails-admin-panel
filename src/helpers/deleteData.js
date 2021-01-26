export default async (path) => {
  const response = await (
    await fetch(`${process.env.VUE_APP_API_URL}/${path}`, {
      method: 'DELETE',
      // headers: {
      //   'Content-Type': 'application/json;charset=utf-8',
      //   Authorization: process.env.VUE_APP_AUTHORIZATION_KEY
      // }
    })
  ).json();

  return response;
};
