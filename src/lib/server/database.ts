import type { Employee } from "$lib/module";

const API = "https://cms-api.doinstruct-test.com";
const username = "marcello-annicchiarico-api@doinstruct.de";
const password =
  "CW81G!nLd$b@o*jF7KM7ZjnFwsOz$1jkNZYd*ZG^7cPlb54masby6z@EQmQMwTK5";
const credentials = btoa(`${username}:${password}`);
const headers = new Headers({
  Authorization: `Basic ${credentials}`,
  "x-api-key": "wNf1B_ZSnnJu6Gv8s-SQ8hTd0TVS9bcEww7S3PH_KS0",
});

const db = new Map();

export async function getData() {
  try {
    const response = await fetch(
      `${API}/employees?offset=${
        db.get("doinstruct").employees.lenght
      }&limit=${50}`,
      {
        method: "GET",
        headers: headers,
        // body: JSON.stringify({}),
      }
    );
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

export function getFakeData(pagination = 50) {
  if (!db.get("doinstruct")) {
    let employees: Employee[] = [];
    for (let index = 0; index < pagination; index++) {
      employees = [addEmployee(), ...employees];
    }
    db.set("doinstruct", {
      employees: employees,
    });
  }
  return db.get("doinstruct");
}

export function addFakeData(pagination = 50) {
  const data = db.get("doinstruct");
  for (let index = 0; index < pagination; index++) {
    data.employees = [addEmployee(), ...data.employees];
  }
}

export function createEmployees(total = 350) {
  let rows: Employee[] = [];
  for (let index = 0; index < total; index++) {
    rows = [addEmployee(), ...rows];
  }
  // API /employees/bulk/import
  // reset employees list
}

export function getTotalFakeData() {
  return 500;
}

function addEmployee(): Employee {
  return {
    active: Math.random() >= 0.5,
    firstName: "Marcello",
    lastName: "Annicchiarico",
    language: "IT",
    created: new Date().toDateString(),
  };
}
