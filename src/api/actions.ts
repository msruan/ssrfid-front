"use server";

import { CookiesManager } from "@/cookies";
import { env } from "@/env/client";
import type { APIErrorDTO, LoginRequestDTO, LoginResponseDTO } from "@/types";

export async function loginAction(
  credentials: LoginRequestDTO,
): Promise<{ message: string; success: boolean }> {
  const formData = new URLSearchParams();

  for (const [key, value] of Object.entries(credentials)) {
    formData.append(key, value);
  }

  const res = await fetch(`${env.NEXT_PUBLIC_SSRFID_API_URL}/auth/login`, {
    body: formData.toString(),
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    const error: APIErrorDTO = await res.json();
    return { message: error.detail, success: false };
  }

  const body: LoginResponseDTO = await res.json();

  await CookiesManager.authToken.set(body.access_token);

  return { message: "Logado com sucesso! Redirecionando...", success: true };
}

export async function logoutAction(){
  await CookiesManager.authToken.delete()
}