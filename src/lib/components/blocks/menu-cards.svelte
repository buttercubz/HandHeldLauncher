<script>
  import { Gamepad2, SettingsIcon } from "lucide-svelte";
  import { goto } from "$app/navigation";
</script>

<div class="flex items-center justify-between space-x-4">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="relative outlined outline-offset-0 rounded-lg w-[300px] h-[150px] group flex flex-col items-center justify-center bg-primary/30 backdrop-blur-xl font-bold text-white navigable-items"
    data-click
    on:click={() => (window.location.pathname = "/library")}
  >
    <Gamepad2 class="w-12 h-12 text-white" />
    <div class="text-white bottom-0 absolute w-full p-4 rounded-b-lg">
      Library
    </div>
  </div>

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    data-click
    on:click={() => (window.location.pathname = "/settings")}
    class="relative outlined outline-offset-0 rounded-lg w-[300px] h-[150px] group flex flex-col items-center justify-center bg-primary/30 backdrop-blur-xl font-bold text-white navigable-items"
  >
    <SettingsIcon class="w-12 h-12 text-white" />
    <div class="text-white bottom-0 absolute w-full p-4 rounded-b-lg">
      Settings
    </div>
  </div>

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    data-click
    on:click={() => window.open("steam://open/main", "_blank")}
    class="relative outlined outline-offset-0 rounded-lg w-[300px] h-[150px] group flex flex-col items-center justify-center bg-primary/30 backdrop-blur-xl font-bold text-white navigable-items"
    style={`
      background-image: url("${"https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/07/steam-restriction-images-change.jpg"}");
      background-position: center;
      background-size: cover;
    `}
  >
    <div class="text-white bottom-0 absolute w-full p-4 rounded-b-lg">
      Steam
    </div>
  </div>

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    data-click
    on:click={() => window.open("com.epicgames.launcher://apps", "_blank")}
    class="relative outlined outline-offset-0 rounded-lg w-[300px] h-[150px] group flex flex-col items-center justify-center bg-primary/30 backdrop-blur-xl font-bold text-white navigable-items"
    style={`
      background-image: url("${"https://cdn2.unrealengine.com/epic-games-store-my-achievements-update-april-2022-1920x1080-9bac47fb382b.jpg"}");
      background-position: center;
      background-size: cover;
    `}
  >
    <div class="text-white bottom-0 absolute w-full p-4 rounded-b-lg">
      Epic Games
    </div>
  </div>
</div>
