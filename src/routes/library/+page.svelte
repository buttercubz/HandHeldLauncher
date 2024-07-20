<script lang="ts">
  import { GamepadNavigationProvider } from "$lib/components/gamepad-navigation";
  import GameCard from "$lib/components/blocks/game-card.svelte";
  import { ArrowLeftIcon, HardDriveIcon } from "lucide-svelte";
  import Ubisoft from "$lib/components/icons/Ubisoft.svelte";
  import Epic from "$lib/components/icons/EpicGames.svelte";
  import { Progress } from "$lib/components/ui/progress";
  import Steam from "$lib/components/icons/Steam.svelte";
  import Xbox from "$lib/components/icons/xbox.svelte";
  import * as Avatar from "$lib/components/ui/avatar";
  import Gog from "$lib/components/icons/Gog.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Sheet from "$lib/components/ui/sheet";
  import Ea from "$lib/components/icons/Ea.svelte";
  import { Input } from "$lib/components/ui/input";
  import type { ComponentType } from "svelte";
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";

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
    { name: "All Games", icon: null },
    { name: "Steam", icon: Steam },
    { name: "Xbox", icon: Xbox, scale: "scale-[.09]" },
    { name: "EA Games", icon: Ea },
    { name: "GOG", icon: Gog },
    { name: "Epic", icon: Epic },
    { name: "Ubisoft", icon: Ubisoft },
  ];

  const disks = [1];
</script>

<GamepadNavigationProvider
  zones={[
    ".navigation-item",
    ".all-games",
    ".steam",
    ".xbox",
    ".ea-games",
    ".gog",
    ".epic",
    ".ubisoft",
  ]}
>
  <div class="w-[100svw] h-[100svh] bg-custom bg-cover bg-center flex flex-row">
    <div
      class="bg-background/10 backdrop-blur-3xl w-full flex flex-col justify-between"
    >
      <div class="mt-2">
        <div class="p-3 flex flex-row space-x-3">
          <Button
            class="flex flex-row items-center space-x-2 hover:bg-transparent navigation-item"
            variant="ghost"
          >
            <Avatar.Root>
              <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
              <Avatar.Fallback>CN</Avatar.Fallback>
            </Avatar.Root>
            <span> LeGo OS </span>
          </Button>

          <Button
            class="flex flex-row items-center space-x-2 hover:bg-transparent navigation-item"
            variant="ghost"
          >
            <HardDriveIcon />
            <span> Storage </span>
          </Button>

          <Input
            type="search"
            placeholder="Search game"
            class={"border-white placeholder:text-white navigation-item"}
          />

          <Button
            class="flex flex-row items-center space-x-2 hover:bg-transparent navigation-item"
            variant="ghost"
          >
            <ArrowLeftIcon />
            <span> Back </span>
          </Button>
        </div>

        <ul class="h-[90svh] my-auto p-4 overflow-y-scroll remove-scroll">
          {#each menuItems as item}
            <li>
              <div class="flex flex-col justify-center items-center">
                <div class="flex flex-row items-center">
                  <svelte:component this={item.icon} />
                  <span class="uppercase ml-5">{item.name}</span>
                </div>

                <ul
                  class="flex flex-row w-[98svw] overflow-x-scroll remove-scroll space-x-5 py-8"
                >
                  {#each games as game}
                    <GameCard
                      zone={`${item.name.toLocaleLowerCase().split(" ").join("-")}`}
                      {...game}
                      id=""
                    />
                  {/each}
                </ul>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div
      class="fixed bottom-5 bg-background/10 backdrop-blur-3xl w-[90svw] right-[6%] h-20 rounded-lg"
    >
      <div class="h-full w-full">
        <div class="flex flex-col">
          <div class="flex flex-col">
            <span> Disk Name: Windows-SSD, Label: C </span>
            <span> Storage: 1906.58 GB </span>
            <span> Free Space: 1033.5 GB </span>
          </div>

          <div class="w-full">
            <Progress max={100} value={48} />
          </div>
        </div>
      </div>
    </div>
  </div>
</GamepadNavigationProvider>

<Sheet.Root open={true}>
  <Sheet.Content class="!bg-background/10 backdrop-blur-3xl border-border/50 !w-10/12">
    <Sheet.Header>
      <Sheet.Title>Storage</Sheet.Title>

      {#each disks as e}
        <div class="flex flex-col">
          <Button class="flex">
            <div class="flex flex-row items-center justify-around mx-auto">
              <HardDriveIcon />
              <div class="flex flex-col my-4 ml-3">
                <span> Windows-SSD (C:) </span>
                <span> 1 TB Free of 1,9 TB </span>
              </div>
            </div>
          </Button>

          <div
            class="overflow-y-scroll p-4 mt-3"
            style="height: {60 / disks.length}svw;"
          >
            {#each games as game}
              <div class="flex flex-row items-center justify-between py-2">
                <div class="flex flex-row items-center">
                  <img
                    src={game.imgSrc}
                    alt={game.title}
                    class="w-[73.3333px] h-[103.3333px] rounded-sm"
                  />

                  <span class="ml-3">
                    {game.title}
                  </span>
                </div>

                <div class="flex flex-row space-x-2 items-center">
                  <span> 135,68 GB </span>
                  <Steam />
                </div>
              </div>
            {/each}
          </div>
        </div>

        <hr />
      {/each}
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>

<style lang="postcss">
  .bg-custom {
    background-image: url("/background.png");
  }
</style>
