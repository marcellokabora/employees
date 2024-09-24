<div class="cart">
  <div class="header">
    <slot name="header">Header of the cart</slot>
  </div>
  <div class="body">
    <slot name="body">Body of the cart</slot>
  </div>
</div>

<style lang="scss">
  .cart {
    background-color: var(--bg-secondary);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    height: 100%;
    width: 100%;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .header {
      padding: 1em;
    }
    .body {
      flex: 1;
      border-top: 1px solid var(--color-border);
      position: relative;
      overflow: hidden;
    }
  }
</style>
