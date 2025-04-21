export function maskEmail(email: string): string {
  const [localPart, domainPart] = email.split('@');

  if (!localPart || !domainPart) {
    return 'Invalid email';
  }

  const maskedLocal = localPart.slice(0, 5) + '...';

  const domainName = domainPart.split('.')[0]; // Removes .com, .org, etc.
  const maskedDomain = '@' + domainName + '...';

  return maskedLocal + maskedDomain;
}
