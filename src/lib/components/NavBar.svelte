<script lang="ts">
  import layout from "../../stores/layout.svelte";
</script>

<header>
  <span>PwR</span>
  <nav>
    <ul>
      <li>
        <button
          onclick={() =>
            layout.update((prev) => {
              return { tagBarOpen: !prev.tagBarOpen };
            })}>Tags</button
        >
      </li>
    </ul>
  </nav>
</header>

<style>
  ul {
    display: flex;
    list-style-type: none;

    li {
      margin-left: 45px;
    }
  }

  button {
    color: var(--text-contrast);
  }

  header {
    padding-inline: 25px;
    padding-block: 25px;
    display: flex;
    justify-content: space-between;
    border-bottom: var(--border);
    color: var(--text-contrast);
  }
</style>
