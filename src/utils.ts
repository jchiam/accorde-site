import urlEncode from 'urlencode';

export function generateImageUrl(url: string, transformations: string) {
  if (transformations) {
    return `${process.env.CLOUDINARY_PROXY}/${transformations}/${urlEncode(url)}`;
  }
  return `${process.env.CLOUDINARY_PROXY}/${urlEncode(url)}`;
}
