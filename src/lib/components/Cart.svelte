<div class="cart">
  <div class="header">
    <slot name="header" />
  </div>
  <div class="body">
    <slot name="body" />
  </div>
  <div class="footer">
    <slot name="footer" />
  </div>
</div>

<style lang="scss">
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
