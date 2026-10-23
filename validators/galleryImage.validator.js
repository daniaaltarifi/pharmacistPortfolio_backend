// Site-relative path ("/images/...") or an absolute http(s) URL.
const isImageUrl = (v) => typeof v === 'string' && v.length <= 500 && /^(\/[^\s]*|https?:\/\/[^\s]+)$/.test(v)

// Same rules for POST and PATCH: imageUrl is the only field, so it is always required.
export function validateGalleryImage({ imageUrl } = {}) {
  const errors = {}
  if (typeof imageUrl !== 'string' || !imageUrl.trim()) errors.imageUrl = 'Image is required'
  else if (!isImageUrl(imageUrl.trim()))
    errors.imageUrl = 'imageUrl must be a path starting with "/" or an http(s) URL (max 500 characters)'
  return errors
}
