<script lang="ts">
  import handleClickOutside from "../../actions/handleOutsideClick";
  import Arrow from "../../assets/icons/Arrow.svelte";
  import { AttributesEnum, OrdersEnum } from "../../types/Filters";
  import Button from "./Button.svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let open = $state(false);

  let {
    type,
    currentFilter,
    onSelect,
    ...props
  }: {
    type: "attributes" | "order";
    currentFilter: AttributesEnum | OrdersEnum;
    onSelect: (filter: AttributesEnum | OrdersEnum, ...args: any) => any;
  } & HTMLAttributes<HTMLDivElement> = $props();

  const filters = Object.values(
    type === "attributes" ? AttributesEnum : OrdersEnum
  );

  function handleFilterSelect(f: AttributesEnum | OrdersEnum) {
    onSelect(f);
    open = false;
  }
</script>

<div id="wrapper" use:handleClickOutside={() => (open = false)} {...props}>
  <Button
    id="filter-wrapper"
    style="position: relative; z-index: 10; padding-block: 6px; padding-left: 12px;"
    onclick={() => (open = !open)}
  >
    <p>{type === "attributes" ? "Filtro" : "Ord"}: {currentFilter}</p>
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
          onclick={() =>
            handleFilterSelect(filter as AttributesEnum | OrdersEnum)}
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
