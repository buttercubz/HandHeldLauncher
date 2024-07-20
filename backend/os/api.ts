import { getAllDisks, getBatteryInfo, getHardWareInfo } from "./mod.ts";
import { Context } from "jsr:@oak/oak";

export async function GetDisksInfo({ response, request }: Context) {
    try {
        const forced = request.url.searchParams.get("force") === "true";

        response.status = 200;
        response.body = await getAllDisks(forced);
    } catch (error) {
        response.status = 500;
        response.body = {
            error,
        };
    }
}

export async function GetHardwareInfo({ response, request }: Context) {
    try {
        const forced = request.url.searchParams.get("force") === "true";

        response.status = 200;
        response.body = await getHardWareInfo(forced);
    } catch (error) {
        response.status = 500;
        response.body = {
            error,
        };
    }
}

export async function GetBatteryInfo(ctx: Context) {
    try {
        const target = await ctx.sendEvents({
            // keepAlive: true,
        });

        target.dispatchMessage(await getBatteryInfo());

        console.log("exec..");

        // setInterval(() => {
        //     getBatteryInfo().then((data) => target.dispatchMessage(data));
        // }, 1000);
    } catch (error) {
        console.log(error);
        ctx.response.status = 500;
        ctx.response.body = {
            error,
        };
    }
}
