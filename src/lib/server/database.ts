import type { Employee } from "$lib/module";

const API = "https://cms-api.doinstruct-test.com";
const headers = new Headers({
  Authorization:
    "eyJraWQiOiJraXlvYUxCUzhGUEg4YnFaMHc5V3Y2VTljR0dwSWZrTFJEUlZuVG53eWlJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmNzJlMzk4Yy0yNWQ0LTQzZDMtYTQ4ZS1jMGI1OTUzNGU2MTMiLCJjb2duaXRvOmdyb3VwcyI6WyJhcGkiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpjbGllbnRJZCI6IjQxMTBmYWNiLWUyNGUtNGRiZi04MThjLTE2NDQ4MzAwZDI3ZiIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xXzM3TFJrdVZadCIsImN1c3RvbTpvcmlnaW5hbENsaWVudElkIjoiNDExMGZhY2ItZTI0ZS00ZGJmLTgxOGMtMTY0NDgzMDBkMjdmIiwiY29nbml0bzp1c2VybmFtZSI6IjQ4MTE4YTkzLTcwOWMtNDEyNS1iMGE5LTRkYzJkNmMyMjY3MiIsImxvY2FsZSI6ImRlIiwib3JpZ2luX2p0aSI6ImM1OGM0ZTZiLWNlYWUtNDg3Ni1iMzcxLWI0NWVkOGIwMjdlNyIsImF1ZCI6ImlrY2tqajRsZWM3NGs1YmlubnEzNGhia3AiLCJldmVudF9pZCI6IjFiM2VlMDc3LTBlMDYtNDhmYi1iMjIxLWZiZjFhNzNmNGVmNyIsInRva2VuX3VzZSI6ImlkIiwic2NvcGUiOiJjbGllbnRTZXR0aW5nc1wvd3JpdGUgZW1wbG95ZWVzXC9yZWFkIGVtcGxveWVlc1wvd3JpdGUgZXh0ZXJuYWwtbGVzc29uc1wvcmVhZCBleHRlcm5hbC1sZXNzb25zXC93cml0ZSBpbnZvaWNlc1wvcmVhZCBsZXNzb25zXC9yZWFkIGxlc3NvbnNcL3dyaXRlIG1lZGlhXC9yZWFkIG1lZGlhXC93cml0ZSB0cmFuc2xhdGlvbnNcL3JlYWQiLCJhdXRoX3RpbWUiOjE3Mjc1NDUwOTQsImN1c3RvbTphcGlLZXkiOiIxOGNmNGMwNGQzOTY5YzdjNWVjYjkyZTNhZDUwNmQ3ZDc2YmNjYWEzNzllOGVkNGNiYTYzNjhiOTQ2NTFlMGRhIiwibmFtZSI6Ik1hcmNlbGxvIEFubmljY2hpYXJpY28iLCJjdXN0b206dmVydGljYWxJZHMiOiJmb29kIiwiZXhwIjoxNzI3NTQ4Njk0LCJpYXQiOjE3Mjc1NDUwOTQsImp0aSI6ImMyNTQ0YTkzLWUxYmEtNDBjMy04ZDA0LWFmNGY0OTUzMzRmMCIsImVtYWlsIjoibWFyY2VsbG8tYW5uaWNjaGlhcmljby1hcGlAZG9pbnN0cnVjdC5kZSJ9.SJi4WD8ebbH75kca_uXt2KKckaAukakYhPookEVlae5i-mE4Rzd4yrjoW5fTxM1W9TOfimfSS1QlsjSOUF43aA-Oqoe_U7pkUVB-eeRBB-hRsWVeb-qBf4Ny9_dwxZSurKtfp6gqceqKWqDRGYdLxs6dUVCYue3jjHe_6XqcmC5UrtZCNFjWaWFRJ08WayQ-eHQv4TLrJO-zWOJkRI3-84HxX87je3AEvK7zFYF8VZT_YZRT4CM0NhhfeSFtzS73uNuXkDjuxgrW7X-F2HV7ZQtv2TzKe1VSoYqFQCVS6l-x3tJluWTtTX4C6ijtALgug8exep_8ZaWJO_RvDe8GSQ",
  "x-api-key": "wNf1B_ZSnnJu6Gv8s-SQ8hTd0TVS9bcEww7S3PH_KS0",
  "Content-Type": "application/json",
});
const ratio = 50;
let offset = 0;
let employees: Employee[] = [];

export async function postTotalEmployees(total: number) {
  let promises = [];
  for (let i = 1; i <= total; i++) {
    promises.push(postEmployees());
  }
  return Promise.all(promises)
    .then(function handleData(data) {
      return postEmployeesBulkImport(data);
    })
    .catch(function handleError(error) {
      console.error("Error" + error);
    });
}

export async function postEmployees() {
  try {
    const response = await fetch(`${API}/employees`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(addEmployee()),
    });
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

export async function postEmployeesBulkImport(rows: any[]) {
  try {
    const response = await fetch(`${API}/employees/bulk/import`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        rows: rows,
      }),
    });
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

export async function getEmployees() {
  try {
    const response = await fetch(
      `${API}/employees?offset=${offset}&limit=${ratio}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return (employees = [...employees, ...data.rows]);
  } catch (error) {
    console.error("Error connecting to endpoint:", error);
    return null;
  }
}

export async function moreEmployees() {
  offset += ratio;
}
export async function init() {
  offset = 0;
}

function addEmployee(): Employee {
  return {
    active: Boolean(Math.random() < 0.5),
    firstName: "Marcello " + String(Math.floor(Math.random() * 10000)),
    language: "it",
    lastName: "Annicchiarico",
  };
}
