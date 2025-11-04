import { cookies } from "next/headers";

export const tokenCookiesKey = "auth-token";

export const CookiesManager = {
  authToken: {
    get: async () => {
      const cookiesStore = await cookies();
      return cookiesStore.get(tokenCookiesKey)?.value ?? null;
    },

    set: async (token: string) => {
      const cookiesStore = await cookies();
      const isProduction = process.env.NODE_ENV === "production";
      cookiesStore.set(tokenCookiesKey, token, {
        secure: isProduction,
        httpOnly: true,
      });
    },

    delete: async () => {
      const cookiesStore = await cookies();
      return cookiesStore.delete(tokenCookiesKey);
    },
  },
};
