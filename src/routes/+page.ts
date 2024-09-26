import type { Employee } from "$lib/module";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  let employees: Employee[] = [];
  for (let index = 0; index < 50; index++) {
    employees = [{ id: Date.now(), status: index % 2 == 0 }, ...employees];
  }
  return {
    employees,
    total: 100,
  };
};
