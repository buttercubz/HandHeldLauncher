import GamepadNavigationProvider from "./provider.svelte";

import { writable, get } from "svelte/store";
import type { Writable } from "svelte/store";
import { getContext } from "svelte";

// @ts-ignore
import { GamepadListener } from "gamepad.js";

interface NavigationState {
  verticalCursor: number;
  horizontalCursor: number;
  currentElement: HTMLElement | null;
  zones: string[];
}

export const enum ButtonMapIDEnum {
  LT = 6,
  RT = 7,
  LB = 4,
  RB = 5,
  MAP = 8,
  SETTINGS = 9,
  B = 1,
  X = 2,
  Y = 3,
  A = 0,
  R = 11,
  L = 10,
  UP = 12,
  DOWN = 13,
  RIGHT = 15,
  LEFT = 14,
  DEFAULT = -1,
}

export type AllKeys =
  | "LT"
  | "RT"
  | "LB"
  | "RB"
  | "MAP"
  | "SETTINGS"
  | "B"
  | "X"
  | "Y"
  | "A"
  | "R"
  | "L"
  | "UP"
  | "DOWN"
  | "RIGHT"
  | "LEFT"
  | "DEFAULT";

export const enum ButtonMapTextEnum {
  LT = "LT",
  RT = "RT",
  LB = "LB",
  RB = "RB",
  MAP = "MAP",
  SETTINGS = "SETTINGS",
  B = "B",
  X = "X",
  Y = "Y",
  A = "A",
  R = "R",
  L = "L",
  UP = "UP",
  DOWN = "DOWN",
  RIGHT = "RIGHT",
  LEFT = "LEFT",
  DEFAULT = "DEFAULT",
}

export const ButtonMapIDToText: Record<number, string> = {
  6: "LT",
  7: "RT",
  4: "LB",
  5: "RB",
  8: "MAP",
  9: "SETTINGS",
  1: "B",
  2: "X",
  3: "Y",
  0: "A",
  11: "R",
  10: "L",
  12: "UP",
  13: "DOWN",
  15: "RIGHT",
  14: "LEFT",
};

export const ButtonMapTextToID: Record<string, number> = {
  LT: 6,
  RT: 7,
  LB: 4,
  RB: 5,
  MAP: 8,
  SETTINGS: 9,
  B: 1,
  X: 2,
  Y: 3,
  A: 0,
  R: 11,
  L: 10,
  UP: 12,
  DOWN: 13,
  RIGHT: 15,
  LEFT: 14,
};

let lastActionTime = 0;
const throttleTime = 200;

