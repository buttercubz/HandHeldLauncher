import { GetBatteryInfo, GetDisksInfo, GetHardwareInfo } from "./os/api.ts";
import { GetGamesSteam, OpenSteamGame } from "./steam/api.ts";
import { Router } from "jsr:@oak/oak";
import { API } from "./geatway.ts";

const router = new Router();

// os routes
router.get(API.os.diskInfo, GetDisksInfo);
router.get(API.os.hardWareInfo, GetHardwareInfo);
router.get(API.os.batteryInfo, GetBatteryInfo);

// steam routes
router.get(API.steam.GetGamesSteam, GetGamesSteam);
router.get(API.steam.OpenGame, OpenSteamGame);

export { router };
