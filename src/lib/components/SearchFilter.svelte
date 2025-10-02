<script lang="ts">
  import Arrow from "../../assets/icons/Arrow.svelte";
  import {
    FilterEnum,
    type Filter,
    type SearchProps,
  } from "../../types/Search";

  let open = $state(false);

  let {
    currentFilter,
    onSelect,
  }: {
    currentFilter: Filter;
    onSelect: (filter: Filter, ...args: any) => any;
  } = $props();

  const filters: Filter[] = Object.keys(FilterEnum) as Filter[];

  function handleFilterSelect(f: Filter) {
    onSelect(f);
    open = false;
  }
</script>

<div id="wrapper">
  <button
    id="filter-wrapper"
    style="position: relative; z-index: 10;"
    onclick={() => (open = !open)}
  >
    <p>Filter by: {currentFilter}</p>
    <div id="arrow-wrapper" style={`rotate: ${open ? "90deg" : "-90deg"};`}>
      <Arrow fill="white" width={20} height={20} />
    </div>
  </button>

  {#if open}
    <div id="filters-wrapper" class="position: relative;">
      {#each filters as filter}
        <button id="filter" onclick={() => handleFilterSelect(filter)}
          >{filter}</button
        >
      {/each}
    </div>
  {/if}
</div>

<style>
  #wrapper {
    display: flex;
    align-items: center;
  }

  #arrow-wrapper {
    margin-right: 2px;
    width: 20px;
    height: 20px;
  }

  #filter-wrapper {
    padding-block: 6px;
    padding-left: 12px;
    margin-block: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary);
    color: var(--text-contrast);
    border-radius: 100px;
  }

  #filter {
    color: var(--text-contrast);
    min-width: 85px;
    background-color: var(--primary);
    padding-block: 8px;
    border-radius: 100px;
    margin-left: 8px;
  }
</style>
