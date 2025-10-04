<script lang="ts">
  import Arrow from "../../assets/icons/Arrow.svelte";
  import {
    FilterEnum,
    type Filter,
    type SearchProps,
  } from "../../types/Search";
  import Button from "./Button.svelte";

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
  <Button
    id="filter-wrapper"
    style="position: relative; z-index: 10; padding-block: 6px; padding-left: 12px; margin-block: 14px;"
    onclick={() => (open = !open)}
  >
    <p>Filter by: {currentFilter}</p>
    <div id="arrow-wrapper" style={`rotate: ${open ? "90deg" : "-90deg"};`}>
      <Arrow fill="white" width={20} height={20} />
    </div>
  </Button>

  {#if open}
    <div id="filters-wrapper" class="position: relative;">
      {#each filters as filter}
        <Button
          id="filter"
          style="min-width: 85px; padding-block: 8px; margin-left: 8px;"
          onclick={() => handleFilterSelect(filter)}
        >
          {filter}
        </Button>
      {/each}
    </div>
  {/if}
</div>

<style>
  #wrapper {
    display: flex;
    align-items: center;
  }

  #filters-wrapper {
    display: flex;
  }

  #arrow-wrapper {
    margin-right: 2px;
    width: 20px;
    height: 20px;
  }
</style>
