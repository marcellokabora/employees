<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    header,
    body,
    footer,
  }: {
    header: Snippet;
    body: Snippet;
    footer: Snippet;
  } = $props();
</script>

<div class="cart">
  <div class="header">
    {@render header?.()}
  </div>
  <div class="body">
    {@render body?.()}
  </div>
  <div class="footer">
    {@render footer?.()}
  </div>
</div>

<style>
  .cart {
    background-color: var(--color-secondary);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 100%;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .header {
      padding: 1em;
      border-bottom: 1px solid var(--color-border);
    }
    .body {
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    .footer {
      padding: 1em;
      border-top: 1px solid var(--color-border);
      position: relative;
    }
  }
</style>
