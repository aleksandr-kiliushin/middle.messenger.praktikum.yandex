export const isCurrentPathnameProtected = () => {
  if (window.location.pathname === "/") return false
  if (window.location.pathname.startsWith("/sign-up")) return false
  return true
}
