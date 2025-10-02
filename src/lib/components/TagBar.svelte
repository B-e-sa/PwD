<script lang="ts">
  import Arrow from "../../assets/icons/Arrow.svelte";
  import Close from "../../assets/icons/Close.svelte";
  import Search from "../../assets/icons/Search.svelte";
  import layout from "../../stores/layout.svelte";
  import tags from "../../stores/tags.svelte";
  import type { Tag } from "../../types/Tag";
  import Input from "./Input.svelte";
  import TagEditor from "./TagEditor.svelte";

  let selectedTag = $state<Tag | null>();
</script>

<div id="wrapper">
  <div
    style="position: sticky; padding: 25px; background-color: var(--bg-dark);"
  >
    <div style="display: flex; align-items: center; margin-bottom: 20px;">
      <button
        onclick={() =>
          selectedTag
            ? (selectedTag = null)
            : layout.set({ ...$layout, tagBarOpen: false })}
        style={`${selectedTag ? "rotate: 90deg;" : "margin-bottom: -5px;"} margin-right: 15px; color: var(--text-contrast); height: fit-content; width: fit-content; `}
      >
        {#if selectedTag}
          <Arrow fill="white" width={25} height={25} />
        {:else}
          <Close fill="white" width={25} height={25} />
        {/if}
      </button>
      <h2>Editar Tag</h2>
    </div>
    {#if !selectedTag}
      <Input
        placeholder="Pesquisar Tag"
        Adorment={Search}
        adormentProps={{ width: 30, height: 30, stroke: "var(--font-color)" }}
      />
      <div id="tag-cont">
        {#each $tags as tag}
          <button id="tag" onclick={() => (selectedTag = tag)}>
            <div id="circle" style={`background-color: ${tag.color};`}></div>
            <p>{tag.name}</p>
          </button>
        {/each}
      </div>
    {:else}
      <TagEditor
        onSave={() => (selectedTag = null)}
        onClose={() => (selectedTag = null)}
        {...selectedTag}
      />
    {/if}
  </div>
</div>

<style>
  #wrapper {
    z-index: 100;
    width: 450px;
    height: 100vh;
    top: 0;
    right: 0;
    position: fixed;
    background-color: var(--bg-dark);
  }

  h2 {
    color: var(--text-contrast);
  }

  #tag-cont {
    margin-top: 25px;
  }

  button {
    width: 100%;
  }

  #tag {
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
</style>
