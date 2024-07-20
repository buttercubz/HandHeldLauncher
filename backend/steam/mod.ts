import { walk } from "jsr:@std/fs@0.223/walk";
import { storage } from "../local-storage.ts";
import { getAllDisks } from "../os/mod.ts";

const steamPath = "C:\\Program Files (x86)\\Steam\\steamapps";

interface SteamGamesInfo {
  appid: string;
  name: string;
  SizeOnDisk: string;
  LastPlayed: string;
  verticalGrids: any;
  gameInfo: any;
}

export const SteamKeys = {
  games: "steam.data.game",
};

const parse = JSON.parse;
const strinify = JSON.stringify;


async function findSteamPaths(): Promise<string[]> {
  const disks = await getAllDisks();
  const pathsToCheck = disks.flatMap((disk) => [
    `${disk.DeviceID}\\Program Files (x86)\\Steam\\steamapps`,
    `${disk.DeviceID}\\SteamLibrary\\steamapps`,
    `${disk.DeviceID}\\Steam\\steamapps`,
  ]);

  const checkPathPromises = pathsToCheck.map(async (path) => {
    const steamExists = await Deno.stat(path)
      .then(() => true)
      .catch(() => false);
    return steamExists ? path : null;
  });

  const resolvedPaths = await Promise.all(checkPathPromises);
  return resolvedPaths.filter((path) => path !== null) as string[];
}


export async function getGamesSteam(force = false) {
  if (force || storage.getItem(SteamKeys.games) === null) {
    const games: SteamGamesInfo[] = [];
    const steamPaths = await findSteamPaths();

    for (const steamPath of steamPaths) {
      for await (const file of walk(steamPath, {
        exts: ["acf"],
        maxDepth: 1,
      })) {
        if (file.isFile) {
          const raw = await Deno.readTextFile(file.path);

          const {
            AppState: { appid, name, SizeOnDisk, LastPlayed },
          } = parseACF(raw) ?? {};

          games.push({
            appid,
            name,
            SizeOnDisk,
            LastPlayed,
            verticalGrids: await verticalGrids(appid),
            gameInfo: await gameInfo(appid),
          });
        }
      }
    }

    storage.setItem(SteamKeys.games, strinify(games));

    return games;
  }

  const output = storage.getItem(SteamKeys.games);
  const games: SteamGamesInfo[] = parse(output!);

  return games;
}

function parseACF(input: string) {
  const stack: Array<Record<string, any>> = [{}];
  let currentKey = "";

  const lines = input.split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === "{") {
      const newObj = {};
      stack[stack.length - 1][currentKey] = newObj;
      stack.push(newObj);
    } else if (trimmedLine === "}") {
      stack.pop();
    } else if (trimmedLine) {
      const [key, ...valueParts] = trimmedLine.split("\t\t");
      const value = valueParts
        .join("\t\t")
        .replace(/^"/, "")
        .replaceAll(/"$/g, "");
      if (value) {
        stack[stack.length - 1][key.replaceAll("'", "").replaceAll('"', "")] =
          value;
      } else {
        currentKey = key.replaceAll("'", "").replaceAll('"', "");
      }
    }
  }

  return stack[0];
}

async function verticalGrids(id: string) {
  const response = fetch(
    `https://www.steamgriddb.com/api/v2/grids/steam/${id}?limit=50&dimension=['600x900']`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer 38799058f978733279591eb51916c358",
      },
    }
  );

  const data = (await response).json();

  return data;
}

async function gameInfo(id: string) {
  const response = fetch(
    `https://www.steamgriddb.com/api/v2/games/steam/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer 38799058f978733279591eb51916c358",
      },
    }
  );

  const data = (await response).json();

  return data;
}

export async function openGame(id: string) {
  const command = `
      & {
        Start-Process steam://rungameid/${id}
      }
    `;

  const cmd = new Deno.Command("powershell", {
    args: ["-Command", command],
  });

  const { code, stderr } = await cmd.output();

  if (code) {
    const errorString = decoder.decode(stderr);
    throw new Error(`Failed to execute PowerShell command: ${errorString}`);
  }
}
