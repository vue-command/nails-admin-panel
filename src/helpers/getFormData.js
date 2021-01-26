export default data => {
  const formData = new FormData();
  Object.keys(data).map(key => {
    formData.append(key, data[key]);
  });
  return formData;
};
