<script lang="ts">
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
<div>50 geladen von 350 Ergebnissen</div>

<style lang="scss">
  table {
    display: flex;
    flex-direction: column;
    position: absolute;
    inset: 0;
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
</style>
