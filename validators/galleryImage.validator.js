// Site-relative path ("/images/...") or an absolute http(s) URL.
const isImageUrl = (v) => typeof v === 'string' && v.length <= 500 && /^(\/[^\s]*|https?:\/\/[^\s]+)$/.test(v)

// Same rules for POST and PATCH: imageUrl is always required; title is optional and null clears it.
export function validateGalleryImage({ imageUrl, title } = {}) {
  const errors = {}
  if (typeof imageUrl !== 'string' || !imageUrl.trim()) errors.imageUrl = 'Image is required'
  else if (!isImageUrl(imageUrl.trim()))
    errors.imageUrl = 'imageUrl must be a path starting with "/" or an http(s) URL (max 500 characters)'

  if (title !== undefined && title !== null) {
    if (typeof title !== 'string') errors.title = 'title must be text'
    else if (title.trim().length > 200) errors.title = 'title must be at most 200 characters'
  }
  return errors
}
