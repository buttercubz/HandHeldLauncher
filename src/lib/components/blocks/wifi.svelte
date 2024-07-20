<script lang="ts">
  import { WifiIcon, WifiOffIcon } from "lucide-svelte";
  import { onMount } from "svelte";

  let connected = false;

  function updateStatus(status: boolean) {
    connected = status;
  }

  onMount(() => {
    updateStatus(window.navigator.onLine);

    window.addEventListener("offline", () =>
      updateStatus(window.navigator.onLine)
    );

    window.addEventListener("online", () =>
      updateStatus(window.navigator.onLine)
    );
  });
</script>

{#if connected}
  <WifiIcon />
{:else}
  <WifiOffIcon />
{/if}
