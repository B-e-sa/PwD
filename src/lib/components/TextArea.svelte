<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  let props: HTMLTextareaAttributes = $props();
</script>

<textarea {...props}></textarea>

<style>
  textarea {
    resize: vertical;
    padding: 10px;
    border: var(--border);
    border-radius: var(--border-radius);
    outline: none;
    background-color: transparent;
    color: var(--font-color);
    width: 100%;
  }
</style>
