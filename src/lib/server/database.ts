import type { Employee } from "$lib/module";
const API = "https://randomuser.me/api/";

const headers = new Headers({
  "Content-Type": "application/json",
});
let gender: string = "";
let employees: Employee[] = [];

export async function getEmployees() {
  try {
    const response = await fetch(`${API}?results=50&gender=${gender}`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(employees.length);
    return (employees = [...employees, ...data.results]);
  } catch (error) {
    return null;
  }
}
export async function addMore() {}

export async function findGenre(genre: string) {
  employees = [];
  gender = genre;
}
