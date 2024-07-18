<div class="w-[100dvw] h-[100dvh] bg-custom bg-cover bg-center flex flex-row">
  <div class="w-1/3 bg-background/10 backdrop-blur-3xl flex flex-col items-center justify-center border-r">
    <div>
      <ul class="grid grid-cols-3 gap-5">
        <li class="bg-red-500 w-5 h-5 rounded-full text-center">1</li>
        <li class="bg-red-500 w-5 h-5 rounded-full text-center">2</li>
        <li class="bg-red-500 w-5 h-5 rounded-full text-center">3</li>
        <li class="bg-red-500 w-5 h-5 rounded-full text-center">4</li>
        <li class="bg-red-500 w-5 h-5 rounded-full text-center">5</li>
        <li class="bg-red-500 w-5 h-5 rounded-full text-center">6</li>
      </ul>
    </div>
  </div>

  <div class="w-2/3 bg-background/10 backdrop-blur-3xl"></div>
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
