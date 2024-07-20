<script lang="ts">
  import { onMount } from "svelte";

  import NavbarHome from "$lib/components/blocks/navbar-home.svelte";
  import GameCard from "$lib/components/blocks/game-card.svelte";
  import MenuCards from "$lib/components/blocks/menu-cards.svelte";

  import { GamepadNavigationProvider } from "$lib/components/gamepad-navigation";
  import { PUBLIC_BACKEND_URL } from '$env/static/public'
  import { fade } from "svelte/transition";

  let openSide = false;
  let openSideSettings = false;
  let openSettings = false;

  let openKeyboard = false;

  let zones = [".navigable-nav", ".navigable-games", ".navigable-items"];

  let games: any[] = [];

  onMount(async () => {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/api/steam/get-games`);

    const data: any[] = await response.json();

    games = data.map(({ name, verticalGrids }) => ({
      title: name,
      imgSrc: [...verticalGrids.data].find(({ width, height }) => {
        return width === 600 && height === 900;
      }).url,
    }));
  });
</script>

<GamepadNavigationProvider
  {zones}
  bind:openKeyboard
  on:openKeyboard={() => {
    setTimeout(() => {
      zones = [
        ".keyboard-top-0",
        ".keyboard-row-0",
        ".keyboard-row-1",
        ".keyboard-row-2",
        ".keyboard-special-0",
      ];
    }, 100);
    openKeyboard = true;
  }}
  on:closeKeyboard={() => {
    setTimeout(() => {
      zones = [".navigable-nav", ".navigable-games", ".navigable-items"];
    }, 100);
    openKeyboard = false;
  }}
>
  <div
    class="w-[100dvw] h-[100dvh] flex flex-col bg-primary text-primary-foreground select-none items-center bg-custom bg-cover bg-center justify-start space-y-[15dvh]"
    in:fade
    out:fade
  >
    <NavbarHome bind:openSide bind:openSideSettings bind:openSettings />

    <div class="flex flex-col w-full items-center space-y-4">
      <ul
        class="w-[98dvw] flex flex-row space-x-5 overflow-x-auto items-end justify-start h-auto p-8 mb-5 remove-scroll"
        id="games-list-home"
      >
        {#each games as game}
          <GameCard
            {...game}
            on:modal={({ detail }) => {
              if (detail) {
                zones = [".modal-buttons"];
              } else {
                zones = [
                  ".navigable-nav",
                  ".navigable-games",
                  ".navigable-items",
                ];
              }
            }}
          />
        {/each}
      </ul>

      <MenuCards />
    </div>
  </div>
</GamepadNavigationProvider>

<style lang="postcss">
  .bg-custom {
    background-image: url("/background.png");
  }
</style>
