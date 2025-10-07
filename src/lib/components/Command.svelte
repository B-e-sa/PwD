<script lang="ts">
  import Arrow from "../../assets/icons/Arrow.svelte";
  import tags from "../../stores/tags.svelte";
  import type { Command } from "../../types/Command";
  import CommandEditor from "./CommandEditor.svelte";
  import OptionsButton from "./OptionsButton.svelte";
  import Tag from "./Tag.svelte";

  const {
    uuid,
    command,
    flags,
    description,
    tags: commandTags,
  }: Command = $props();

  const commandAsList = command.split("\n");
  const descriptionAsList = description?.split("\n");

  let openDescription = $state(false);

  let editing = $state(false);

  function setEditing() {
    editing = true;
  }

  function onEdit() {
    editing = false;
  }

  function setDescriptionMargin(index: number) {
    const mt = "margin-top: 8px;";
    const mb = "margin-bottom: 8px;";

    if (index === 0)
      return index === descriptionAsList!.length - 1 ? mt + mb : mt;

    return mb;
  }

  function setCommandRadius(index: number) {
    let br = "border-radius: ";

    if (index === 0)
      return commandAsList.length > 1 ? br + "5px 5px 5px 0;" : br + "5px;";

    return index === commandAsList.length - 1
      ? br + "0 5px 5px 5px"
      : br + "0 5px 5px 0px;";
  }

  function findTag(uuid: string) {
    return $tags.find((t) => t.uuid === uuid);
  }

  const listFormatter = new Intl.ListFormat("en", {
    style: "long",
    type: "unit",
  });
</script>

{#if !editing}
  <div id="wrapper">
    <div style="width: 100%">
      <div style="display: flex; justify-content: space-between; width: 100%;">
        <p class="label">COMMAND</p>
        <OptionsButton {setEditing} commandUUID={uuid} />
      </div>
      {#each commandAsList as commandLine, i}
        <div
          id="command-wrapper"
          style={setCommandRadius(i)}
          class={`${commandAsList.length - 1 === i ? "mb" : ""}`}
        >
          <p id="command">{commandLine}</p>
        </div>
      {/each}

      {#if description}
        <button
          id="description"
          onclick={() => (openDescription = !openDescription)}
          style={`${!openDescription ? "margin-bottom: 20px" : ""}`}
        >
          <p style="margin-right: 8px; margin-bottom: 0" class="label">
            DESCRIPTION
          </p>
          <div style={openDescription ? "rotate: 180deg;" : ""}>
            <Arrow fill="var(--text-contrast)" width={10} height={10} />
          </div>
        </button>
        {#if openDescription}
          {#each descriptionAsList! as descriptionLine, i}
            <p style={setDescriptionMargin(i)}>
              {descriptionLine}
            </p>
          {/each}
        {/if}
      {/if}

      {#if flags && flags.length > 0}
        <p class="label">FLAGS</p>
        <p id="flags" class="mb">{listFormatter.format(flags)}</p>
      {/if}

      {#if commandTags && commandTags.length != 0}
        <p class="label">TAGS</p>
        <div style="display: flex;">
          {#each commandTags as tagUUID}
            <Tag {...findTag(tagUUID)!} style="margin-right: 6px;" />
          {/each}
        </div>
      {/if}
    </div>
  </div>
{:else}
  <CommandEditor
    {onEdit}
    {uuid}
    {command}
    {flags}
    {description}
    tags={commandTags}
  />
{/if}

<style>
  .mb {
    margin-bottom: 20px;
  }

  #description {
    font-family: "Noto Sans";
    display: flex;
    align-items: center;
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
