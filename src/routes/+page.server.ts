import { getData } from "$lib/server/database";
import type { Employee } from "$lib/module";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const data = await getData();
  console.log(data);

  let employees: Employee[] = [];
  for (let index = 0; index < 50; index++) {
    employees = [
      { id: Date.now().toString(), status: index % 2 == 0 ? "open" : "close" },
      ...employees,
    ];
  }
  return {
    employees,
    total: 500,
  };
};
