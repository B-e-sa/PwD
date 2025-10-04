<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type OnClickEvent = MouseEvent & {
    currentTarget: EventTarget & HTMLButtonElement;
  };

  type ButtonProps = {
    variant?: "default" | "transparent";
    children?: any;
  } & HTMLButtonAttributes;

  const { children, variant = "default", ...props }: ButtonProps = $props();
</script>

<button
  class={props.disabled ? variant + " disabled" : variant}
  onclick={() => {
    if (!props.disabled && props.onclick) props.onclick({} as OnClickEvent);
  }}
  {...props}
>
  {@render children?.()}
</button>

<style>
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    transition-property: background-color, color;
    transition-duration: 0.2s;
    transition-timing-function: linear;
  }

  .default {
    color: var(--text-contrast);
    background-color: var(--primary);
    border-radius: 5px;
    font-weight: bold;

    &:hover {
      background-color: var(--dark-primary);
    }
  }

  .transparent {
    color: var(--text-contrast);
    border: 1px solid var(--gray);
    border-radius: 5px;
    font-weight: bold;

    &:hover {
      color: var(--gray);
      border-color: var(--gray);
    }
  }
</style>
