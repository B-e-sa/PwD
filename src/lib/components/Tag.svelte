<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import hexToTransparent from "../../utils/hexToTransparent";
  import type { Tag } from "../../types/Tag";

  export type TagProps = {
    deletable?: boolean;
  } & HTMLButtonAttributes &
    Tag;

  let hovering = $state(false);

  const {
    name,
    color = "var(--gray)",
    deletable,
    ...props
  }: TagProps = $props();

  function toggleHover() {
    if (deletable) hovering = !hovering;
  }
</script>

<button
  {...props}
  onmouseenter={toggleHover}
  onmouseleave={toggleHover}
  style={`background-color: ${hexToTransparent(color, 0.1)}; color: ${color}; ${props.style}`}
>
  {name}
  {#if deletable && hovering}
    <p>x</p>
  {/if}
</button>

<style>
  p {
    position: absolute;
    font-size: 0.6rem;
    right: 10px;
  }

  button {
    justify-content: center;
    position: relative;
    display: flex;
    align-items: center;
    border: none;
    min-width: 50px;
    border-radius: 50px;
    padding-block: 5px;
    padding-inline: 20px;
    font-weight: 600;
  }
</style>
