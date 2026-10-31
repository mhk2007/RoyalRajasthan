const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

export const API_BASE_URL =
  configuredApiUrl ||
  (import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://royalrajasthan-6g4o.onrender.com");

export function apiUrl(path) {
  if (!API_BASE_URL) {
    throw new Error(
      "Backend URL is not configured. Set VITE_API_URL in Vercel and redeploy the site.",
    );
  }

  return `${API_BASE_URL}${path}`;
}
