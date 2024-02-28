<script lang="ts">
  export let user: User;
</script>

<!-- Card -->
<article class="card border-[1px] border-border">
  <!-- Card Header -->
  <section class="card-header justify-start gap-4 p-4 pb-0">
    <div class="avatar avatar-xl">
      <img src={user.avatar_url ?? ""} alt="mama" />
    </div>
    <hgroup>
      <h2 class="text-2xl">{user.name}</h2>
      <p
        class="text-xs text-neutral max-w-[40ch] whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {user.bio}
      </p>
    </hgroup>
  </section>
  <div class="divider my-0" />
  <!-- Card Body/Content -->
  <section class="card-body py-0 px-4">
    <div class="flex">
      <div class="w-1/2">
        <p>
          <strong>Usuário:</strong>
          {user.login}
        </p>
        <p>
          <strong>Seguidores:</strong>
          {user.followers}
        </p>
      </div>
      <div class="w-1/2">
        <p>
          <strong>Repositórios:</strong>
          {user.public_repos}
        </p>
        <p>
          <strong>Gists:</strong>
          {user.public_gists}
        </p>
      </div>
    </div>
  </section>
  <div class="divider my-0" />
  <!-- Card Footer -->
  <section class="card-footer justify-end p-4 pt-0">
    <a href={user.html_url} target="_blank" class="link link-ghost-primary">
      Ir para o Github
    </a>
  </section>
</article>
