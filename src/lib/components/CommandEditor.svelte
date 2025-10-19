<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { fly } from "svelte/transition";
  import type { Command } from "../../types/Command";
  import type { Tag as TagType } from "../../types/Tag";
  import stringNotEmpty from "../../utils/stringNotEmpty";
  import Button from "./Button.svelte";
  import Input from "./Input.svelte";
  import Tag from "./Tag.svelte";
  import TagSelector from "./TagSelector.svelte";
  import TextArea from "./TextArea.svelte";
  import { writeUserData } from "../../utils/userDataActions";
  import userStorage from "../../stores/userStorage";

  type EditCommandErrors = Partial<Command>;

  const props: HTMLAttributes<HTMLDivElement> &
    Partial<Command> & {
      onCreate?: (...args: any) => any;
      onEdit?: (...args: any) => any;
    } = $props();

  function searchTags(uuids: string[]): TagType[] {
    return uuids
      .map((id) => $userStorage.data.tags.find((t) => t.uuid === id))
      .filter((t): t is TagType => t !== undefined);
  }

  let command = $state<string>(props.command || "");
  let description = $state<string>(props.description || "");
  let flags = $state<string>(props.flags ? props.flags.join(",") : "");
  let commandTags = $state<TagType[]>(props.tags ? searchTags(props.tags) : []);
  let errors = $state<EditCommandErrors>({});

  const editing = !!props.uuid;

  async function handleEdit() {
    const properties = {
      uuid: props.uuid || crypto.randomUUID(),
      command: "",
      description: "",
      flags: [],
      tags: [],
      createdAt: props.createdAt || new Date(),
      updatedAt: new Date(),
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

    if (commandTags.length != 0)
      properties.tags = commandTags.map((t) => t.uuid);

    if (editing) {
      const idx = $userStorage.data.commands.findIndex(
        (c) => c.uuid === props.uuid
      );
      $userStorage.data.commands[idx] = properties;
      if (props.onEdit) props.onEdit();
    } else {
      userStorage.update((prev) => {
        return {
          ...prev,
          data: { ...prev.data, commands: [...prev.data.commands, properties] },
        };
      });

      await writeUserData($userStorage.profile, $userStorage.data);
    }

    if (props.onCreate) props.onCreate();
  }

  const inputMb = {
    style: "margin-bottom: 20px",
  };

  function handleTagRemove(name: string) {
    commandTags = commandTags.filter((t) => t.name !== name);
  }
</script>

<div
  id="wrapper"
  {...props}
  in:fly={{ x: editing ? 0 : -200, duration: editing ? 0 : 350 }}
  out:fly={{ x: editing ? 0 : 200, duration: editing ? 0 : 350 }}
>
  <label for="comando">Comando*:</label>
  <p class="error" style="margin-top: -10px; margin-bottom: 10px">
    {errors?.command}
  </p>
  <TextArea
    spellcheck={false}
    value={command}
    onkeyup={(e) => (command = e.currentTarget.value)}
    style={inputMb.style}
  />
  <label for="comando">Descrição:</label>
  <p class="error" style="margin-top: -10px; margin-bottom: 10px">
    {errors?.description}
  </p>
  <TextArea
    spellcheck={false}
    value={description}
    onkeyup={(e) => (description = e.currentTarget.value)}
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
  <p class="error">{errors?.command}</p>
  <div style="display: flex; justify-content: space-between;">
    <div id="bottom">
      <span style="margin-right: 15px; font-weight: bold;">Tags:</span>
      <TagSelector
        selectedTags={commandTags}
        onTagClick={(tag) => {
          commandTags = [...commandTags, tag];
        }}
      />
      <div id="tag-grid">
        {#each commandTags as tag, i}
          <Tag
            {...tag}
            deletable={true}
            onclick={() => handleTagRemove(tag.name)}
            style={`${i % 2 !== 0 && "margin-left: 5px"}`}
          />
        {/each}
      </div>
    </div>
    <div style="display: flex;">
      {#if editing}
        <Button
          onclick={props.onEdit}
          style={"padding-inline: 15px; margin-right: 8px;"}
        >
          Cancelar
        </Button>
      {/if}
      <Button
        disabled={!stringNotEmpty(command)}
        style={`${editing ? "padding-inline: 50px" : "padding-inline: 100px"}; padding-block: 15px; align-self: flex-start;`}
        onclick={handleEdit}
      >
        {editing ? "Editar" : "Criar"}
      </Button>
    </div>
  </div>
</div>

<style>
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

  .error {
    color: red;
  }

  #bottom {
    display: flex;
    align-items: center;
  }

  #tag-grid {
    margin-left: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
  }
</style>
