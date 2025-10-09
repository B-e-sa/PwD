<script lang="ts">
  import handleClickOutside from "../../actions/handleOutsideClick";
  import Close from "../../assets/icons/Close.svelte";
  import Confirm from "../../assets/icons/Confirm.svelte";
  import Dots from "../../assets/icons/Dots.svelte";
  import commands from "../../stores/commands.svelte";

  const Actions = {
    None: 0,
    Editing: 1,
    Excluding: 2,
  } as const;
  type ActionsEnum = (typeof Actions)[keyof typeof Actions];

  let {
    commandUUID,
    setEditing,
  }: { commandUUID: string; setEditing?: (...args: any) => any } = $props();
  let open = $state(false);
  let action = $state<ActionsEnum>(Actions.None);

  function toggleOpen() {
    if (open) action = Actions.None;
    open = !open;
  }

  function promptDelete() {
    action = Actions.Excluding;
  }

  function handleDelete() {
    commands.update(() => $commands.filter((c) => c.uuid != commandUUID));
  }

  function handleSetEditing() {
    action = Actions.Editing;
    if (setEditing) setEditing();
  }
</script>

<div
  id="teste"
  use:handleClickOutside={() => (open = false)}
  style="position: relative;"
>
  {#if open}
    <div id="options-cont">
      <button
        onclick={action === Actions.Editing
          ? () => (action = Actions.None)
          : handleSetEditing}
        style="border-radius: var(--border-radius) 0 0 var(--border-radius)"
      >
        {#if action === Actions.Excluding}
          <Close id="close" width={12} height={12} />
        {:else}
          Editar
        {/if}
      </button>
      <button
        onclick={action === Actions.Excluding ? handleDelete : promptDelete}
        style="border-radius: 0 var(--border-radius) var(--border-radius) 0"
      >
        {#if action === Actions.Excluding}
          <Confirm id="confirm" width={12} height={12} />
        {:else}
          Excluir
        {/if}
      </button>
    </div>
  {/if}
  <button style="height: fit-content;" onclick={toggleOpen}>
    <Dots id="dots" width={15} height={15} />
  </button>
</div>

<style>
  #options-cont {
    position: absolute;
    display: flex;
    right: 45px;
    background-color: var(--bg-light);
    border-radius: var(--border-radius);
  }

  button :global(#dots path) {
    transition: 0.2s fill linear;
    fill: var(--font-color);
  }
  button:hover :global(#dots path) {
    fill: var(--text-contrast);
  }

  button :global(#close path) {
    transition: 0.2s fill linear;
    fill: var(--font-color);
  }
  button:hover :global(#close path) {
    fill: var(--text-contrast);
  }

  button :global(#confirm path) {
    transition: 0.2s stroke linear;
    stroke: var(--font-color);
  }
  button:hover :global(#confirm path) {
    stroke: var(--text-contrast);
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    padding-block: 5px;
    padding-inline: 10px;
    color: var(--font-color);
    transition: 0.2s all linear;

    &:hover {
      color: var(--text-contrast);
    }
  }
</style>
