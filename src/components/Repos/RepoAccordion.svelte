<script lang="ts">
  export let repo: Repository;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<article class="accordion">
  <!-- Visible part -->
  <input type="checkbox" id={`toggle-${repo.id}`} class="accordion-toggle" />
  <label for={`toggle-${repo.id}`} class="accordion-title items-start">
    <span class="text-lg kbd py-0 px-2">{repo.name}</span>
    <span class="text-sm text-content3 font-normal">{repo.description}</span>
  </label>
  <!-- Content -->
  <section class="accordion-content text-content2">
    <div class="min-h-0">
      <div class="flex flex-col items-start gap-1">
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
        <!-- Homepage + Link -->
        <div class="flex justify-between items-center">
          <!-- Homepage (if exists) -->
          {#if repo.homepage}
            <div class="flex flex-col items-start gap-1">
              <strong>Homepage:</strong>
              <a
                href={repo.homepage}
                class="link link-primary hover:link-underline"
              >
                {repo.homepage}
              </a>
            </div>
          {/if}
          <!-- Link -->
          <a
            href={repo.html_url}
            target="_blank"
            class="link link-ghost-primary items-end"
          >
            Ir para repositório
          </a>
        </div>
      </div>
    </div>
  </section>
</article>
