<script lang="ts">
  import type { Component } from "svelte";
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  import type { IconProps } from "../../assets/icons/icon";

  type InputProps = {
    Adorment?: Component<IconProps, {}, "">;
    adormentProps?: IconProps;
    wrapperProps?: HTMLAttributes<HTMLDivElement>;
  } & HTMLInputAttributes;

  let inputEl: HTMLInputElement;

  let { adormentProps, wrapperProps, Adorment, ...props }: InputProps =
    $props();
</script>

<div id="wrapper" {...wrapperProps} onclick={() => inputEl.focus()}>
  {#if Adorment}
    <Adorment {...adormentProps} />
  {/if}

  <input type="text" bind:this={inputEl} value={props.value} {...props} />
</div>

<style>
  #wrapper {
    cursor: text;
    display: flex;
    border: var(--border);
    padding: 10px;
    border-radius: var(--border-radius);
  }

  input[type="text"] {
    border: none;
    outline: none;
    background-color: transparent;
    margin-left: 10px;
    color: var(--font-color);
    width: 100%;

    &::placeholder {
      color: var(--gray);
    }
  }
</style>
