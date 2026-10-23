// The fixed message sent by the dashboard's "Auto reply" button. Edit the text here.
// {name} is replaced with the visitor's name.
export const autoReply = {
  subject: 'Thank you for your message',
  body: `Dear {name},

Thank you for reaching out through my website. I have received your message and will get back to you as soon as possible.

Kind regards`,
}

export function renderAutoReply(name) {
  return { subject: autoReply.subject, body: autoReply.body.replaceAll('{name}', name) }
}
