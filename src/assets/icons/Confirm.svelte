<script lang="ts">
  import type { IconProps } from "../../types/Icon";

  const {
    fill = "#ffffff",
    width = 255,
    height = 255,
    ...props
  }: IconProps = $props();
</script>

<svg {width} {height} {...props} viewBox="0 0 24 24" fill="none">
  <path
    d="M4 12.6111L8.92308 17.5L20 6.5"
    stroke={fill}
    stroke-width="4"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