export const createGamepadNavigation = (
  onPressButton = (button: AllKeys) => {}
) => {
  const state: Writable<NavigationState> = writable({
    verticalCursor: 0,
    horizontalCursor: 0,
    currentElement: null,
    zones: [],
  });

  const buttons = writable("DEFAULT");

  const setZones = (newZones: string[]) => {
    state.update((s) => ({ ...s, zones: newZones }));
  };

  const updateFocus = () => {
    const { verticalCursor, horizontalCursor, zones, currentElement } =
      get(state);
    const elements = document.querySelectorAll(zones[verticalCursor]);

    if (elements.length > 0) {
      let newHorizontalCursor = horizontalCursor;
      if (horizontalCursor >= elements.length) {
        newHorizontalCursor = elements.length - 1;
      }

      const element = elements[newHorizontalCursor] as HTMLElement;

      if (currentElement) {
        currentElement.classList.remove("selected-element");
        currentElement.classList.remove("focus-card-animation");
      }

      // for home game list only
      const container = elements[newHorizontalCursor].parentElement;
      const id = container?.getAttribute("id");
      const isGameList = id === "games-list-home";

      if (container && id && isGameList) {
        // Check if we're in the games section
        const scrollLeft =
          element.offsetLeft -
          container.clientWidth / 2 +
          element.clientWidth / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      element.classList.add("selected-element");
      element.classList.add("focus-card-animation");

      if (element.tagName !== "INPUT") {
        element.focus();
      }

      element.scrollIntoView({ behavior: "smooth", block: "end" });

      state.update((s) => ({
        ...s,
        currentElement: element,
        horizontalCursor: newHorizontalCursor,
      }));
    }
  };

  const resetCursors = () => {
    state.update((state) => ({
      ...state,
      horizontalCursor: 0,
      verticalCursor: 0,
    }));
  };

  const handleNavigation = (direction: "up" | "down" | "left" | "right") => {
    state.update((s) => {
      let { verticalCursor, horizontalCursor, zones } = s;
      const currentElements = document.querySelectorAll(zones[verticalCursor]);

      const adjustHorizontalCursor = (newElements: NodeListOf<Element>) => {
        if (horizontalCursor >= newElements.length) {
          horizontalCursor = newElements.length - 1;
        } else if (horizontalCursor < 0) {
          horizontalCursor = 0;
        }
      };

      switch (direction) {
        case "up":
          if (verticalCursor > 0) {
            verticalCursor--;
            const newElements = document.querySelectorAll(
              zones[verticalCursor]
            );
            adjustHorizontalCursor(newElements);
          }
          break;
        case "down":
          if (verticalCursor < zones.length - 1) {
            verticalCursor++;
            const newElements = document.querySelectorAll(
              zones[verticalCursor]
            );
            adjustHorizontalCursor(newElements);
          }
          break;
        case "left":
          if (horizontalCursor > 0) {
            horizontalCursor--;
          }
          break;
        case "right":
          if (horizontalCursor < currentElements.length - 1) {
            horizontalCursor++;
          }
          break;
      }

      return { ...s, verticalCursor, horizontalCursor };
    });

    updateFocus();
  };

  const handleAction = () => {
    const { currentElement } = get(state);

    const isInput = currentElement?.tagName === "INPUT";

    // when press 'A' focus and activate on screen keyboard
    if (currentElement && isInput) {
      currentElement.focus();
      currentElement.click();
    } else {
      // handler pess 'A' action
      if (currentElement && currentElement.hasAttribute("data-click")) {
        currentElement.click();
      }
    }
  };

  const hanlderBlur = () => {
    const currentElement = get(state).currentElement!;

    const isOnKeyboard = currentElement?.classList.contains("kioskboard-key");

    const isModal = currentElement?.classList.contains("modal-buttons");

    if (isOnKeyboard) {
      return document.body.click();
    }

    if (isModal) {
      document.body.focus();
      return document.body.click();
    }
  };

  const hanlderToggleCapsLock = () => {
    const Keyboard = document.querySelector("#KioskBoard-VirtualKeyboard");

    if (!!Keyboard) {
      const caps = document.querySelector(".kioskboard-key-capslock")!;

      if (caps) {
        //@ts-expect-error
        caps.click();
      }
    }
  };

  const hanlderDeleteKeyboard = () => {
    const Keyboard = document.querySelector("#KioskBoard-VirtualKeyboard");

    if (!!Keyboard) {
      const backspace = document.querySelector(".kioskboard-key-backspace")!;

      if (backspace) {
        //@ts-expect-error
        backspace.click();
      }
    }
  };

  function handleAnalogMovement(axis: number, value: number) {
    const currentTime = Date.now();
    const deadzone = 0.5;

    if (
      Math.abs(value) > deadzone &&
      currentTime - lastActionTime >= throttleTime
    ) {
      if (axis === 0) {
        handleNavigation(value > 0 ? "right" : "left");
        lastActionTime = currentTime;
      } else if (axis === 1) {
        handleNavigation(value > 0 ? "down" : "up");
        lastActionTime = currentTime;
      }
    }
  }

  const initGamepadListener = () => {
    const listener = new GamepadListener({ analog: true });

    listener.on("gamepad:button", (e: any) => {
      if (e.detail.value === 0) {
        buttons.set(ButtonMapIDToText[Number(e.detail.button)]);

        onPressButton?.(ButtonMapIDToText[Number(e.detail.button)] as AllKeys);

        switch (e.detail.button) {
          case ButtonMapIDEnum.UP:
            handleNavigation("up");
            break;
          case ButtonMapIDEnum.DOWN:
            handleNavigation("down");
            break;
          case ButtonMapIDEnum.LEFT:
            handleNavigation("left");
            break;
          case ButtonMapIDEnum.RIGHT:
            handleNavigation("right");
            break;
          case ButtonMapIDEnum.A:
            handleAction();
            break;
          case ButtonMapIDEnum.B:
            hanlderBlur();
            break;
          case ButtonMapIDEnum.R:
            hanlderToggleCapsLock();
            break;
          case ButtonMapIDEnum.X:
            hanlderDeleteKeyboard();
            break;
        }

        buttons.set("DEFAULT");
      }
    });
    listener.on("gamepad:axis", (e: any) => {
      const { axis, value } = e.detail;
      handleAnalogMovement(axis, value);
    });

    listener.start();
  };

  return {
    setZones,
    updateFocus,
    resetCursors,
    handleNavigation,
    handleAction,
    initGamepadListener,
    subscribe: state.subscribe,
    buttons: buttons.subscribe,
  };
};

export type GamepadNavigation = ReturnType<typeof createGamepadNavigation>;

export { GamepadNavigationProvider };
