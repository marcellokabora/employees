const API = "https://cms-api.doinstruct-test.com";
const username = "marcello-annicchiarico-api@doinstruct.de";
const password =
  "CW81G!nLd$b@o*jF7KM7ZjnFwsOz$1jkNZYd*ZG^7cPlb54masby6z@EQmQMwTK5";
const credentials = btoa(`${username}:${password}`);
const headers = new Headers({
  Authorization: `Basic ${credentials}`,
  "x-api-key": "wNf1B_ZSnnJu6Gv8s-SQ8hTd0TVS9bcEww7S3PH_KS0",
});

export async function getData() {
  try {
    const response = await fetch(`${API}/employees?offset=${0}&limit=${50}`, {
      method: "GET",
      headers: headers,
      // body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error connecting to endpoint:", error);
    return null;
  }
}
