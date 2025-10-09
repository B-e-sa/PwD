import type { SVGAttributes } from "svelte/elements";

export type IconProps = {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
} & Partial<SVGAttributes<any>>;
