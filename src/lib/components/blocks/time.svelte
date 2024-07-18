<script lang="ts">
  import { onMount } from "svelte";

  let currentTime: string = "";

  function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const twelveHourFormat = hours % 12 || 12;
    currentTime = `${twelveHourFormat}:${minutes} ${ampm}`;
  }

  onMount(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<p class="text-lg font-semibold">{currentTime}</p>
