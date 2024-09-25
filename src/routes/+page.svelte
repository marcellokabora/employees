<script lang="ts">
  import { fly } from "svelte/transition";
  import { enhance } from "$app/forms";
  import Cart from "$lib/components/Cart.svelte";

  export let form;

  let creating = false;

  import { onMount, onDestroy } from "svelte";
  let listElement: any;

  let items: any[] = [];

  for (let index = 0; index < 100; index++) {
    items = [...items, `item ${index}`];
  }

  function loadMore() {
    for (var index = 0; index < 100; index++) {
      items = [...items, `item ${items.length}`];
    }
  }

  onMount(() => {
    if (listElement) {
      listElement.addEventListener("scroll", function () {
        if (
          listElement.scrollTop + listElement.clientHeight >=
          listElement.scrollHeight - 100
        ) {
          loadMore();
        }
      });
    }
  });

  onDestroy(() => {
    if (listElement) listElement.removeEventListener("scroll");
  });
</script>

<section>
  <Cart>
    <svelte:fragment slot="header">
      <form
        method="POST"
        action="?/create"
        use:enhance={() => {
          creating = true;
          return async ({ update }) => {
            await update();
            creating = false;
          };
        }}
      >
        <label>
          <span>Anzahl der Mitarbeiter die angelegt werden</span>
          <input
            disabled={creating}
            name="description"
            value={form?.description ?? ""}
            autocomplete="off"
            required
            placeholder=""
            type="number"
          />
        </label>
        <button type="submit">Mitarbeiter anlegen</button>
      </form>
    </svelte:fragment>
    <svelte:fragment slot="body">
      <div class="table">
        <table bind:this={listElement}>
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
                <td>14924</td>
                <td>Abigayle</td>
                <td>Mills</td>
                <td>Aktiv</td>
                <td>August 7, 2017</td>
              </tr>
            {/each}
          </tbody>
        </table>
        <div class="footer">50 geladen von 350 Ergebnissen</div>
      </div>
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
    .table {
      display: flex;
      flex-direction: column;
      position: absolute;
      inset: 0;
    }
    table {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-collapse: collapse;
      overflow: auto;
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
      }
      thead,
      tbody {
        tr {
          display: table;
          width: 100%;
          td {
            padding: 1em 1em;
            width: 20%;
          }
        }
      }
    }
    .footer {
      color: gray;
      font-size: 0.8em;
      padding: 1em;
    }
  }
</style>
