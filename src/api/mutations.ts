"use server";

import { DEFAULT_HEADERS } from "@/constants";
import { env } from "@/env/server";
import type { APIErrorDTO, LoginRequestDTO, LoginResponseDTO } from "@/types";
import { AuthCookies } from "./cookies";

export async function loginAction(
  credentials: LoginRequestDTO,
): Promise<{ message: string; success: boolean }> {
  const formData = new URLSearchParams();

  for (const [key, value] of Object.entries(credentials)) {
    formData.append(key, value);
  }

  const res = await fetch(`${env.INTERNAL_SSRFID_API_URL}/auth/login`, {
    body: formData.toString(),
    method: "POST",
    headers: {
      ...DEFAULT_HEADERS,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    const error: APIErrorDTO = await res.json();
    return { message: error.detail, success: false };
  }

  const body: LoginResponseDTO = await res.json();

  await AuthCookies.setToken(body);

  return { message: "Logado com sucesso! Redirecionando...", success: true };
}

export async function logoutAction() {
  await AuthCookies.deleteToken();
}
