<script lang="ts">
  import Arrow from "../../assets/icons/Arrow.svelte";
  import userStorage from "../../stores/userStorage";
  import type { Command } from "../../types/Command";
  import CommandEditor from "./CommandEditor.svelte";
  import CommandLine from "./CommandLine.svelte";
  import OptionsButton from "./OptionsButton.svelte";
  import Tag from "./Tag.svelte";

  const {
    uuid,
    command,
    flags,
    description,
    tags: commandTags,
  }: Command = $props();

  const commandLines = $derived(command.split("\n"));
  const descriptionLines = $derived(description?.split("\n"));

  let openDescription = $state(false);

  let editing = $state(false);

  function setEditing() {
    editing = true;
  }

  function onEdit() {
    editing = false;
  }

  let hoveredCommandLine = $state(-1);

  function onHover(idx: number) {
    hoveredCommandLine = idx;
  }

  function onLeave() {
    hoveredCommandLine = -1;
  }

  function setDescriptionMargin(index: number) {
    const mt = "margin-top: 8px;";
    const mb = "margin-bottom: 8px;";

    if (index === 0)
      return index === descriptionLines!.length - 1 ? mt + mb : mt;

    return mb;
  }

  function findTag(uuid: string) {
    return $userStorage.data.tags.find((t) => t.uuid === uuid);
  }

  const listFormatter = new Intl.ListFormat("en", {
    style: "long",
    type: "unit",
  });
</script>

{#if !editing}
  <div id="wrapper">
    <div style="width: 100%">
      <div style="margin-bottom: 8px;">
        <div
          style="display: flex; justify-content: space-between; width: 100%;"
        >
          <p class="label">COMANDO</p>
          <OptionsButton {setEditing} commandUUID={uuid} />
        </div>
        {#each commandLines as commandLine, idx}
          <CommandLine
            {hoveredCommandLine}
            {idx}
            {commandLine}
            {onHover}
            {onLeave}
            commandLength={commandLines.length}
          />
        {/each}
      </div>

      {#if description}
        <button
          id="description"
          onclick={() => (openDescription = !openDescription)}
          style={`${!openDescription ? "margin-bottom: 20px" : ""}`}
        >
          <p style="margin-right: 8px; margin-bottom: 0" class="label">
            DESCRIÇÃO
          </p>
          <div style={openDescription ? "rotate: 180deg;" : ""}>
            <Arrow fill="var(--text-contrast)" width={10} height={10} />
          </div>
        </button>
        {#if openDescription}
          {#each descriptionLines! as descriptionLine, i}
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
    transition: all 0.2s;

    p {
      color: var(--font-color);
    }

    .label {
      color: var(--text-contrast);
      font-weight: bold;
      margin-bottom: 8px;
    }
  }
</style>
