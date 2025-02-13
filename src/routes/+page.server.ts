import type { PageServerLoad } from "./$types";
import * as db from "$lib/server/database";
import type { User } from "$lib/interfaces";

let users: User[] = [];
let filterd: User[] = [];
let search = "";

export const load: PageServerLoad = async () => {
  const data = await db.getUsers();
  if (data) users = [...users, ...data];
  return {
    users: users,
  };
};

export const actions = {
  add: async ({ request }) => {
    const data = await request.formData();
    search = String(data.get("genre"));
  },
  more: async () => {
    db.addMore();
  },
};
