import type { PageServerLoad } from "./$types";
import * as db from "$lib/server/database";

export const load: PageServerLoad = async () => {
  // const data = await db.getData(); // Error Authorization !!
  return {
    employees: db.getFakeData(),
    total: db.getTotalFakeData(),
  };
};

export const actions = {
  add: async ({ request }) => {
    await new Promise((fulfil) => setTimeout(fulfil, 1000));
    const data = await request.formData();
    db.createEmployees(Number(data.get("total")));
  },
  more: async ({ request }) => {
    await new Promise((fulfil) => setTimeout(fulfil, 1000));
    db.addFakeData();
  },
};
