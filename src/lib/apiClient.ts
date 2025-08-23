// lib/api.ts
import ky from "ky";
import Cookies from "js-cookie";
export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token =
          typeof window !== "undefined" ? Cookies.get("token") : null;
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_req, _opts, res) => {
        if (res.status === 401) {
          Cookies.remove("token");
        }
      },
    ],
  },
});
