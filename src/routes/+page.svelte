<script lang="ts">
  import Cart from "$lib/components/Cart.svelte";
  import { onMount } from "svelte";
  import type { PageServerData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageServerData;

  let loading = false;
  let listEmployees: any;
  let formPagination: any;

  onMount(() => {
    if (listEmployees) {
      listEmployees.addEventListener("scroll", function () {
        if (
          listEmployees.scrollTop + listEmployees.clientHeight >=
          listEmployees.scrollHeight
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
          listEmployees.scrollTop = 0;
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
            name="genre"
            autocomplete="off"
            required
            placeholder="Search for a gender"
            type="text"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </svelte:fragment>
    <svelte:fragment slot="body">
      <div class="tablo" bind:this={listEmployees}>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Surname</td>
              <td>Gender</td>
              <td>Location</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Active</td>
              <td>Registered</td>
            </tr>
          </thead>
          <tbody>
            {#each data.employees as item, index}
              <tr class:isodd={index % 2}>
                <td>{item.name.first}</td>
                <td>{item.name.last}</td>
                <td class="capitalize">{item.gender}</td>
                <td>{item.location.city}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <span class="status" class:active={item.nat === "US"}
                    >{item.nat === "US" ? "Active" : "Inactive"}</span
                  ></td
                >
                <td>{new Date(String(item.registered.date)).toDateString()}</td>
              </tr>
            {/each}
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
          {data.employees.length} Employees of 1000
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
