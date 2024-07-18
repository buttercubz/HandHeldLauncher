<script>
  import { onMount } from "svelte";
  import "../app.css";

  onMount(() => {
    // remove original css to overwrite it
    const payloadCss = document.head.querySelector("#KioskBoardInternalCSS");

    if (payloadCss) {
      payloadCss.remove();
    }
  });
</script>

<slot></slot>
