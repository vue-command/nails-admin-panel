export default function (video) {
  if (!video) return null;

  if (video.coverImg instanceof File) return URL.createObjectURL(video.coverImg);

  return video?.coverImg?.link ?? null;
}
