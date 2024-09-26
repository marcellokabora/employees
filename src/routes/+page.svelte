<script lang="ts">
  import Cart from "$lib/components/Cart.svelte";
  import type { Employee } from "$lib/module";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let items: Employee[] = [];
  let loading = true;
  let pagination = 50;
  let moreEmployees: number;
  let listEmployees: any;

  $: if (data) {
    items = data.employees;
    loading = false;
  }

  function showMore() {
    if (data.total > pagination) {
      pagination += 50;
      loading = true;
      setTimeout(function () {
        let more: Employee[] = [];
        for (let index = 0; index < 50; index++) {
          more = [{ id: Date.now(), status: index % 2 == 0 }, ...more];
        }
        items = [...items, ...more];
        loading = false;
      }, 1000);
    }
  }

  onMount(() => {
    if (listEmployees) {
      listEmployees.addEventListener("scroll", function () {
        if (
          listEmployees.scrollTop + listEmployees.clientHeight >=
          listEmployees.scrollHeight
        ) {
          showMore();
        }
      });
    }
  });

  function addEmployee() {
    data.total += moreEmployees;
    items = [];
    listEmployees.scrollIntoView(0);
    listEmployees.scrollTop = 0;
    pagination = 50;
    let items1: Employee[] = [];
    for (let index = 0; index < moreEmployees; index++) {
      items1 = [{ id: Date.now(), status: index % 2 == 0 }, ...items1];
    }
    items = items1;
  }
</script>

<svelte:head>
  <title>doinstruct</title>
  <meta name="description" content="doinstruct Coding Aufgabe" />
</svelte:head>

<section>
  <Cart>
    <svelte:fragment slot="header">
      <form on:submit|preventDefault={addEmployee}>
        <label>
          <span>Anzahl der Mitarbeiter die angelegt werden</span>
          <input
            disabled={loading}
            name="description"
            bind:value={moreEmployees}
            autocomplete="off"
            required
            placeholder=""
            type="number"
            min="350"
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
          {#each items as item, index}
            <tr class:isodd={index % 2}>
              <td>{index}</td>
              <td>Abigayle</td>
              <td>Mills</td>
              <td>
                <span class="status" class:active={item.status}
                  >{item.status ? "Aktiv" : "Inaktiv"}</span
                ></td
              >
              <td>August 7, 2017</td>
            </tr>
          {/each}
        </tbody>
      </table>
      {#if loading}
        <div class="imloading">
          <img src="/loading.svg" alt="loading" />
        </div>
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="footer">
      <div class="footer">
        <span>
          {pagination} geladen von {data.total}
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
    .imloading {
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
