<script lang="ts">
  import RepoCard from "./RepoCard.svelte";

  export let repos: (Repository | undefined)[];
</script>

<section class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
  {#each repos as repo}
    {#if repo}
      <RepoCard {repo} />
    {/if}
  {/each}
</section>
