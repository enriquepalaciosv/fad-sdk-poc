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
      return {
        error: "Id Validation Service API did not return OK [200]",
        status: response.status,
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    if (error.name === "AbortError") {
      return {
        error: `Id Validation Service API timed out after ${MAX_SECONDS} seconds`,
      };
    }
    return {
      error: "Unexpected error with Id Validation Service API",
      message: error.message,
    };
  }
}
