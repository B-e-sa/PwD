<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import Close from "../../assets/icons/Close.svelte";
  import Maximize from "../../assets/icons/Maximize.svelte";
  import Minus from "../../assets/icons/Minus.svelte";
  import { onMount } from "svelte";
  import Unmaximize from "../../assets/icons/Unmaximize.svelte";

  const win = getCurrentWindow();

  let maximized = $state(false);
  let emptySpace: HTMLElement;
  let observer: ResizeObserver;

  let actions: HTMLElement;

  const [width, height] = [15, 15];

  onMount(() => {
    emptySpace?.addEventListener("mousedown", async (e) => {
      if (e.buttons === 1) {
        if (e.detail === 2) {
          win.toggleMaximize();
          maximized = await win.isMaximized();
        } else {
          win.startDragging();
        }
      }
    });

    observer = new ResizeObserver(async () => {
      maximized = await win.isMaximized();
    });
    observer.observe(emptySpace);
  });
</script>

<div id="winbar">
  <div id="cont">
    <div id="empty-space" bind:this={emptySpace}></div>
    <div id="actions" bind:this={actions}>
      <button onclick={() => win.minimize()}>
        <Minus width={10} height={10} />
      </button>
      <button onclick={() => win.toggleMaximize()}>
        {#if maximized}
          <Unmaximize {width} {height} />
        {:else}
          <Maximize {width} {height} />
        {/if}
      </button>
      <button onclick={() => win.close()}>
        <Close {width} {height} />
      </button>
    </div>
  </div>
</div>

<style>
  #winbar {
    top: 0;
    position: sticky;
    z-index: 999999;
  }

  #actions {
    display: flex;
    z-index: 1000;
  }

  #empty-space {
    width: 100%;
  }

  #cont {
    width: 100%;
    justify-content: flex-end;
    display: flex;
    border-bottom: var(--border);
    border-width: 2px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 15px;
    padding-block: 8px;
  }
</style>
