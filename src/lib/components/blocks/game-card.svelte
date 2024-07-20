<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import Button from "$lib/components/ui/button/button.svelte";
  import { PUBLIC_BACKEND_URL } from "$env/static/public";
  import Steam from "$lib/components/icons/Steam.svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { createEventDispatcher } from "svelte";
  import { cn } from "$lib/utils";

  export let title = "";
  export let imgSrc = "";
  export let id = "";
  export let zone = "navigable-games";

  export let openModal = false;

  const dispatch = createEventDispatcher<{ modal: boolean }>();

  $: dispatch("modal", openModal);

  async function openGameid(id: string) {
    fetch(`${PUBLIC_BACKEND_URL}/api/steam/open-game?id=${id}`);
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
  class={cn(
    "relative outlined outline-offset-0 rounded-[14px] w-[220px] h-[310px] flex-shrink-0 transition-all group",
    zone
  )}
  on:click={() => (openModal = !openModal)}
  data-click
>
  <span
    class="text-white absolute right-0 bg-primary/10 p-1 backdrop-blur-xl rounded-lg flex text-base font-semibold items-center justify-between mr-1 mt-1 logo-game-card opacity-0"
  >
    <Steam />
  </span>

  <img class="w-full h-full object-cover rounded-xl" src={imgSrc} alt={title} />
  <div
    class="opacity-0 transition-all bg-primary/10 bottom-0 absolute w-full p-2 rounded-b-lg backdrop-blur-xl font-bold text-foreground title-game-card flex flex-row items-center justify-between"
  >
    <span class="text-md">
      {title}
    </span>
  </div>
</li>

<AlertDialog.Root bind:open={openModal} closeOnOutsideClick={true}>
  <AlertDialog.Content
    class="bg-background/10 backdrop-blur-3xl border-border/30"
  >
    <AlertDialog.Header class="justify-center items-center">
      <AlertDialog.Title>{title}</AlertDialog.Title>
    </AlertDialog.Header>

    <div class="flex flex-row items-center justify-center">
      <img
        class="w-[165px] h-[232.5px] object-fill rounded-xl"
        src={imgSrc}
        alt={title}
      />
    </div>

    <AlertDialog.Footer
      class="flex flex-row justify-between w-full items-center"
    >
      <div class="mx-auto">
        <Button
          data-click
          variant="outline"
          class="modal-buttons"
          on:click={() => (openModal = !openModal)}
        >
          Close
        </Button>
        <Button
          class="modal-buttons"
          data-click
          on:click={() => openGameid(id)}
        >
          Lauch Game
        </Button>
      </div>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
