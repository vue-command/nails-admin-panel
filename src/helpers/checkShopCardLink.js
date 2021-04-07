export default function (card) {
  if (!card) return '';

  if (card.previewImage instanceof File) return URL.createObjectURL(card.previewImage);

  if (Array.isArray(card.previewImage) && card.previewImage.length) return card.previewImage[0]?.link;
  return '';
}
