export type Result<T, E = unknown> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export async function toResult<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const value = await promise;
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error };
  }
}
