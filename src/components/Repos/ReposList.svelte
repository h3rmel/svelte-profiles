<script lang="ts">
  import RepoAccordion from "./RepoAccordion.svelte";

  export let repos: (Repository | undefined)[];
</script>

<section class="accordion-group accordion-group-bordered max-w-[720px]">
  {#each repos as repo}
    {#if repo}
      <RepoAccordion {repo} />
    {/if}
  {/each}
</section>
