export default function (course) {
  if (!course) return null;

  if (course.photo instanceof File) return URL.createObjectURL(course.photo);

  if (Array.isArray(course.photo) && course.photo.length) return course.photo[0]?.link;
  return null;
}
