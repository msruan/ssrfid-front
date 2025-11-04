import { CookiesManager } from "@/cookies";
import { env as clientEnv } from "@/env/client";
import { UnauthorizedException } from "@/exceptions";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  console.log(options);
  const token = CookiesManager.authToken.get();

  if (!token) {
    throw new Error(
      `Autheticated request didn't find an API token on cookies. Did you forget to pass noAuth as true?`,
    );
  }

  const res = await fetch(`${clientEnv.NEXT_PUBLIC_SSRFID_API_URL}${path}`, {
    ...options,
    headers: {
      ...options?.headers,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new UnauthorizedException(res.statusText);
    } else {
      throw new Error(
        `API request didn't end successfull: ${res.status}, ${JSON.stringify(await res.json())}`,
      );
    }
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
