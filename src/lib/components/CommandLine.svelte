<script lang="ts">
  import { fade } from "svelte/transition";
  import Copy from "../../assets/icons/Copy.svelte";
  import Confirm from "../../assets/icons/Confirm.svelte";

  const {
    idx,
    hoveredCommandLine,
    onHover,
    onLeave,
    commandLength,
    commandLine,
  }: {
    idx: number;
    onHover: (idx: number, ...args: any) => any;
    onLeave: (...args: any) => any;
    hoveredCommandLine: number;
    commandLength: number;
    commandLine: string;
  } = $props();

  let copyTimeout: number;

  async function copyCommand(command: string) {
    await navigator.clipboard.writeText(command);
    copied = true;
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => (copied = false), 1200);
  }

  function setCommandRadius() {
    let br = "border-radius: ";

    if (idx === 0)
      return commandLength > 1 ? br + "5px 5px 5px 0;" : br + "5px;";

    return idx === commandLength - 1
      ? br + "0 5px 5px 5px"
      : br + "0 5px 5px 0px;";
  }

  let hovering = $state(false);
  let copied = $state(false);

  function handleOnHover() {
    hovering = true;
    onHover(idx);
  }

  function handleOnLeave() {
    hovering = false;
    onLeave();
  }
</script>

<div
  id="wrapper"
  style={`${hoveredCommandLine > -1 && hoveredCommandLine != idx && "opacity: 0.5;"} `}
>
  <button
    onmouseenter={handleOnHover}
    onmouseleave={handleOnLeave}
    style={setCommandRadius()}
    onclick={async () => await copyCommand(commandLine)}
    class={`${commandLength - 1 === idx && "mb"}`}
  >
    {commandLine}
  </button>
  {#if hovering}
    <div
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
      style="margin-left: 7px;"
    >
      {#if !copied}
        <Copy fill="var(--font-color)" width={10} height={10} />
      {:else}
        <Confirm fill="var(--font-color)" width={10} height={10} />
      {/if}
    </div>
  {/if}
</div>

<style>
  #wrapper {
    display: flex;
    align-items: center;
    transition: 0.2s opacity linear;
  }

  button {
    display: flex;
    width: fit-content;
    font-family: "Noto Sans";
    background-color: var(--bg-light);
    padding-inline: 15px;
    padding-block: 8px;
    color: var(--primary);
  }
</style>
