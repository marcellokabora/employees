<script lang="ts">
  import { fly, slide } from "svelte/transition";
  import { enhance } from "$app/forms";
  import Cart from "$lib/components/Cart.svelte";
  import Scrolview from "$lib/components/Scrolview.svelte";

  export let form;

  let creating = false;
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
            placeholder="Min 350"
            type="number"
          />
        </label>
        <button type="submit">Mitarbeiter anlegen</button>
      </form>
    </svelte:fragment>
    <svelte:fragment slot="body">
      <Scrolview></Scrolview>
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
  }
</style>
