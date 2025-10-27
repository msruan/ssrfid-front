import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    INTERNAL_SSRFID_API_URL: z.url(),
  },
  client: {},
  experimental__runtimeEnv: process.env,
});
