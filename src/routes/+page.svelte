<script lang="ts">
  import Cart from "$lib/components/Cart.svelte";
  import { onMount } from "svelte";

  let items: { id: number; status: boolean }[] = [];
  let loading = false;
  let pagination = 0;
  let addMore: number;
  let listEmployees: any;

  onMount(() => {
    if (listEmployees) {
      listEmployees.addEventListener("scroll", function () {
        if (
          listEmployees.scrollTop + listEmployees.clientHeight >=
          listEmployees.scrollHeight - 100
        ) {
          pagination += 50;
        }
      });
    }
  });

  function addEmployee() {
    items = [];
    listEmployees.scrollIntoView(0);
    listEmployees.scrollTop = 0;
    loading = true;
    pagination = 50;
    setTimeout(function () {
      for (let index = 0; index < addMore; index++) {
        items = [{ id: Date.now(), status: index % 2 == 0 }, ...items];
      }
      loading = false;
    }, 2000);
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
            bind:value={addMore}
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
          {#each items.slice(0, pagination) as item, index}
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
    </svelte:fragment>
    <svelte:fragment slot="footer">
      <div class="pagination">
        {pagination < items.length ? pagination : items.length} geladen von {items.length}
        Ergebnissen
      </div>
      {#if loading}
        <div class="loading">loading...</div>
      {/if}
    </svelte:fragment>
  </Cart>
</section>

<style lang="scss">
  section {
    position: absolute;
    inset: 0;
    padding: 5em;
    background-color: var(--bg-contrast-low);
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
          color: gray;
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
        background-color: var(--bg-secondary);
      }
      tbody {
        flex: 1;
        color: gray;
        tr {
          &:hover {
            td {
              background-color: var(--color-hover);
            }
          }
        }
        .isodd td {
          background-color: var(--bg-contrast-low);
        }
        .status {
          background-color: #d4d4d4;
          padding: 4px 8px;
          border-radius: 5px;
          color: #6b716a;
          font-weight: bold;
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
      bottom: 0;
      padding: 1em;
      right: 0;
    }
    .pagination {
      color: gray;
      font-size: 0.8em;
    }
  }
</style>
