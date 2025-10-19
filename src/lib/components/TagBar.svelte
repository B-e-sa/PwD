<script lang="ts">
  import Arrow from "../../assets/icons/Arrow.svelte";
  import Close from "../../assets/icons/Close.svelte";
  import Search from "../../assets/icons/Search.svelte";
  import layout from "../../stores/layout";
  import userStorage from "../../stores/userStorage";
  import type { Tag } from "../../types/Tag";
  import Button from "./Button.svelte";
  import Input from "./Input.svelte";
  import TagEditor from "./TagEditor.svelte";

  const Actions = {
    Menu: 0,
    Editing: 1,
    Adding: 2,
  } as const;
  type ActionsEnum = (typeof Actions)[keyof typeof Actions];

  let action = $state<ActionsEnum>(Actions.Menu);
  let selectedTag = $state<Tag | null>();
  let search = $state<string>("");
  let filteredTags = $derived(
    $userStorage.data.tags.filter((t) =>
      t.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
  );

  function unselectTag() {
    selectedTag = null;
  }

  function handleClose() {
    layout.set({ ...$layout, tagBarOpen: false });
  }

  function handleReturn() {
    unselectTag();
    action = Actions.Menu;
  }

  function handleTagClick(tag: Tag) {
    action = Actions.Editing;
    selectedTag = tag;
  }

  function handleAddTagClick() {
    action = Actions.Adding;
    selectedTag = {} as Tag;
  }

  function onTagAdded() {
    unselectTag();
    action = Actions.Menu;
  }

  function isOnMenu() {
    return !(action === Actions.Adding || action === Actions.Editing);
  }
</script>

<div id="wrapper">
  <div id="cont">
    <div id="top-bar">
      <button
        id="return-button"
        onclick={() => (isOnMenu() ? handleClose() : handleReturn())}
        style={`${!isOnMenu() ? "rotate: 90deg;" : "margin-bottom: -5px;"}`}
      >
        {#if !isOnMenu()}
          <Arrow fill="white" width={25} height={25} />
        {:else}
          <Close fill="white" width={25} height={25} />
        {/if}
      </button>
      <h2>
        {action === Actions.Menu
          ? "Tags"
          : action === Actions.Editing
            ? "Editar Tag"
            : "Adicionar Tag"}
      </h2>
    </div>
    {#if action === Actions.Menu}
      <Input
        placeholder="Pesquisar Tag"
        value={search}
        onkeyup={(e) => (search = e.currentTarget.value)}
        Adorment={Search}
        adormentProps={{ width: 30, height: 30, stroke: "var(--font-color)" }}
      />
      <div id="tag-cont">
        <Button id="add-tag" onclick={handleAddTagClick}>
          + Adicionar Tag
        </Button>
        {#each filteredTags as tag}
          <button class="tag" onclick={() => handleTagClick(tag)}>
            <div id="circle" style={`background-color: ${tag.color};`}></div>
            <p>{tag.name}</p>
          </button>
        {/each}
      </div>
    {/if}
    {#if (action === Actions.Editing || Actions.Adding) && selectedTag}
      <TagEditor onSave={onTagAdded} onClose={onTagAdded} {...selectedTag} />
    {/if}
  </div>
</div>

<style>
  #wrapper {
    z-index: 100;
    width: 450px;
    height: 100vh;
    max-height: 100vh;
    top: 0;
    right: 0;
    position: fixed;
    background-color: var(--bg-dark);

    :global(#add-tag) {
      width: 100%;
      padding-block: 15px;
      margin-top: 20px;
      margin-bottom: 15px;
    }

    h2 {
      color: var(--text-contrast);
    }

    button {
      width: 100%;
    }
  }

  #top-bar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    #return-button {
      margin-right: 15px;
      color: var(--text-contrast);
      height: fit-content;
      width: fit-content;
    }
  }

  #tag-cont {
    overflow-y: auto;
    max-height: calc(100vh - 150px);
    padding-bottom: 25px;
  }

  .tag {
    color: var(--font-color);
    display: flex;
    align-items: center;
    background-color: transparent;
    border-radius: 6px;
    padding-block: 18px;
    padding-inline: 14px;

    &:hover {
      background-color: var(--bg-light);
      p {
        color: var(--text-contrast);
      }
    }
  }

  #circle {
    min-width: 18px;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    margin-right: 12px;
  }

  #cont {
    position: sticky;
    padding: 25px;
    background-color: var(--bg-dark);
  }
</style>
