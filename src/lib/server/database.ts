import type { User } from "$lib/interfaces";

let search: string = "";
let users: User[] = [];
let skip = 0;
const API = "https://dummyjson.com/users";
const radio = 20;

export async function getUsers() {
  try {
    const res = await fetch(`${API}?limit=${radio}&skip=${skip}`);
    const data = await res.json();
    users = data.users;
    return users;
  } catch (error) {
    return null;
  }
}
export async function addMore() {
  skip += radio;
  getUsers();
}

export async function findUser(search: string) {
  search = search;
  getUsers();
}
