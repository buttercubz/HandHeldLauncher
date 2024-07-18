export function PatchClick() {
  const buttons = document.querySelectorAll('[class^="kioskboard-key"]');

  if (buttons.length) {
    buttons.forEach((button) => {
      button.setAttribute("data-click", "true");
    });
  }
}

export function PathGroupsNavigation() {
  const styles = `background-color: hsl(var(--primary) / 0.25) !important;`;

  const rows = document.querySelectorAll(".kioskboard-row-dynamic");

  const special = document.querySelectorAll(
    ".kioskboard-with-specialcharacter"
  )!;

  const numbers = document.querySelectorAll(".kioskboard-row-top")!;

  rows.forEach((row, index) => {
    const childrens = row.querySelectorAll(".kioskboard-key");

    childrens.forEach((element) => {
      element.classList.add(`keyboard-row-${index}`);

      element.addEventListener("click", () => {
        const prev = element.getAttribute("style");

        element.setAttribute("style", `${prev}; ${styles}`);

        setTimeout(() => {
          element.setAttribute("style", `${prev}`);
        }, 100);
      });
    });
  });

  special.forEach((row, index) => {
    const childrens = row.querySelectorAll('[class^="kioskboard-key"]');

    childrens.forEach((element) => {
      element.classList.add(`keyboard-special-${index}`);

      PatchIconsSpecial(element);

      element.addEventListener("click", () => {
        const prev = element.getAttribute("style");

        element.setAttribute("style", `${prev}; ${styles}`);

        setTimeout(() => {
          element.setAttribute("style", `${prev}`);
        }, 100);
      });
    });
  });

  numbers.forEach((row, index) => {
    const childrens = row.querySelectorAll('[class^="kioskboard-key"]');

    childrens.forEach((element) => {
      element.classList.add(`keyboard-top-${index}`);

      element.addEventListener("click", () => {
        const prev = element.getAttribute("style");

        element.setAttribute("style", `${prev}; ${styles}`);

        setTimeout(() => {
          element.setAttribute("style", `${prev}`);
        }, 100);
      });
    });
  });
}

function PatchIconsSpecial(element: Element) {
  if (element.classList.contains("kioskboard-key-capslock")) {
    const prev = element.getAttribute("style");

    element.setAttribute(
      "style",
      `${prev}; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' version='1.1' viewBox='0 0 70 70' class=''%0A%3E%3Cpath d='m52.5 70v-27.5h15v-15h-65v15h15v27.5' fill='none' stroke='%23ffff' stroke-width='5' /%3E%3Ctext x='35' y='62.5' fill='%23ffff' font-family='sans-serif' font-size='40px' letter-spacing='0px' text-anchor='middle' word-spacing='0px' style='line-height:1.25' xml:space='preserve' %3E%3Ctspan x='35' y='62.5' font-family='sans-serif' font-weight='bold'%3ER%3C/tspan %3E%3C/text %3E%3C/svg%3E"); background-repeat: no-repeat; background-position: center;`
    );
  }

  if (element.classList.contains("kioskboard-key-backspace")) {
    const prev = element.getAttribute("style");

    element.setAttribute(
      "style",
      `${prev}; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' version='1.1' viewBox='0 0 70 70' class='!ml-12'%0A%3E%3Ccircle cx='35' cy='35' r='32.5' fill='none' stroke='%23ffff' stroke-width='5' /%3E%3Ctext x='35' y='50' fill='%23ffff' font-family='sans-serif' font-size='40px' font-weight='bold' letter-spacing='0px' text-anchor='middle' word-spacing='0px' style='line-height:1.25' xml:space='preserve'%3E%3Ctspan x='35' y='50' font-weight='bold'%3EX%3C/tspan%3E%3C/text %3E%3C/svg%3E"); background-repeat: no-repeat; background-position: center;`
    );
  }

  if (element.classList.contains("kioskboard-key-space")) {
    const prev = element.getAttribute("style");

    element.setAttribute(
      "style",
      `${prev}; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' version='1.1' viewBox='0 0 70 70' class='!ml-%5B20svw%5D'%0A%3E%3Ccircle cx='35' cy='35' r='32.5' fill='none' stroke='%23ffff' stroke-width='5' /%3E%3Ctext x='35' y='50' fill='%23ffff' font-family='sans-serif' font-size='40px' font-weight='bold' letter-spacing='0px' text-anchor='middle' word-spacing='0px' style='line-height:1.25' xml:space='preserve'%3E%3Ctspan x='35' y='50' font-weight='bold'%3EY%3C/tspan%3E%3C/text %3E%3C/svg%3E"); background-repeat: no-repeat; background-position: center;`
    );
  }
}
