<script lang="ts">
  // Imports
  import ErrorIcon from "@/assets/ErrorIcon.svelte";
  import CardUser from "@/components/CardUser.svelte";
  import ReposGrid from "@/components/Repos/ReposGrid.svelte";
  import ReposList from "@/components/Repos/ReposList.svelte";

  // Switch to Local services if the request for GitHub API exceeded.
  import { searchUserLocal, searchUserReposLocal } from "@/services/index";
  // import { searchUser, searchUserRepos } from "@/services/index";

  import { applyRepoMask, applyUserMask } from "@/utils/index";

  // Datas
  let user: User | null = null;
  let repos: (Repository | undefined)[] | null = null;

  // Queries
  let searchQuery: string = "";

  // Request behavior
  let isLoading: boolean = false;
  let fetchError: FetchError = { status: 0, message: "" };

  async function handleSubmit() {
    const abortController = new AbortController();

    isLoading = true;
    fetchError = { status: 0, message: "" };

    try {
      const [userResponse, reposResponse] = await Promise.all([
        searchUserLocal(),
        searchUserReposLocal(),
      ]);

      if (userResponse.ok && reposResponse.ok) {
        const dataUser: GitHubUser = await userResponse.json();
        const dataRepos: GitHubRepository[] = await reposResponse.json();

        console.log(dataUser);
        console.log(dataRepos);

        user = applyUserMask(dataUser);

        repos = dataRepos.map((repo: GitHubRepository) => {
          return applyRepoMask(repo, user?.login ?? "");
        });

        return;
      }

      if (!userResponse.ok && !reposResponse.ok) {
        const dataError: GitHubErrorResponse = await userResponse.json();

        fetchError = {
          status: userResponse.status,
          message: dataError.message,
        };

        user = null;
        repos = null;

        setTimeout(() => {
          fetchError = { status: 0, message: "" };
        }, 3000);

        return Promise.reject();
      }
    } catch (error) {
      if (abortController.signal.aborted) console.error("Request was aborted.");
      else console.error("Request failed.");

      console.error(error);
    } finally {
      isLoading = false;
    }
  }

  // View behavior
  $: viewType = "grid";

  function handleViewTypeChange(value: string) {
    viewType = value;
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
  <!-- TODO: Transformar formulário em componente -->
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
  <!-- TODO: Transformar alerta em componente -->
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
  <!-- Repos -->
  <!-- TODO: Transformar seção dos repositórios em componente -->
  {#if repos}
    <section class="flex items-center gap-2">
      <p class="text-base">Visão:</p>
      <div class="tabs tabs-boxed flex-nowrap gap-1">
        <button
          class={`tab ${viewType === "grid" && "tab-active"}`}
          on:click={() => handleViewTypeChange("grid")}>Grid</button
        >
        <button
          class={`tab ${viewType === "list" && "tab-active"}`}
          on:click={() => handleViewTypeChange("list")}>List</button
        >
      </div>
    </section>
    <!-- Grid view -->
    {#if viewType === "grid"}
      <ReposGrid {repos} />
    {/if}
    <!-- List view -->
    {#if viewType === "list"}
      <ReposList {repos} />
    {/if}
  {/if}
</div>
