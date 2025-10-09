export default function handleClickOutside(
  node: HTMLElement,
  callback: (...args: any) => any
) {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as HTMLElement)) callback();
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}
