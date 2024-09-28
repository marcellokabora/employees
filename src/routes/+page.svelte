<script lang="ts">
  import Cart from "$lib/components/Cart.svelte";
  import { onMount } from "svelte";
  import type { PageServerData } from "./$types";
  import { enhance } from "$app/forms";
  import type { Employee } from "$lib/module";

  export let data: PageServerData;

  let employees: Employee[] = [];
  let loading = false;
  let listEmployees: any;
  let formPagination: any;

  $: if (data.employees) employees = [...employees, ...data.employees];

  onMount(() => {
    if (listEmployees) {
      listEmployees.addEventListener("scroll", function () {
        if (
          listEmployees.scrollTop + listEmployees.clientHeight >=
            listEmployees.scrollHeight &&
          employees.length < data.total
        ) {
          formPagination.requestSubmit();
        }
      });
    }
  });
</script>

<svelte:head>
  <title>doinstruct</title>
  <meta name="description" content="doinstruct Coding Aufgabe" />
</svelte:head>

<section>
  <Cart>
    <svelte:fragment slot="header">
      <form
        method="POST"
        action="?/add"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            await update();
            loading = false;
          };
        }}
      >
        <label>
          <span>Anzahl der Mitarbeiter die angelegt werden</span>
          <input
            disabled={loading}
            name="total"
            autocomplete="off"
            required
            placeholder=""
            type="number"
            min="1"
          />
        </label>
        <button type="submit">Mitarbeiter anlegen</button>
      </form>
    </svelte:fragment>
    <svelte:fragment slot="body">
      <table bind:this={listEmployees}>
        <thead>
          <tr>
            <td>Personalnummer</td>
            <td>Vorname</td>
            <td>Nachname</td>
            <td>Aktiv</td>
            <td>Erstellt</td>
          </tr>
        </thead>
        <tbody>
          {#each employees as item, index}
            <tr class:isodd={index % 2}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>
                <span class="status" class:active={item.active}
                  >{item.active ? "Aktiv" : "Inaktiv"}</span
                ></td
              >
              <td>{new Date(String(item.created)).toDateString()}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <form
        method="POST"
        action="?/more"
        bind:this={formPagination}
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            await update();
            loading = false;
          };
        }}
      />
      {#if loading}
        <div class="loading">
          <img src="/loading.svg" alt="loading" />
        </div>
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="footer">
      <div class="footer">
        <span>
          {employees.length} geladen von {data.total}
          Ergebnissen
        </span>
        {#if loading}
          <span>Loading...</span>
        {/if}
      </div>
    </svelte:fragment>
  </Cart>
</section>

<style lang="scss">
  section {
    position: absolute;
    inset: 0;
    padding: 5em;
    background-color: var(--color-contrast);
    display: flex;
    align-items: center;
    justify-content: center;
    form {
      display: flex;
      align-items: end;
      gap: 1em;
      label {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        span {
          padding-right: 1em;
          font-size: 0.8em;
          color: var(--color-gray);
        }
      }
    }
    table {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-collapse: collapse;
      overflow: auto;
      position: absolute;
      inset: 0;
      thead {
        position: sticky;
        top: 0;
        background-color: var(--color-secondary);
      }
      tbody {
        flex: 1;
        color: var(--color-gray);
        tr {
          &:hover {
            td {
              background-color: var(--color-hover);
            }
          }
        }
        .isodd td {
          background-color: var(--color-contrast);
        }
        .status {
          background-color: #d4d4d4;
          padding: 4px 8px;
          border-radius: 5px;
          color: #6b716a;
          font-weight: bold;
          font-size: 0.8em;
          &.active {
            background-color: #b4dfc4;
            color: #18794e;
          }
        }
      }
      thead,
      tbody {
        tr {
          display: table;
          width: 100%;
          border-bottom: 1px solid var(--color-border);
          td {
            padding: 1em 1em;
            width: 20%;
          }
        }
      }
    }
    .loading {
      position: absolute;
      inset: 0;
      filter: opacity(0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-contrast);
      img {
        height: 50px;
      }
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--color-gray);
      font-size: 0.8em;
    }
  }
</style>
