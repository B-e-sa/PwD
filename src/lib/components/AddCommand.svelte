<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Input from "./Input.svelte";
  import TagSelector from "./TagSelector.svelte";
  import type { Tag as TagType } from "../../types/Tag";
  import Tag from "./Tag.svelte";
  import commands from "../../stores/commands.svelte";
  import { fly } from "svelte/transition";
  import stringNotEmpty from "../../utils/stringNotEmpty";
  import type { Command } from "../../types/Command";
  import TextArea from "./TextArea.svelte";

  type AddCommmandErrors = {
    command?: string;
    flags?: string;
    tags?: string;
  };
  const props: HTMLAttributes<HTMLDivElement> & {
    onCreate?: (...args: any) => any;
  } = $props();

  let command = $state("");
  let description = $state("");
  let flags = $state("");
  let tags = $state<TagType[]>([]);
  let errors: AddCommmandErrors = $state({});

  function handleCreateCommand() {
    const properties = {
      command: "",
      description: "",
      flags: [],
      tags,
    } as Command;

    if (!stringNotEmpty(command)) {
      errors.command = "Obrigatório";
      return;
    }
    properties.command = command.trim();
    delete errors.command;

    if (stringNotEmpty(description))
      properties.description = description.trim();

    if (stringNotEmpty(flags)) {
      let trimmedFlags = flags.trim();
      properties.flags = trimmedFlags.split(",").map((f) => f.trim());
    }

    commands.update((prev) => [...prev, properties]);

    console.log(properties)

    if (props.onCreate) props.onCreate();
  }

  const inputMb = {
    style: "margin-bottom: 20px",
  };

  function handleTagRemove(name: string) {
    tags = tags.filter((t) => t.name !== name);
  }
</script>

<div
  id="wrapper"
  {...props}
  in:fly={{ x: -200, duration: 350 }}
  out:fly={{ x: 200, duration: 350 }}
>
  <label for="comando">Comando*:</label>
  <p class="error" style="margin-top: -10px; margin-bottom: 10px">
    {errors?.command}
  </p>
  <TextArea
    spellcheck={false}
    value={command}
    onkeyup={(v) => (command = v.currentTarget.value)}
    style={inputMb.style}
  />
  <label for="flags">Flags (separe por virgula): </label>
  <p class="error">{errors?.flags}</p>
  <Input
    name="flags"
    value={flags}
    onkeyup={(v) => (flags = v.currentTarget.value)}
    wrapperProps={inputMb}
  />
  <p class="error">{errors?.tags}</p>
  <div style="display: flex; justify-content: space-between;">
    <div id="bottom">
      <span style="margin-right: 15px; font-weight: bold;">Tags:</span>
      <TagSelector
        selectedTags={tags}
        onTagClick={(tag) => {
          tags = [...tags, tag];
        }}
      />
      <div id="tag-grid">
        {#each tags as tag, i}
          <Tag
            {...tag}
            deletable={true}
            onclick={() => handleTagRemove(tag.name)}
            style={`${i % 2 !== 0 ? "margin-left: 5px" : ""}`}
          />
        {/each}
      </div>
    </div>
    <button
      id="send-button"
      style={`background-color: var(--primary); ${!stringNotEmpty(command) ? "opacity: 0.5; cursor: not-allowed;" : ""}`}
      onclick={handleCreateCommand}>Criar</button
    >
  </div>
</div>

<style>
  .error {
    color: red;
  }

  #bottom {
    display: flex;
    align-items: center;
  }

  #send-button {
    background-color: var(--primary);
    font-weight: bold;
    color: var(--text-contrast);
    border: none;
    outline: none;
    padding-block: 15px;
    padding-inline: 100px;
    border-radius: var(--border-radius);
    align-self: flex-start;
  }

  #tag-grid {
    margin-left: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
  }

  #wrapper {
    display: flex;
    flex-direction: column;
    border: var(--border);
    border-radius: var(--border-radius);
    padding: 15px;

    label {
      font-weight: bold;
      color: var(--font-color);
      margin-bottom: 8px;
    }

    span {
      color: var(--font-color);
    }
  }
</style>
