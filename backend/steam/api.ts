import { Context } from "jsr:@oak/oak";
import { getGamesSteam } from "./mod.ts";

export async function GetGamesSteam({ response, request }: Context) {
  try {
    const forced = request.url.searchParams.get("force") === "true";
    // console.log(await getAllDisks());
    response.status = 200;
    response.body = await getGamesSteam(forced);
  } catch (error) {
    response.status = 500;
    response.body = {
      error,
    };
  }
}
