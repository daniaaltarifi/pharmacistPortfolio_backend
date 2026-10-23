// Custom reply written by the admin.
export function validateContactReply({ subject, body } = {}) {
  const errors = {}

  if (typeof subject !== 'string' || !subject.trim()) errors.subject = 'Subject is required'
  else if (subject.trim().length > 200) errors.subject = 'Subject must be at most 200 characters'
  // Line breaks in a subject could inject extra email headers.
  else if (/[\r\n]/.test(subject)) errors.subject = 'Subject must be a single line'

  if (typeof body !== 'string' || !body.trim()) errors.body = 'Message is required'
  else if (body.trim().length > 10000) errors.body = 'Message must be at most 10000 characters'

  return errors
}
