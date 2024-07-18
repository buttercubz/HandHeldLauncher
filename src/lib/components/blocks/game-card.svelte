<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import Steam from "$lib/components/icons/Steam.svelte";
  import * as Sheet from "$lib/components/ui/sheet";
  import { cn } from "$lib/utils";
  import { createEventDispatcher } from "svelte";

  export let title = "";
  export let imgSrc = "";

  export let openModal = false;

  const dispatch = createEventDispatcher<{ modal: boolean }>();

  $: dispatch("modal", openModal);
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
  class={cn(
    "relative outlined outline-offset-0 rounded-xl w-[200px] h-[210px] flex-shrink-0 transition-all group navigable-games"
  )}
  on:click={() => (openModal = !openModal)}
  data-click
>
  <span
    class="text-white absolute right-0 bg-primary/10 p-1 backdrop-blur-xl rounded-lg flex text-base font-semibold items-center justify-between mr-1 mt-1 logo-game-card opacity-0"
  >
    <Steam />
  </span>

  <img class="w-full h-full object-fill rounded-xl" src={imgSrc} alt={title} />
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
        class="w-[200px] h-[220px] object-fill rounded-xl"
        src={imgSrc}
        alt={title}
      />
    </div>

    <AlertDialog.Footer
      class="flex flex-row justify-between w-full items-center"
    >
      <div class="mx-auto">
        <AlertDialog.Cancel
          class="modal-buttons"
          on:click={() => (openModal = !openModal)}
        >
          Close
        </AlertDialog.Cancel>
        <AlertDialog.Action
          class="modal-buttons"
          data-click
          on:click={() => alert("open " + title)}
        >
          Lauch Game
        </AlertDialog.Action>
      </div>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
