export function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string
): string {
  const anyError = error as any;
  return anyError?.response?.data?.message ?? fallbackMessage;
}
