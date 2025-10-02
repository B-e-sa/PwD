<script lang="ts">
  import Arrow from "../../assets/icons/Arrow.svelte";
  import type { Command } from "../../types/Command";
  import Tag from "./Tag.svelte";

  const { command, flags, description, tags }: Command = $props();

  let commandAsList = command.split("\n");

  let openDescription = $state(false);

  function setWrapperBorder(index: number) {
    let br = "border-radius: ";

    if (index === 0) {
      if (commandAsList.length > 1) return br + "5px 5px 5px 0;";
      return br + "5px;";
    }

    if (index === commandAsList.length - 1) return br + "0 5px 5px 5px";

    return br + "0 5px 5px 0px;";
  }

  const listFormatter = new Intl.ListFormat("en", {
    style: "long",
    type: "unit",
  });
</script>

<div id="wrapper" role="button" tabindex="0">
  <div>
    <p class="label">COMMAND</p>
    {#each commandAsList as commandLine, i}
      <div
        id="command-wrapper"
        style={setWrapperBorder(i)}
        class={`${commandAsList.length - 1 === i ? "mb" : ""}`}
      >
        <p id="command">{commandLine}</p>
      </div>
    {/each}

    {#if description}
      <button
        onclick={() => (openDescription = !openDescription)}
        style={`font-family: 'Noto Sans'; display: flex; align-items: center; ${!openDescription ? "margin-bottom: 20px" : ""}`}
      >
        <p style="margin-right: 8px; margin-bottom: 0" class="label">
          DESCRIPTION
        </p>
        <div style={openDescription ? "rotate: 180deg;" : ""}>
          <Arrow fill="var(--text-contrast)" width={10} height={10} />
        </div>
      </button>
      {#if openDescription}
        <p style={openDescription ? "margin-top: 8px;" : ""} class="mb">
          {description}
        </p>
      {/if}
    {/if}

    {#if flags && flags.length > 0}
      <p class="label">FLAGS</p>
      <p id="flags" class="mb">{listFormatter.format(flags)}</p>
    {/if}

    {#if tags && tags.length != 0}
      <p class="label">TAGS</p>
      <div style="display: flex;">
        {#each tags as tag, i}
          <Tag {...tag} style="margin-right: 6px;" />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .mb {
    margin-bottom: 20px;
  }

  #wrapper {
    display: flex;
    border: var(--border);
    border-radius: var(--border-radius);
    margin-bottom: 25px;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    transition: all 0.25s;

    p {
      color: var(--font-color);
    }

    .label {
      font-weight: bold;
      margin-bottom: 8px;
    }

    #command-wrapper {
      width: fit-content;
      background-color: var(--bg-light);
      padding-inline: 15px;
      padding-block: 8px;

      #command {
        color: var(--primary);
      }
    }
  }
</style>
