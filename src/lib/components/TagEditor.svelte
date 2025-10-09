<script lang="ts">
  import type { newMenu } from "@tauri-apps/api/menu/base";
  import colors from "../../stores/colors.svelte";
  import tags from "../../stores/tags.svelte";
  import type { Tag as TagType } from "../../types/Tag";
  import stringNotEmpty from "../../utils/stringNotEmpty";
  import Button from "./Button.svelte";
  import Input from "./Input.svelte";
  import Tag from "./Tag.svelte";

  const props: TagType & {
    onClose: (...args: any) => any;
    onSave: (...args: any) => any;
  } = $props();

  let newName = $state<string>(props.name || "");
  let selectedColor = $state<string>(props.color || "#ffffff");

  // TODO:
  // usar para desativar botão
  let canSave = $derived(
    // name was changed
    (stringNotEmpty(newName) && newName.trim() != props.name) ||
      // only the color was changed
      (selectedColor != props.color && props.uuid) ||
      // new tag
      (!props.uuid && stringNotEmpty(newName))
  );

  function handleClose() {
    if (props.onClose) props.onClose();
  }

  function handleSave() {
    if (!canSave) return;

    if (!props.uuid) {
      tags.update((prev) => [
        ...prev,
        {
          uuid: crypto.randomUUID(),
          color: selectedColor,
          name: newName,
        },
      ]);
      props.onSave();
      return;
    }

    const tagIndex = $tags.findIndex((t) => {
      t.uuid === props.uuid;
    });

    if (!tagIndex) {
      // TODO: fechar barra
      return;
    }

    const color = props.color === selectedColor ? props.color : selectedColor;
    const name = props.name === newName ? props.name : newName;

    tags.update((tag) =>
      tag.map((t) => {
        return t.uuid === props.uuid ? { ...t, name, color } : t;
      })
    );

    props.onSave();
  }
</script>

<div>
  <label for="name" class="label">Nome:</label>
  <Input
    name="name"
    onkeyup={(e) => (newName = e.currentTarget.value)}
    value={props.name}
    wrapperProps={{ style: "margin-top: 10px; margin-bottom: 20px;" }}
  />
  <p class="label">Cor:</p>
  <div style="display: flex; align-items: center;">
    {#each $colors as color}
      <button
        aria-label="color-select"
        style={`${selectedColor === color ? "border: 2px dashed var(--primary)" : ""}`}
        onclick={() => (selectedColor = color)}
        id="outer-circle"
      >
        <div id="inner-circle" style={`background-color: ${color}`}></div>
      </button>
    {/each}
    <button id="add-button"> + </button>
  </div>
  <div style="display: flex; align-items: center; margin-top: 25px;">
    <span style="margin-bottom: 0; margin-right: 10px;" class="label"
      >Preview:</span
    >
    <Tag {...props} color={selectedColor} name={newName || "N/D"} />
  </div>
  <div style="display: flex; margin-top: 30px; justify-content: flex-end;">
    <Button
      onclick={handleClose}
      style="padding-inline: 12px; margin-right: 12px;"
      variant="transparent"
    >
      Cancelar
    </Button>
    <Button
      disabled={!canSave}
      onclick={handleSave}
      style="padding-inline: 35px; padding-block: 8px;"
    >
      Salvar
    </Button>
  </div>
</div>

<style>
  .label {
    color: var(--text-contrast);
    font-weight: bold;
    margin-bottom: 10px;
  }

  #add-button {
    margin-left: 5px;
    width: 39px;
    height: 39px;
    border-radius: 100%;
    color: var(--font-color);
    font-size: 1.5rem;
    border: 2px dashed var(--font-color);
  }

  #outer-circle {
    margin-left: 5px;
    width: 45px;
    height: 45px;
    padding: 3px;
    border-radius: 100%;

    &:hover {
      border: 2px solid var(--primary);
    }
  }

  #inner-circle {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
</style>
