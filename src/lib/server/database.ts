import { API } from "$env/static/private";
import type { Employee } from "$lib/module";

const headers = new Headers({
  Authorization: "",
  "Content-Type": "application/json",
});
const ratio = 50;
let offset = 0;
let employees: Employee[] = [];

export async function getEmployees() {
  try {
    const response = await fetch(
      `${API}/employees?offset=${offset}&limit=${ratio}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    offset += ratio;
    const data = await response.json();
    return (employees = [...employees, ...data.rows]);
  } catch (error) {
    console.error("Error connecting to endpoint:", error);
    return null;
  }
}

export async function postTotalEmployees(total: number) {
  let promises = [];
  for (let i = 1; i <= total; i++) {
    promises.push(postEmployees());
  }
  return Promise.all(promises)
    .then(function handleData(data) {
      return postEmployeesBulkImport(data);
    })
    .catch(function handleError(error) {
      console.error("Error" + error);
    });
}

export async function postEmployees() {
  try {
    const response = await fetch(`${API}/employees`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        active: Boolean(Math.random() < 0.5),
        firstName: "Marcello " + String(Math.floor(Math.random() * 10000)),
        language: "it",
        lastName: "Annicchiarico",
      }),
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

export async function postEmployeesBulkImport(rows: any[]) {
  try {
    const response = await fetch(`${API}/employees/bulk/import`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        rows: rows,
      }),
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
