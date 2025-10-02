<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type ButtonProps = {
    variant?: "default" | "transparent";
    children?: any;
  } & HTMLButtonAttributes;

  const { children, variant = "default", ...props }: ButtonProps = $props();
</script>

<button class={variant} {...props}>
  {@render children?.()}
</button>

<style>
  .default {
    color: var(--text-contrast);
    background-color: var(--primary);
    border-radius: 5px;
  }

  .transparent {
    color: var(--text-contrast);
    border: 1px solid var(--gray);
    border-radius: 5px;
  }
</style>
