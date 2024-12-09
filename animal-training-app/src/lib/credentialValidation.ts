export function isValidEmail(email: string): boolean {
  if (!email) { return false; }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  if (!password) { return false; }

  return password.length >= 8;
}