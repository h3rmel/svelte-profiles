<script lang="ts">
  // Imports
  import ErrorIcon from "@/assets/ErrorIcon.svelte";
  import CardUser from "@/components/CardUser.svelte";
  import { searchUser } from "@/services/user";

  let searchQuery: string = "";

  let user: User | null = null;

  // Request behavior
  let isLoading: boolean = false;
  let fetchError: FetchError = { status: 0, message: "" };

  async function handleSubmit() {
    const abortController = new AbortController();

    isLoading = true;
    fetchError = { status: 0, message: "" };

    try {
      const response = await searchUser(searchQuery, {
        signal: abortController.signal,
      });

      if (response.ok) {
        const data: User = await response.json();

        user = data as User;

        return;
      }

      const data: GitHubErrorResponse = await response.json();

      fetchError = {
        status: response.status,
        message: data.message,
      };

      setTimeout(() => {
        fetchError = { status: 0, message: "" };
      }, 3000);

      return Promise.reject();
    } catch (error) {
      if (abortController.signal.aborted) console.error("Request was aborted.");
      else console.error("Request failed.");
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="container mt-8 flex flex-col gap-8 items-center">
  <!-- Heading -->
  <hgroup class="text-center">
    <h1 class="text-3xl font-semibold tracking-wider">
      GitHub Profiles <small class="text-base tracking-normal"
        >Powered w/ Svelte</small
      >
    </h1>
    <p class="text-neutral">Search someone on Github!</p>
  </hgroup>
  <!-- Form (Input + Submit Button) -->
  <form
    on:submit|preventDefault={handleSubmit}
    class="card flex-row p-4 border-[1px] border-border flex gap-2"
  >
    <input
      type="text"
      class="input input-solid"
      placeholder="Pesquisar..."
      bind:value={searchQuery}
    />
    <button class="btn btn-primary" type="submit" disabled={isLoading}>
      Pesquisar
    </button>
  </form>
  <!-- Alert -->
  {#if fetchError.status !== 0}
    <div class="alert alert-error max-w-[24rem]">
      <ErrorIcon />
      <div class="flex flex-col">
        <span>Error - {fetchError.status}</span>
        <span class="text-content2">{fetchError.message}</span>
      </div>
    </div>
  {/if}
  <!-- User -->
  {#if user}
    <CardUser {user} />
  {/if}
</div>
