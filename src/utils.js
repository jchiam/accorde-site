export function generateImageUrl(url, quality) {
  if (quality) {
    return `${process.env.CLOUDINARY_PROXY}/q_${quality}/${url}`;
  }
  return `${process.env.CLOUDINARY_PROXY}/${url}`;
}
