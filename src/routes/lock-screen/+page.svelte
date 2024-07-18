<script lang="ts">
  import Arrows from "$lib/components/icons/arrows.svelte";
  import Lt from "$lib/components/icons/lt.svelte";
  import Lb from "$lib/components/icons/lb.svelte";
  import Rt from "$lib/components/icons/rt.svelte";
  import Rb from "$lib/components/icons/rb.svelte";
  import X from "$lib/components/icons/x.svelte";
  import Y from "$lib/components/icons/y.svelte";
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";

  //@ts-ignore
  import { GamepadListener } from "gamepad.js";
  import { cn } from "$lib/utils";
  import { goto } from "$app/navigation";

  let password = "";

  const internal = "000000";

  let button = "";
  let listener: any;
  let pressedButton: string | null = null;

  $: shake = internal !== password && password !== "" && password.length === 6;

  $: if (internal === password) {
    goto("/");
  }

  $: if (password.length === 6 && password !== internal) {
    setTimeout(() => {
      password = "";
    }, 900);
  }

  const buttonMap: { [key: string]: string } = {
    "12": "1",
    "14": "2",
    "13": "3",
    "15": "4",
    "6": "5",
    "5": "8",
    "7": "6",
    "2": "0",
    "4": "7",
    "3": "9",
  };

  function onPressButton(code: string) {
    if (buttonMap[code] && password.length < 6) {
      password += buttonMap[code];
      pressedButton = code;
      setTimeout(() => {
        pressedButton = null;
      }, 100);
    }
  }

  const reset = () => {
    button = "";
    setTimeout(() => {
      button = "";
    }, 100);
  };

  onMount(() => {
    listener = new GamepadListener({
      analog: true,
    });

    listener.on("gamepad:button", (e: any) => {
      if (e.detail.value === 1) {
        button = String(e.detail.button);

        console.log(button);
        onPressButton(button);
        reset();
      }
    });

    listener.start();
  });

  onDestroy(() => {
    if (listener) {
      console.log("destroy");
      listener.stop();
    }
  });

  function rotation(number: string) {
    switch (number) {
      case "8":
        return {
          icon: Rb,
          styles: "ml-1",
        };
      case "1":
        return {
          icon: Arrows,
          styles: "scale-95",
        };
      case "2":
        return {
          icon: Arrows,
          styles: "rotate-[270deg]",
        };
      case "3":
        return {
          icon: Arrows,
          styles: "rotate-180",
        };
      case "4":
        return {
          icon: Arrows,
          styles: "rotate-90",
        };
      case "5":
        return {
          icon: Lt,
          styles: "",
        };
      case "7":
        return {
          icon: Lb,
          styles: "",
        };
      case "6":
        return {
          icon: Rt,
          styles: "",
        };
      case "0":
        return {
          icon: X,
          styles: "",
        };
      case "9":
        return {
          icon: Y,
          styles: "ml-1",
        };
    }

    return {
      icon: Arrows,
      styles: "",
    };
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key >= "0" && event.key <= "9" && password.length < 6) {
      password += event.key;
      pressedButton =
        Object.keys(buttonMap).find((key) => buttonMap[key] === event.key) ||
        null;
      setTimeout(() => {
        pressedButton = null;
      }, 100);
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<div
  class="w-screen h-screen flex flex-row bg-background text-foreground items-center justify-center select-none bg-custom bg-cover bg-center"
  out:fade
>
  <div class="flex flex-col p-8 w-1/2 items-center justify-start space-y-5">
    <div>
      <img
        src="https://higherlogicdownload.s3.amazonaws.com/LENOVOTEST/033b1dd2-6b82-4d25-97da-13306a0f07cd/UploadedImages/LGC%20-%20Favicon_Dark-15-15.png"
        alt="Lenovo Logo"
        class="w-64 h-64"
      />
    </div>

    <div>
      <span class="text-3xl font-bold"> LeGo OS </span>
    </div>

    <div class="space-x-5" class:animate-shake={shake}>
      {#each Array(6) as _, index}
        <input
          class="appearance-none ring-2 ring-primary checked:bg-primary rounded-full w-8 h-8 transition-all duration-200 bg-background/10 backdrop-blur-3xl"
          checked={password.length > index && !shake}
          tabindex="-1"
          type="checkbox"
        />
      {/each}
    </div>
  </div>

  <div class="flex flex-col text-6xl items-center space-y-8 rounded w-auto p-4">
    {#each [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]] as row}
      <div class="flex flex-row space-x-14">
        {#each row as num}
          {@const pressedStyles =
            pressedButton ===
            Object.keys(buttonMap).find((key) => buttonMap[key] === num)
              ? "bg-primary"
              : button ===
                  Object.keys(buttonMap).find((key) => buttonMap[key] === num)
                ? "bg-primary/25"
                : ""}

          {@const { icon, styles } = rotation(num)}

          <button
            class="p-4 flex flex-row items-center justify-center w-24 h-24 rounded-lg transition-colors duration-200 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary bg-background/10 backdrop-blur-3xl {pressedStyles}"
            on:click={() => {
              if (password.length < 6) {
                password += num;
                pressedButton =
                  Object.keys(buttonMap).find(
                    (key) => buttonMap[key] === num
                  ) || null;
                setTimeout(() => {
                  pressedButton = null;
                }, 100);
              }
            }}
          >
            <span>{num}</span>
            <svelte:component this={icon} class={cn(styles)} />
          </button>
        {/each}
      </div>
    {/each}

    <div class="flex flex-row items-end justify-center">
      <button
        class="buttonx p-4 flex flex-row items-center justify-center w-24 h-24 rounded-lg transition-colors duration-200 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary bg-background/10 backdrop-blur-3xl
        {pressedButton === '2'
          ? 'bg-primary'
          : button === '2'
            ? 'bg-primary/25'
            : ''}"
        on:click={() => {
          if (password.length < 6) {
            password += "0";
            pressedButton = "2";
            setTimeout(() => {
              pressedButton = null;
            }, 100);
          }
        }}
      >
        <span>0</span>
        <svelte:component
          this={rotation("0").icon}
          class={cn(rotation("0").styles)}
        />
      </button>
    </div>
  </div>
</div>

<style lang="postcss">
  .bg-custom {
    background-image: url("/background.png");
  }

  .buttonx:focus {
    @apply text-red-500;
  }
</style>
