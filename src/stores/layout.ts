import { writable } from "svelte/store";

type LayoutProps = {
  tagBarOpen: boolean;
};

const layout = writable<LayoutProps>({
  tagBarOpen: false,
});

export default layout;
