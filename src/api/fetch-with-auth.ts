"use server";

import { redirect } from "next/navigation";
import { AppRoutes, DEFAULT_HEADERS } from "@/constants";
import { env } from "@/env/server";
import { ExternalAPIException, NetworkFetchException } from "@/exceptions";
import { AuthCookies } from "./cookies";

// import { refreshTokenAction } from "./mutations";

const BACKEND_URL = env.INTERNAL_SSRFID_API_URL;

type QueryClient = (
  endpoint: string,
  options?: RequestInit & { skipErrorOnThisCodes?: number[] },
) => Promise<Response | ExternalAPIException | NetworkFetchException>;

/**
 * Faz requisições de Client Components via Server Actions, adicionando o access-token.
 */
export const fetchWithAuth: QueryClient = async (
  endpoint: string,
  options?: RequestInit & { skipErrorOnThisCodes?: number[] },
) => {
  const UNAUTHORIZED = 401;

  const onLogout = async () => {
    await AuthCookies.deleteToken();
    redirect(AppRoutes.login);
  };

  const skipError = (statusCode: number) =>
    options?.skipErrorOnThisCodes?.includes(statusCode);

  function request(token: string | null) {
    return fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: `Bearer ${token}`,
        ...options?.headers,
      },
    });
  }

  const accessToken: string | null = await AuthCookies.getAcessToken();

  let firstResponse: Response = new Response(null, { status: UNAUTHORIZED });

  if (accessToken) {
    try {
      firstResponse = await request(accessToken);
    } catch (err) {
      return new NetworkFetchException(`Netowrk error during fetch: ${err}`);
    }

    if (firstResponse.ok || skipError(firstResponse.status)) {
      return firstResponse;
    }
  }

  if (!accessToken || firstResponse.status === UNAUTHORIZED) {
    // const refresh = await refreshTokenAction();

    // if (!refresh.success || typeof refresh.token !== "string") {
    await onLogout();
    // }

    // let retryResponse: Response;

    // try {
    //   retryResponse = await request(refresh.token);
    // } catch (err) {
    //   return new NetworkFetchException(`Netowrk error during fetch: ${err}`);
    // }

    // if (retryResponse.ok || skipError(retryResponse.status)) {
    //   return retryResponse;
    // }

    // if (retryResponse.status === UNAUTHORIZED) {
    //   await onLogout();
    // }
    // return new ExternalAPIException(
    //   `Response from API was not ok: ${retryResponse.status}`,
    // );
  }

  return new ExternalAPIException(
    `Response from API was not ok: ${firstResponse.status}`,
  );
};
