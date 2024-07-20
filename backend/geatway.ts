const PREFIX = (...paths: string[]) =>
  paths.reduce((prev, curr) => prev + "/" + curr, "/api");

export const API = {
  steam: {
    GetGamesSteam: PREFIX("steam", "get-games"),
    OpenGame: PREFIX("steam", "open-game"),
  },
  os: {
    diskInfo: PREFIX("os", "disk-info"),
    hardWareInfo: PREFIX("os", "hardware-info"),
    batteryInfo: PREFIX("os", "battery-info"),
  },
};

console.log(API);
