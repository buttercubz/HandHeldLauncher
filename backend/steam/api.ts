import { getGamesSteam, openGame } from "./mod.ts";
import { Context } from "jsr:@oak/oak";

export async function GetGamesSteam({ response, request }: Context) {
  try {
    const forced = request.url.searchParams.get("force") === "true";

    response.status = 200;
    response.body = await getGamesSteam(forced);
  } catch (error) {
    response.status = 500;
    response.body = {
      error,
    };
  }
}

export async function OpenSteamGame({ response, request }: Context) {
  try {
    const id = request.url.searchParams.get("id");

    response.status = 200;
    response.body = await openGame(id);
  } catch (error) {
    response.status = 500;
    response.body = {
      error,
    };
  }
}
