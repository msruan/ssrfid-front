import { env as clientEnv } from "@/env/client";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${clientEnv.NEXT_PUBLIC_SSRFID_API_URL}${path}`, {
    ...options,
    headers: { ...options?.headers, "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`API request didn't end successfull: ${res.status}`);
  }

  try {
    const body = await res.json();
    return body;
  } catch (err) {
    throw new Error(
      `API request erro on parse to JSON. Did you forget to pass noParseToJson as true? ${err}`,
    );
  }
}
