<script lang="ts">
  import handleClickOutside from "../../actions/handleOutsideClick";
  import Arrow from "../../assets/icons/Arrow.svelte";
  import userStorage from "../../stores/userStorage";
  import Tag, { type TagProps } from "./Tag.svelte";

  const {
    onTagClick,
    selectedTags,
  }: {
    onTagClick: (tag: TagProps, ...args: any) => any;
    selectedTags: TagProps[];
  } = $props();

  let open = $state(false);

  let filteredTags = $derived(
    $userStorage.data.tags.filter((ft) => {
      return selectedTags && selectedTags.length != 0
        ? !selectedTags.some((t) => t.name === ft.name)
        : true;
    })
  );

  const noTagsLeft = $derived(
    selectedTags.length === $userStorage.data.tags.length
  );

  function handleChooseTag() {
    if (!noTagsLeft) open = !open;
  }
</script>

<div id="wrapper" use:handleClickOutside={() => (open = false)}>
  <button
    style={`${noTagsLeft ? "opacity: 0.5" : ""}`}
    onclick={handleChooseTag}
    id="tag-selector"
  >
    <span>Tag</span>
    <div
      style="{`width: 18px; height: 18px; ${open && filteredTags.length != 0 && 'rotate: 180deg;'}`};"
    >
      <Arrow fill="white" width={18} height={18} />
    </div>
  </button>
  {#if open}
    <div id="items">
      {#each filteredTags as tag, i}
        <Tag
          {...tag}
          onclick={() => {
            onTagClick(tag);
            open = false;
          }}
          style={`min-width: 90px; margin-top: 8px;`}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  #wrapper {
    position: relative;
    width: fit-content;
  }

  #items {
    padding-bottom: 8px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-light);
    border: var(--border);
    border-radius: var(--border-radius);
  }

  #tag-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary);
    color: var(--text-contrast);
    border-radius: 30px;
    padding-inline: 15px;
    padding-block: 5px;
    border: none;
  }
</style>
