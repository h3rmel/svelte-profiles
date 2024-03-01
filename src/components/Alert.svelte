<script lang="ts">
  import InfoIcon from "@/assets/icons/InfoIcon.svelte";
  import SuccessIcon from "@/assets/icons/SuccessIcon.svelte";
  import WarningIcon from "@/assets/icons/WarningIcon.svelte";
  import ErrorIcon from "@/assets/icons/ErrorIcon.svelte";
  import DefaultIcon from "@/assets/icons/DefaultIcon.svelte";

  type AlertVariant = "info" | "success" | "warning" | "error" | "";

  export let variant: AlertVariant = "";
  export let title: string = "";
  export let text: string = "";
  export let styles: string = "";
</script>

<div class={`alert ${variant !== "" && `alert=${variant}`} ${styles}`}>
  {#if variant === "info"}
    <InfoIcon />
  {:else if variant === "success"}
    <SuccessIcon />
  {:else if variant === "warning"}
    <WarningIcon />
  {:else if variant === "error"}
    <ErrorIcon />
  {:else}
    <DefaultIcon />
  {/if}
  <div class="flex flex-col">
    <span>{title}</span>
    <span class="text-content2">{text}</span>
  </div>
</div>
