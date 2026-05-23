export function generateRecoveryCode() {
  return `MW26-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
