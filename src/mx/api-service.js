export async function postData(env, endpoint, data) {
  try {
    // TODO: setup real URLs when backend is ready, for now we use localhost
    const host = env === "production" ? "" : "http://localhost:3017";
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
