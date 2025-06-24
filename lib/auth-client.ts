import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001", // Base URL of your Better Auth backend. (almost certain this won't work with using ngrok)
  plugins: [
    expoClient({
      scheme: "picksleaguesmobile",
      storagePrefix: "picksleaguesmobile",
      storage: SecureStore,
    }),
  ],
});
