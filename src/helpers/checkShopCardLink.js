export default function (card) {
  if (!card) return '';

  // if (course.photo instanceof File) return URL.createObjectURL(course.photo);

  if (Array.isArray(card.previewImage) && card.previewImage.length) return card.previewImage[0]?.link;
  return '';
}
