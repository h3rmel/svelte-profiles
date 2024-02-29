<script lang="ts">
  export let repo: Repository;
</script>

<article
  class="card border-[1px] border-border w-[384px] h-[320px]"
  id={`${repo.name}-${repo.id}`}
>
  <!-- Card Header -->
  <section class="card-header flex-col items-start gap-1 p-4 pb-0">
    <h3 class="text-xl font-mono kbd py-0 px-1">
      {repo.name}
    </h3>
    <p class="text-xs text-neutral ml-[2px]">
      {repo.description}
    </p>
  </section>
  <div class="divider my-0" />
  <!-- Card Body/Content -->
  <section class="card-body py-0 px-4">
    <!-- Topics -->
    <div class="flex flex-col items-start gap-1">
      <strong>Tópicos:</strong>
      <div class="flex flex-wrap gap-1">
        {#each repo.topics as topic}
          <span class="badge badge-flat-primary">
            {topic}
          </span>
        {/each}
      </div>
    </div>
    <!-- Homepage (if exists) -->
    {#if repo.homepage}
      <div class="flex flex-col items-start gap-1">
        <strong>Homepage:</strong>
        <a href={repo.homepage} class="link link-primary hover:link-underline">
          {repo.homepage}
        </a>
      </div>
    {/if}
  </section>
  <div class="divider my-0" />
  <!-- Card Footer -->
  <section class="card-footer h-max items-end px-4">
    <a href={repo.html_url} target="_blank" class="link link-ghost-primary">
      Ir para repositório
    </a>
  </section>
</article>
