<script lang="ts">
  import { SearchIcon, SettingsIcon } from "lucide-svelte";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Button } from "$lib/components/ui/button";
  import { goto } from "$app/navigation";
  import Battery from "./battery.svelte";
  import Wifi from "./wifi.svelte";
  import Time from "./time.svelte";
  import Input from "../ui/input/input.svelte";

  export let openSide = false;
  export let openSettings = false;
  export let openSideSettings = false;
</script>

<nav
  class="bg-background/10 backdrop-blur-3xl h-16 w-full flex flex-row text-foreground"
>
  <ul class="flex flex-row justify-between w-full px-5 items-center">
    <li>
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <Button
        class="flex flex-row items-center space-x-2 hover:bg-transparent navigable-nav"
        on:click={() => (openSide = !openSide)}
        variant="ghost"
        data-click
      >
        <Avatar.Root>
          <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar.Root>

        <span> LeGo OS </span>
      </Button>
    </li>

    <li>
      <Input class="navigable-nav" placeholder="search" type="text" />

      <!-- <Button
        variant="outline"
        class="rounded-full bg-transparent h-10 w-10 p-0 border-foreground navigable-nav"
        on:click={() => (openSideSettings = !openSideSettings)}
        data-tab="2"
        data-click
      >
        <SearchIcon size={24} />
      </Button>

      <Button
        variant="outline"
        class="rounded-full bg-transparent h-10 w-10 p-0 border-foreground navigable-nav"
        on:click={() => goto("/lock-screen")}
        data-tab="3"
        data-click
      >
        <SettingsIcon size={24} />
      </Button> -->
    </li>

    <li class="flex flex-row items-center space-x-3">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <Button
        variant="ghost"
        class="hover:bg-transparent navigable-nav"
        on:click={() => (openSideSettings = !openSideSettings)}
        data-click
      >
        <Wifi />
      </Button>
      <Battery />
      <Time />
    </li>
  </ul>
</nav>

<style>
  #KioskBoard-VirtualKeyboard {
    background: none;

    @apply !bg-background/10 backdrop-blur-3xl;
  }
</style>
