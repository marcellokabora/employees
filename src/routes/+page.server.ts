import type { PageServerLoad } from "./$types";
import * as db from "$lib/server/database";

export const load: PageServerLoad = async ({ cookies }) => {
  const employees = await db.getEmployees();
  return {
    employees: employees ? employees : [],
    total: 5000, // missing api call
  };
};

export const actions = {
  add: async ({ request }) => {
    const data = await request.formData();
    db.postTotalEmployees(Number(data.get("total")));
  },
  more: async () => {
    db.moreEmployees();
  },
};
