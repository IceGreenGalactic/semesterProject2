import { load } from "../storage/token.mjs";

export const apiKey = "db837409-4611-42f2-bb4d-fd1874502200";

export function headers() {
  const accessToken = load("accessToken");

  if (!accessToken) {
    throw new Error("Access token not found. Please log in.");
  }
  return { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}`, "X-Noroff-API-Key": apiKey };
}

export async function authFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: headers(),
    });

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("failed to fetch data. Please try again later");
  }
}
