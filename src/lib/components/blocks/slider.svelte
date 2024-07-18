<script lang="ts">
  import { Slider as SliderPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";
  import { onMount } from "svelte";


  type $$Props = SliderPrimitive.Props;

  let className: $$Props["class"] = undefined;
  export let value: $$Props["value"] = [0];
  export { className as class };

  let isInteracting = false;
  let sliderRef: HTMLElement;

  function handleKeydown(event: KeyboardEvent) {
    if (isInteracting) {
      if (event.key === "ArrowLeft") {
        decrementSlider();
      } else if (event.key === "ArrowRight") {
        incrementSlider();
      }
    }
  }

  function incrementSlider() {
    if (value![0] < 100) {
      value![0] += 1;
      value = value;
    }
  }

  function decrementSlider() {
    if (value![0] > 0) {
      value![0] -= 1;
      value = value;
    }
  }

  onMount(() => {
    // const navigation = useGamepadNavigation();

    // const unsubscribe = navigation.subscribe((state) => {
    //   if (state.currentElement === sliderRef) {
    //     if (state.buttons[0].pressed) {
    //       // A button
    //       isInteracting = true;
    //     } else if (state.buttons[1].pressed) {
    //       // B button
    //       isInteracting = false;
    //     } else if (isInteracting) {
    //       if (state.buttons[14].pressed) {
    //         // Left button
    //         decrementSlider();
    //       } else if (state.buttons[15].pressed) {
    //         // Right button
    //         incrementSlider();
    //       }
    //     }
    //   }
    // });

    // return () => {
    //   unsubscribe();
    // };
  });
</script>

<!-- <SliderPrimitive.Root
  bind:value
  class={cn(
    "relative flex w-full touch-none select-none items-center",
    className
  )}
  {...$$restProps}
  let:thumbs
  bind:this={sliderRef}
  data-interacting={isInteracting}
  on:keydown={handleKeydown}
>
  <span
    class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20"
  >
    <SliderPrimitive.Range class="absolute h-full bg-primary" />
  </span>
  {#each thumbs as thumb}
    <SliderPrimitive.Thumb
      {thumb}
      class={cn(
        "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        isInteracting
          ? "ring-2 ring-offset-2 ring-offset-background ring-primary"
          : ""
      )}
    />
  {/each}
</SliderPrimitive.Root>

<style>
  [data-interacting="true"] {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
</style> -->
