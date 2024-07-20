<script lang="ts">
  import { createEventDispatcher, onMount, setContext } from "svelte";
  import { PatchClick, PathGroupsNavigation } from "../screen-keyboard/patches";
  import { createGamepadNavigation, type AllKeys } from ".";
  import { KioskKeyboard } from "$lib/utils";

  const dispatch = createEventDispatcher<{
    openKeyboard: boolean;
    closeKeyboard: boolean;
    pressButton: AllKeys;
  }>();

  export let zones: string[] = [];

  export let openKeyboard: boolean = false;

  export const navigation = createGamepadNavigation((button) =>
    dispatch("pressButton", button)
  );

  setContext("gamepadNavigation", navigation);

  $: {
    navigation.setZones(zones);
    navigation.resetCursors();
    navigation.updateFocus();
  }

  onMount(() => {
    navigation.initGamepadListener();

    //@ts-expect-error
    KioskKeyboard.run(".js-virtual-keyboard");

    const observer = new MutationObserver(([event]) => {
      const addedNode = event.addedNodes.item(0)?.textContent;
      const removedNode = event.removedNodes.item(0)?.textContent;

      const numericKeyboard = "7894561230 Enter";
      const textKeyboard =
        "1234567890QWERTYUIOPASDFGHJKLZXCVBNM  SpaceEnter !'^#+$%½&/{}()[]=*?\\-_|@€₺~æß<>,;.:`";

      const isAdded =
        addedNode === numericKeyboard || addedNode === textKeyboard;

      const isRemoved =
        removedNode === numericKeyboard || removedNode === textKeyboard;

      if (isAdded) {
        dispatch("openKeyboard", isAdded);
        // add data-click to keys
        PatchClick();
        setTimeout(PathGroupsNavigation, 100);
      } else if (isRemoved) {
        dispatch("closeKeyboard", isRemoved);
      }
    });

    observer.observe(document.body, {
      childList: true,
      attributeFilter: ["id"],
    });
  });
</script>

<slot />
