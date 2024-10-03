import type { PageServerLoad } from "./$types";
import * as db from "$lib/server/database";

export const load: PageServerLoad = async () => {
  const employees = await db.getEmployees();
  return {
    employees: employees ? employees : [],
  };
};

export const actions = {
  add: async ({ request }) => {
    const data = await request.formData();
    const genre = String(data.get("genre"));
    db.findGenre(genre);
  },
  more: async () => {
    db.addMore();
  },
};
