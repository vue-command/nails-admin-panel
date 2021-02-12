export default async (path, payload) => {
  const data = payload instanceof FormData
  ? {
      method: 'PUT',
      body: payload
    }
  : {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(payload)
    }
  const response = await (
    await fetch(`${process.env.VUE_APP_API_URL}/${path}`, data)
  ).json();

  return response;
};
