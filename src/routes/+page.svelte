<script lang="ts">
  import Cart from "$lib/components/Cart.svelte";
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";

  let { data } = $props();

  let loading = $state(false);
  let list: any = $state();
  let formPagination: any = $state();

  onMount(() => {
    if (list) {
      list.addEventListener("scroll", function () {
        if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
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
    {#snippet header()}
      <form
        method="POST"
        action="?/add"
        use:enhance={() => {
          list.scrollTop = 0;
          loading = true;
          return async ({ update }) => {
            await update();
            loading = false;
          };
        }}
      >
        <label>
          <input
            disabled={loading}
            name="search"
            autocomplete="off"
            required
            placeholder="Search..."
            type="text"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    {/snippet}
    {#snippet body()}
      <div class="tablo" bind:this={list}>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Surname</td>
              <td>Gender</td>
              <td>Age</td>
              <td>Usdername</td>
              <td>Active</td>
              <td>Birth</td>
            </tr>
          </thead>
          <tbody>
            {#if data.users}
              {#each data?.users as item, index}
                <tr class:isodd={index % 2}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td class="capitalize">{item.gender}</td>
                  <td>{item.age}</td>
                  <td>{item.username}</td>
                  <td>
                    <span class="status" class:active={index % 2}
                      >{index % 2 ? "Active" : "Inactive"}</span
                    ></td
                  >
                  <td>{new Date(String(item.birthDate)).toDateString()}</td>
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>
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
      ></form>
      <!-- {#if loading}
        <div class="loading">
          <img src="/loading.svg" alt="loading" />
        </div>
      {/if} -->
    {/snippet}
    {#snippet footer()}
      <div class="footer">
        <span>
          {data.users?.length} Employees of 1000
        </span>
        {#if loading}
          <span>Loading...</span>
        {/if}
      </div>
    {/snippet}
  </Cart>
</section>

<style>
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
        /* span {
          padding-right: 1em;
          font-size: 0.8em;
          color: var(--color-gray);
        } */
      }
    }
    .tablo {
      position: absolute;
      inset: 0;
      overflow: auto;
      flex: 1;
    }
    table {
      width: 100%;
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
          width: 100%;
          border-bottom: 1px solid var(--color-border);
          text-wrap: nowrap;
          text-align: left;
          td {
            padding: 1em 1em;
            width: 150px;
          }
          .capitalize {
            text-transform: capitalize;
          }
        }
      }
    }
    /* .loading {
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
    } */
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--color-gray);
      font-size: 0.8em;
    }
  }
</style>
