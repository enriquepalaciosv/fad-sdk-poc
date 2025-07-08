export async function postData(env, endpoint, data) {
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
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}
