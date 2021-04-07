export default data => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    // if (value instanceof File) formData.append('file', value);
    // else {
      formData.append(key, value);
    // }
  });
  return formData;
};
