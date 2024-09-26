export async function getData() {
  const token = localStorage.getItem("authToken"); // Or however you store it

  if (!token) {
    // Handle unauthenticated state (e.g., redirect to login)
    return;
  }

  try {
    const response = await fetch("https://cms-api.doinstruct-test.com ", {
      method: "GET", // Or POST, PUT, DELETE, etc.
      headers: {
        Authorization: `Bearer ${token}`, // Common format
        "Content-Type": "application/json", // If sending JSON data
        // "X-API-KEY": "key",
      },
      // body: JSON.stringify({ ... }), // If sending data with POST/PUT
    });

    if (response.ok) {
      return await response.json();
    } else {
      // Handle API errors (e.g., 401 Unauthorized, 403 Forbidden)
    }
  } catch (error) {
    // Handle network errors
    console.error("Error fetching data:", error);
  }
}
