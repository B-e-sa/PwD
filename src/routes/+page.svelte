<script lang="ts">
  import Input from "../lib/components/Input.svelte";
  import "../index.css";
  import Command from "../lib/components/Command.svelte";
  import NavBar from "../lib/components/NavBar.svelte";
  import Search from "../assets/icons/Search.svelte";
  import SearchFilter from "$lib/components/SearchFilter.svelte";
  import AddButton from "$lib/components/AddButton.svelte";
  import AddCommand from "$lib/components/AddCommand.svelte";
  import commands from "../stores/commands.svelte";
  import { FilterEnum, type SearchProps } from "../types/Search";
  import layout from "../stores/layout.svelte";
  import TagBar from "$lib/components/TagBar.svelte";

  let search = $state<SearchProps>({
    search: "",
    filter: FilterEnum.Command,
  });

  function handleSearch(
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) {
    search = { ...search, search: e.currentTarget.value };
  }

  let addingCommand = $state(false);

  function toggleAddingCommand() {
    if (addingCommand) {
      addingCommand = false;
    } else {
      addingCommand = true;
    }
  }

  function treatFilter() {
    return search.search.toLocaleLowerCase().trim();
  }

  const filteredCommands = $derived(
    $commands.filter((c) => {
      if (search.filter === FilterEnum.Command) {
        return c.command.toLocaleLowerCase().includes(treatFilter());
      } else if (search.filter === FilterEnum.Flags) {
        return c?.flags?.some((f) => f.includes(treatFilter()));
      } else if (search.filter === FilterEnum.Tags) {
        return c?.tags?.some((t) => t.name.includes(treatFilter()));
      }
      return false;
    })
  );
</script>

<NavBar />
{#if $layout.tagBarOpen}
  <TagBar />
{/if}

<div id="page">
  <h1 class="fl">Comandos Salvos</h1>
  <Input
    value={search.search}
    oninput={handleSearch}
    placeholder="Search"
    Adorment={Search}
    adormentProps={{ height: 25, width: 25, stroke: "var(--font-color)" }}
  />
  <div
    style="
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    "
  >
    <SearchFilter
      currentFilter={search.filter}
      onSelect={(f) => (search.filter = f)}
    />
    <AddButton
      style={addingCommand ? "rotate: 45deg" : ""}
      onclick={toggleAddingCommand}
    />
  </div>

  <div>
    {#if addingCommand}
      <AddCommand
        onCreate={() => (addingCommand = false)}
        style="margin-bottom: 35px;"
      />
    {/if}
    {#each filteredCommands as command}
      <Command {...command} />
    {/each}
  </div>
</div>

<style>
  h1 {
    color: var(--text-contrast);
    margin-bottom: 25px;
    margin-top: 40px;
  }

  #page {
    padding-inline: 10vw;
  }
</style>
