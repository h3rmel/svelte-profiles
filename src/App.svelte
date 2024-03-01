<script lang="ts">
  // Imports
  import type { AxiosError } from "axios";

  import Alert from "@/components/Alert.svelte";
  import CardUser from "@/components/CardUser.svelte";
  import ReposGrid from "@/components/Repos/ReposGrid.svelte";
  import ReposList from "@/components/Repos/ReposList.svelte";
  import Form from "@/components/Form.svelte";

  import { searchQuery } from "@/store/searchQuery";

  // Switch to Local services if the request for GitHub API exceeded.
  import { searchUserLocal, searchUserReposLocal } from "@/api";

  import { applyReposMask, applyUserMask } from "@/utils";

  // Datas
  let user: User | null = null;
  let repos: (Repository | undefined)[] | null = null;

  // Request behavior
  let isLoading: boolean = false;
  let requestError: AxiosError = { status: 0 } as AxiosError;

  // View behavior
  $: viewType = "grid";

  console.log(searchQuery.);

  async function handleSubmit() {
    const abortController = new AbortController();

    isLoading = true;

    try {
      const [userResponse, reposResponse] = await Promise.all([
        searchUserLocal(),
        searchUserReposLocal(),
        // searchUser(searchQuery, { signal: abortController.signal }),
        // searchUserRepos(searchQuery, { signal: abortController.signal }),
      ]);

      user = applyUserMask(userResponse);
      repos = reposResponse.map((repo: GitHubRepository) =>
        applyReposMask(repo, repo.owner.login)
      );
    } catch (error) {
      requestError = error as AxiosError;

      setTimeout(() => {
        requestError = { status: 0 } as AxiosError;
      }, 3000);

      console.error(requestError);
    } finally {
      isLoading = false;
    }
  }

  function handleViewTypeChange(value: string) {
    viewType = value;
  }
</script>

<!-- TODO: Adicionar botões suspensos: GitHub, Meu Perfil, etc. -->
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
  <Form {isLoading} {handleSubmit} />
  <!-- Alert -->
  {#if requestError.status !== 0}
    <Alert
      styles="max-w-[24rem]"
      variant="error"
      title={`Error - ${requestError.status}`}
      text={requestError.message}
    />
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
