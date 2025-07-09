import { getRollbar } from "../utils/rollbar-service.js";

export async function postData(env, endpoint, data) {
  const MAX_SECONDS = 3;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), MAX_SECONDS * 1000);

  try {
    const sandboxApi = "https://id-validation.sandbox.acima.in";
    const prodApi = "https://id-validation.acima.com"; // This might change
    const host = env === "production" ? prodApi : sandboxApi;
    const url = `${host}/${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorObj = {
        error: "Id Validation Service API did not return OK [200]",
        status: response.status,
        endpoint,
        data,
      };
      const rollbar = getRollbar();
      if (rollbar) {
        rollbar.error("API response not OK", errorObj);
      }
      return errorObj;
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    const rollbar = getRollbar();
    if (error.name === "AbortError") {
      const errorObj = {
        error: `Id Validation Service API timed out after ${MAX_SECONDS} seconds`,
        endpoint,
        data,
      };
      if (rollbar) {
        rollbar.error("API request timed out", errorObj);
      }
      return errorObj;
    }
    const errorObj = {
      error: "Unexpected error with Id Validation Service API",
      message: error.message,
      endpoint,
      data,
    };
    if (rollbar) {
      rollbar.error("Unexpected API error", errorObj);
    }
    return errorObj;
  }
}
