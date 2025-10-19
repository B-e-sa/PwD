<script lang="ts">
  import AddButton from "$lib/components/AddButton.svelte";
  import CommandEditor from "$lib/components/CommandEditor.svelte";
  import SearchFilter from "$lib/components/SearchFilter.svelte";
  import TagBar from "$lib/components/TagBar.svelte";
  import WindowBar from "$lib/components/WindowBar.svelte";
  import { onMount } from "svelte";
  import Search from "../../assets/icons/Search.svelte";
  import "../../index.css";
  import Command from "../../lib/components/Command.svelte";
  import Input from "../../lib/components/Input.svelte";
  import NavBar from "../../lib/components/NavBar.svelte";
  import layout from "../../stores/layout";
  import userStorage from "../../stores/userStorage";
  import type { Search as SearchProps } from "../../types/Filters";
  import { AttributesEnum, OrdersEnum } from "../../types/Filters";
  import { filterCommands } from "../../utils/filterCommands";

  let search = $state<SearchProps>({
    search: "",
    filter: AttributesEnum.Command,
    order: OrdersEnum.Updated,
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
    addingCommand = !addingCommand;
  }

  const filteredCommands = $derived(
    filterCommands($userStorage.data.commands, $userStorage.data.tags, search)
  );

  onMount(() => {
    console.log($state.snapshot($userStorage.profile));
  });
</script>

<WindowBar />
<NavBar />
{#if $layout.tagBarOpen}
  <TagBar />
{/if}

<div id="page">
  <h1 class="fl">Comandos Salvos</h1>
  <Input
    value={search.search}
    oninput={handleSearch}
    placeholder={search.filter === AttributesEnum.Command
      ? "Procurar"
      : search.filter === AttributesEnum.Flags ||
          search.filter === AttributesEnum.Tags
        ? "Separe por virgula"
        : ""}
    Adorment={Search}
    adormentProps={{ height: 25, width: 25, stroke: "var(--font-color)" }}
  />
  <div id="actions">
    <div>
      <SearchFilter
        class="action"
        type="attributes"
        currentFilter={search.filter}
        onSelect={(f) => (search.filter = f as AttributesEnum)}
      />
      <SearchFilter
        class="action"
        type="order"
        currentFilter={search.order}
        onSelect={(f) => (search.order = f as OrdersEnum)}
      />
    </div>
    <AddButton
      style={addingCommand ? "rotate: 45deg" : ""}
      onclick={toggleAddingCommand}
    />
  </div>

  <div id="commands">
    {#if addingCommand}
      <CommandEditor onCreate={() => (addingCommand = false)} />
    {/if}
    {#each filteredCommands as command (command.uuid)}
      <Command {...command} />
    {/each}
  </div>
</div>

<style>
  #commands {
    overflow-y: auto;
    overflow-x: hidden;
    height: 450px;
  }

  h1 {
    color: var(--text-contrast);
    margin-bottom: 25px;
    margin-top: 40px;
  }

  #actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  :global(.action) {
    margin-bottom: 10px;
  }

  #page {
    padding-inline: 10vw;
  }
</style>
