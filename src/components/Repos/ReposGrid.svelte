<script lang="ts">
  import RepoCard from "./RepoCard.svelte";

  export let repos: (Repository | undefined)[];
</script>

<section class="grid grid-cols-3 gap-4 mb-8">
  {#each repos as repo}
    {#if repo}
      <RepoCard {repo} />
    {/if}
  {/each}
</section>
