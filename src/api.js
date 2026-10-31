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

export async function fetchApiJson(path, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60_000);

  try {
    const response = await fetch(apiUrl(path), {
      ...options,
      signal: controller.signal,
    });
    const responseText = await response.text();

    let data;
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(
        `Backend se valid response nahi aaya (HTTP ${response.status}). Render service aur deployment check karo.`,
      );
    }

    return { response, data };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "Backend start hone mein zyada time le raha hai. Thodi der baad dobara try karo.",
      );
    }

    if (error.message === "Failed to fetch") {
      throw new Error(
        "Backend se connection nahi ho pa raha. Render service status check karo aur dobara try karo.",
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
