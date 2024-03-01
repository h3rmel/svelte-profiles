<script lang="ts">
  import type { EventHandler } from "svelte/elements";
  import { searchQuery } from "@/store/searchQuery";

  export let handleSubmit: EventHandler<SubmitEvent>;
  export let isLoading: boolean;

  let query: string;

  function handleChange() {
    searchQuery.set(query);
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="card flex-row p-4 border-[1px] border-border flex gap-2"
>
  <input
    type="text"
    class="input input-solid"
    placeholder="Pesquisar..."
    on:change={handleChange}
    bind:value={query}
  />
  <button class="btn btn-primary" type="submit" disabled={isLoading}>
    Pesquisar
  </button>
</form>
