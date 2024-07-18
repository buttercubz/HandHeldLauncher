<script lang="ts">
  import {
    SettingsIcon,
    Gamepad2Icon,
    CircleGaugeIcon,
    GamepadIcon,
    Wrench,
    CircleHelpIcon,
    SunIcon,
    Volume2Icon,
    WifiIcon,
    BluetoothIcon,
  } from "lucide-svelte";
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Drawer from "$lib/components/ui/drawer";
  import Slider from "$lib/components/blocks/slider.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import { onMount } from "svelte";

  import NavbarHome from "$lib/components/blocks/navbar-home.svelte";
  import GameCard from "$lib/components/blocks/game-card.svelte";
  import MenuCards from "$lib/components/blocks/menu-cards.svelte";

  import { GamepadNavigationProvider } from "$lib/components/gamepad-navigation";
  import { fade } from "svelte/transition";

  let openSide = false;
  let openSideSettings = false;
  let openSettings = false;

  let openKeyboard = false;

  let zones = [".navigable-nav", ".navigable-games", ".navigable-items"];

  const games = [
    {
      title: "Halo Infinite",
      imgSrc:
        "https://cdn.mobygames.com/covers/11143838-halo-infinite-campaign-windows-apps-front-cover.jpg",
    },
    {
      title: "Diablo IV",
      imgSrc:
        "https://cdn.mobygames.com/covers/17161000-diablo-iv-playstation-4-front-cover.jpg",
    },
    {
      title: "Grand Theft Auto V",
      imgSrc:
        "https://cdn.mobygames.com/covers/3482873-grand-theft-auto-v-xbox-one-front-cover.jpg",
    },
    {
      title: "Starfield",
      imgSrc:
        "https://cdn.mobygames.com/covers/17586252-starfield-windows-apps-front-cover.jpg",
    },
    {
      title: "Red Dead Redemption II",
      imgSrc:
        "https://cdn.mobygames.com/covers/11283278-red-dead-redemption-ii-xbox-one-front-cover.jpg",
    },
    {
      title: "Sekiro: Shadows Die Twice",
      imgSrc:
        "https://cdn.mobygames.com/covers/3561816-sekiro-shadows-die-twice-playstation-4-front-cover.jpg",
    },
    {
      title: "Halo Infinite",
      imgSrc:
        "https://cdn.mobygames.com/covers/11143838-halo-infinite-campaign-windows-apps-front-cover.jpg",
    },
    {
      title: "Starfield",
      imgSrc:
        "https://cdn.mobygames.com/covers/17586252-starfield-windows-apps-front-cover.jpg",
    },
    {
      title: "Halo Infinite",
      imgSrc:
        "https://cdn.mobygames.com/covers/11143838-halo-infinite-campaign-windows-apps-front-cover.jpg",
    },
    {
      title: "Diablo IV",
      imgSrc:
        "https://cdn.mobygames.com/covers/17161000-diablo-iv-playstation-4-front-cover.jpg",
    },
    {
      title: "Grand Theft Auto V",
      imgSrc:
        "https://cdn.mobygames.com/covers/3482873-grand-theft-auto-v-xbox-one-front-cover.jpg",
    },
    {
      title: "Starfield",
      imgSrc:
        "https://cdn.mobygames.com/covers/17586252-starfield-windows-apps-front-cover.jpg",
    },
    {
      title: "Red Dead Redemption II",
      imgSrc:
        "https://cdn.mobygames.com/covers/11283278-red-dead-redemption-ii-xbox-one-front-cover.jpg",
    },
    {
      title: "Sekiro: Shadows Die Twice",
      imgSrc:
        "https://cdn.mobygames.com/covers/3561816-sekiro-shadows-die-twice-playstation-4-front-cover.jpg",
    },
    {
      title: "Halo Infinite",
      imgSrc:
        "https://cdn.mobygames.com/covers/11143838-halo-infinite-campaign-windows-apps-front-cover.jpg",
    },
    {
      title: "Starfield",
      imgSrc:
        "https://cdn.mobygames.com/covers/17586252-starfield-windows-apps-front-cover.jpg",
    },
    {
      title: "Halo Infinite",
      imgSrc:
        "https://cdn.mobygames.com/covers/11143838-halo-infinite-campaign-windows-apps-front-cover.jpg",
    },
    {
      title: "Diablo IV",
      imgSrc:
        "https://cdn.mobygames.com/covers/17161000-diablo-iv-playstation-4-front-cover.jpg",
    },
    {
      title: "Grand Theft Auto V",
      imgSrc:
        "https://cdn.mobygames.com/covers/3482873-grand-theft-auto-v-xbox-one-front-cover.jpg",
    },
    {
      title: "Starfield",
      imgSrc:
        "https://cdn.mobygames.com/covers/17586252-starfield-windows-apps-front-cover.jpg",
    },
    {
      title: "Red Dead Redemption II",
      imgSrc:
        "https://cdn.mobygames.com/covers/11283278-red-dead-redemption-ii-xbox-one-front-cover.jpg",
    },
    {
      title: "Sekiro: Shadows Die Twice",
      imgSrc:
        "https://cdn.mobygames.com/covers/3561816-sekiro-shadows-die-twice-playstation-4-front-cover.jpg",
    },
    {
      title: "Halo Infinite",
      imgSrc:
        "https://cdn.mobygames.com/covers/11143838-halo-infinite-campaign-windows-apps-front-cover.jpg",
    },
    {
      title: "Starfield",
      imgSrc:
        "https://cdn.mobygames.com/covers/17586252-starfield-windows-apps-front-cover.jpg",
    },
  ];
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
    class="w-[100dvw] h-[100dvh] flex flex-col bg-primary text-primary-foreground select-none items-center bg-custom bg-cover bg-center justify-start space-y-[25dvh]"
    in:fade
    out:fade
  >
    <NavbarHome bind:openSide bind:openSideSettings bind:openSettings />

    <div class="flex flex-col w-full items-center space-y-4">
      <ul
        class="w-[98dvw] flex flex-row space-x-3 overflow-x-auto items-end justify-start h-auto p-5 mb-5 remove-scroll"
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
