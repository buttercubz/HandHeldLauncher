import { GetBatteryInfo, GetDisksInfo, GetHardwareInfo } from "./os/api.ts";
import { Router } from "jsr:@oak/oak";
import { API } from "./geatway.ts";
import { GetGamesSteam } from "./steam/api.ts";

const router = new Router();

// os routes
router.get(API.os.diskInfo, GetDisksInfo);
router.get(API.os.hardWareInfo, GetHardwareInfo);
router.get(API.os.batteryInfo, GetBatteryInfo);

// steam routes
router.get(API.steam.GetGamesSteam, GetGamesSteam);

export { router }