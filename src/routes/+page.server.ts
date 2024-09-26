import type { PageServerLoad } from "./$types";
import * as db from "$lib/server/database";

export const load: PageServerLoad = async () => {
  const data = await db.getData(); // Error Authorization !!

  return {
    employees: db.getFakeData(),
    total: db.getTotalFakeData(),
  };
};

export const actions = {
  add: async ({ request }) => {
    await new Promise((fulfil) => setTimeout(fulfil, 1000));
    const data = await request.formData();
    db.addFakeData(Number(data.get("employees")));
  },
  more: async ({ request }) => {
    await new Promise((fulfil) => setTimeout(fulfil, 1000));
    const data = await request.formData();
    const limit = data.get("limit");
    const offset = data.get("offset");
    db.addFakeData();
  },
};
