export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function hasAdminAllowlist() {
  return getAdminEmails().length > 0
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false
  }

  const adminEmails = getAdminEmails()

  if (adminEmails.length === 0) {
    return process.env.NODE_ENV !== "production"
  }

  return adminEmails.includes(email.trim().toLowerCase())
}
