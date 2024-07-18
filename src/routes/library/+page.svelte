<script lang="ts">
  import Ubisoft from "$lib/components/icons/Ubisoft.svelte";
  import Epic from "$lib/components/icons/EpicGames.svelte";
  import { Progress } from "$lib/components/ui/progress";
  import Steam from "$lib/components/icons/Steam.svelte";
  import Xbox from "$lib/components/icons/xbox.svelte";
  import * as Avatar from "$lib/components/ui/avatar";
  import Gog from "$lib/components/icons/Gog.svelte";
  import { Button } from "$lib/components/ui/button";
  import Ea from "$lib/components/icons/Ea.svelte";
  import { Input } from "$lib/components/ui/input";
  import { ArrowLeftIcon } from "lucide-svelte";
  import type { ComponentType } from "svelte";
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";

  //@ts-expect-error
  import { GamepadListener } from "gamepad.js";

  interface Game {
    title: string;
    imgSrc: string;
  }

  interface MenuItem {
    name: string;
    icon: ComponentType | null;
    scale?: string;
  }

  const games: Game[] = [
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

  const menuItems: MenuItem[] = [
    { name: "Back", icon: ArrowLeftIcon },
    { name: "All Games", icon: null },
    { name: "Steam", icon: Steam },
    { name: "Xbox", icon: Xbox, scale: "scale-[.09]" },
    { name: "EA", icon: Ea },
    { name: "GOG", icon: Gog },
    { name: "Epic", icon: Epic },
    { name: "Ubisoft", icon: Ubisoft },
  ];

  type Zone = "menu" | "search" | "games";
  let currentZone: Zone = "menu";
  let menuIndex = 0;
  let gamesIndex = 0;
  let searchFocused = false;

  function updateFocus(): void {
    const menuElements = document.querySelectorAll(".sidebar-item");
    const gameElements = document.querySelectorAll(".navigable-games");
    const searchInput = document.querySelector(
      'input[type="search"]'
    ) as HTMLInputElement;

    menuElements.forEach((el, index) => {
      el.classList.toggle(
        "selected-element",
        currentZone === "menu" && index === menuIndex
      );
    });

    gameElements.forEach((el, index) => {
      el.classList.toggle(
        "selected-element",
        currentZone === "games" && index === gamesIndex
      );
    });

    searchInput.classList.toggle("selected-element", currentZone === "search");
    searchFocused = currentZone === "search";

    if (currentZone === "menu" && menuElements[menuIndex]) {
      (menuElements[menuIndex] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    } else if (currentZone === "games" && gameElements[gamesIndex]) {
      (gameElements[gamesIndex] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }

  function handleNavigation(direction: "up" | "down" | "left" | "right"): void {
    switch (currentZone) {
      case "menu":
        if (direction === "down") {
          menuIndex = (menuIndex + 1) % menuItems.length;
        } else if (direction === "up") {
          menuIndex = (menuIndex - 1 + menuItems.length) % menuItems.length;
        } else if (direction === "right") {
          currentZone = "search";
        }
        break;
      case "search":
        if (direction === "left") {
          currentZone = "menu";
        } else if (direction === "down") {
          currentZone = "games";
          gamesIndex = 0;
        }
        break;
      case "games":
        const cols = 3;
        const rows = Math.ceil(games.length / cols);
        const currentRow = Math.floor(gamesIndex / cols);
        const currentCol = gamesIndex % cols;

        if (direction === "up") {
          gamesIndex = (gamesIndex - cols + games.length) % games.length;
          if (gamesIndex < cols) currentZone = "search";
        } else if (direction === "down") {
          gamesIndex = (gamesIndex + cols) % games.length;
        } else if (direction === "left") {
          gamesIndex = (gamesIndex - 1 + games.length) % games.length;
          if (gamesIndex % cols === cols - 1) currentZone = "menu";
        } else if (direction === "right") {
          gamesIndex = (gamesIndex + 1) % games.length;
        }
        break;
    }
    updateFocus();
  }

  function handleAction(): void {
    switch (currentZone) {
      case "menu":
        if (menuIndex === 0) {
          window.location.pathname = "/";
        } else {
          console.log(`Selected: ${menuItems[menuIndex].name}`);
        }
        break;
      case "games":
        console.log(`Selected game: ${games[gamesIndex].title}`);
        break;
      case "search":
        console.log("Search focused");
        break;
    }
  }

  onMount(() => {
    const listener = new GamepadListener({ analog: true });

    listener.on(
      "gamepad:button",
      (e: { detail: { value: number; button: number } }) => {
        if (e.detail.value === 1) {
          switch (e.detail.button) {
            case 12:
              handleNavigation("up");
              break;
            case 13:
              handleNavigation("down");
              break;
            case 14:
              handleNavigation("left");
              break;
            case 15:
              handleNavigation("right");
              break;
            case 0:
              handleAction();
              break;
            case 1:
              window.location.pathname = "/";
              break;
          }
        }
      }
    );

    listener.start();
    updateFocus(); // Initial focus
  });
</script>

<div class="w-[100dvw] h-[100dvh] bg-custom bg-cover bg-center flex flex-row">
  <div
    class="bg-background/10 backdrop-blur-3xl w-3/12 flex flex-col justify-between border-r"
  >
    <div class="flex flex-col space-y-10">
      <div class="ml-5 mt-5 mr-5 flex flex-row justify-between">
        <Button
          class="flex flex-row items-center space-x-2 hover:bg-transparent"
          variant="ghost"
          data-tab="1"
        >
          <Avatar.Root>
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
            <Avatar.Fallback>CN</Avatar.Fallback>
          </Avatar.Root>
          <span> LeGo OS </span>
        </Button>
      </div>
    </div>

    <ul class="h-auto my-auto p-4 space-y-1">
      {#each menuItems as item, index}
        <li
          class={cn(
            "h-16 border text-center bg-background/10 flex items-center justify-center rounded sidebar-item transition-all duration-200 ease-in-out",
            {
              "my-5": index === 0,
            }
          )}
        >
          {#if item.icon}
            <svelte:component this={item.icon} class={item.scale || ""} />
          {:else}
            <span class="uppercase">{item.name}</span>
          {/if}
        </li>
      {/each}
    </ul>

    <div
      class="bg-background/10 backdrop-blur-3xl h-40 border-t flex flex-col items-center justify-center space-y-5"
    >
      <span class="font-semibold"> Storage </span>
      <div class="w-[80%] flex flex-col items-center">
        <Progress value={80} max={100} class="w-full" />
        <span> 194.3 GB free </span>
      </div>
    </div>
  </div>

  <div class="bg-background/10 backdrop-blur-3xl w-9/12">
    <div class="mt-2">
      <div class="p-3">
        <Input
          type="search"
          placeholder="Search"
          class={cn({
            ring: searchFocused,
            "ring-primary": searchFocused,
          })}
        />
      </div>

      <div
        class="grid grid-cols-3 p-5 gap-3 overflow-y-auto h-[90dvh] mx-auto pl-10"
        id="game-list"
      >
        {#each games as game}
          <div
            class={cn(
              "relative outlined outline-offset-0 rounded-lg w-[250px] h-[270px] transition-all group navigable-games"
            )}
          >
            <img
              class="w-full h-full object-fill rounded-xl"
              src={game.imgSrc}
              alt={game.title}
            />
            <div
              class="opacity-100 transition-all bg-primary/30 bottom-0 absolute w-full p-4 rounded-b-lg backdrop-blur-xl font-bold text-white title-game-card flex flex-row items-center justify-between"
            >
              <span class="text-md">
                {game.title}
              </span>
              <Steam />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .bg-custom {
    background-image: url("/background.png");
  }

  .selected-element {
    @apply ring-2 ring-primary ring-offset-2 ring-offset-background;
  }

  .selected-element.navigable-games {
    @apply scale-105 z-10;
  }

  #game-list::-webkit-scrollbar {
    display: none;
  }

  #game-list {
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .selected-element > .title-game-card {
    @apply opacity-100;
  }

  .sidebar-item {
    @apply transition-all duration-200 ease-in-out;
  }

  .sidebar-item:hover,
  .sidebar-item.selected-element {
    @apply bg-primary/20 border-primary;
  }
</style>

<!-- <script lang="ts">
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
  import { Slider } from "$lib/components/ui/slider";
  import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import { onMount } from "svelte";

  //@ts-ignore
  import { GamepadListener } from "gamepad.js";

  import NavbarHome from "$lib/components/blocks/navbar-home.svelte";
  import GameCard from "$lib/components/blocks/game-card.svelte";
  import MenuCards from "$lib/components/blocks/menu-cards.svelte";

  let openSide = false;
  let openSideSettings = false;
  let openSettings = false;
  let brillo = [100];

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

  // Define zones and cursors
  type Zone = "nav" | "games" | "menu";
  let currentZone: Zone = "nav";
  let navIndex = 0;
  let gamesIndex = 0;
  let menuIndex = 0;

  function updateFocus() {
    const navElements = document.querySelectorAll(".navigable-nav");
    const gameElements = document.querySelectorAll(".navigable-games");
    const menuElements = document.querySelectorAll(".navigable-menu");

    navElements.forEach((el, index) => {
      el.classList.toggle(
        "selected-element",
        currentZone === "nav" && index === navIndex
      );
    });

    gameElements.forEach((el, index) => {
      el.classList.toggle(
        "selected-element",
        currentZone === "games" && index === gamesIndex
      );
    });

    menuElements.forEach((el, index) => {
      el.classList.toggle(
        "selected-element",
        currentZone === "menu" && index === menuIndex
      );
    });

    // Scroll into view logic
    if (currentZone === "games") {
      const gameList = document.getElementById("games-list-home");
      const selectedGame = gameElements[gamesIndex] as HTMLElement;
      if (gameList && selectedGame) {
        const scrollLeft =
          selectedGame.offsetLeft -
          gameList.clientWidth / 2 +
          selectedGame.clientWidth / 2;
        gameList.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }

  function handleNavigation(direction: "up" | "down" | "left" | "right") {
    switch (currentZone) {
      case "nav":
        if (direction === "down") {
          currentZone = "games";
        } else if (direction === "right") {
          navIndex = (navIndex + 1) % 3; // Assuming 3 nav items
        } else if (direction === "left") {
          navIndex = (navIndex - 1 + 3) % 3;
        }
        break;
      case "games":
        if (direction === "up") {
          currentZone = "nav";
        } else if (direction === "down") {
          currentZone = "menu";
        } else if (direction === "right") {
          gamesIndex = (gamesIndex + 1) % games.length;
        } else if (direction === "left") {
          gamesIndex = (gamesIndex - 1 + games.length) % games.length;
        }
        break;
      case "menu":
        if (direction === "up") {
          currentZone = "games";
        } else if (direction === "right") {
          menuIndex = (menuIndex + 1) % 4; // Assuming 4 menu items
        } else if (direction === "left") {
          menuIndex = (menuIndex - 1 + 4) % 4;
        }
        break;
    }
    updateFocus();
  }

  function handleAction() {
    switch (currentZone) {
      case "nav":
        // Handle nav action (e.g., open side menu)
        if (navIndex === 0) openSide = true;
        else if (navIndex === 1) openSideSettings = true;
        else if (navIndex === 2) openSettings = true;
        break;
      case "games":
        // Handle game selection
        console.log(`Selected game: ${games[gamesIndex].title}`);
        break;
      case "menu":
        // Handle menu action
        console.log(`Selected menu item: ${menuIndex}`);
        break;
    }
  }

  onMount(() => {
    const listener = new GamepadListener({ analog: true });

    listener.on("gamepad:button", (e: any) => {
      if (e.detail.value === 1) {
        switch (e.detail.button) {
          case 12:
            handleNavigation("up");
            break;
          case 13:
            handleNavigation("down");
            break;
          case 14:
            handleNavigation("left");
            break;
          case 15:
            handleNavigation("right");
            break;
          case 0:
            handleAction();
            break;
          case 1: // Handle back action (e.g., close menus)
            if (openSide) openSide = false;
            else if (openSideSettings) openSideSettings = false;
            else if (openSettings) openSettings = false;
            break;
        }
      }
    });

    listener.start();
    updateFocus(); // Initial focus
  });
</script>

<div
  class="w-[100dvw] h-[100dvh] flex flex-col bg-primary text-primary-foreground select-none items-center bg-custom bg-cover bg-center justify-start space-y-[25dvh]"
>
  <NavbarHome bind:openSide bind:openSideSettings bind:openSettings />

  <div class="flex flex-col w-full items-center space-y-4">
    <ul
      class="w-[94dvw] flex flex-row space-x-3 overflow-x-auto items-end justify-start h-auto p-5 mb-5"
      id="games-list-home"
    >
      {#each games as game, index}
        <li>
          <GameCard {...game} />
        </li>
      {/each}
    </ul>

    <MenuCards />
  </div>
</div>

<style lang="postcss">
  /* Keep existing styles */

  .selected-element {
    @apply ring-2 ring-primary ring-offset-2 ring-offset-background;
  }

  .selected-element.navigable-games {
    @apply scale-105 z-10;
  }

  #games-list-home {
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  #games-list-home::-webkit-scrollbar {
    display: none;
  }

  .selected-element > .title-game-card {
    @apply opacity-100;
  }
</style> -->
