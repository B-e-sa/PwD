<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  const props: HTMLAttributes<HTMLButtonElement> = $props();
</script>

<button {...props}>+</button>

<style>
  button {
    width: 15px;
    border: none;
    outline: none;
    background-color: var(--primary);
    color: var(--text-contrast);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    transition: all 0.2s;
  }
</style>
