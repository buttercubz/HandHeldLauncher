import { Application, Router } from "https://deno.land/x/oak@v13.2.5/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import * as VDF from "npm:@node-steam/vdf";

const app = new Application();
const router = new Router();

const pathToVdf = "./libraryfolders.vdf";

router.get("/steam-games", async (ctx) => {
  const file = await Deno.readTextFile(pathToVdf);

  const data = VDF.parse(file);

  ctx.response.headers.append("Access-Control-Allow-Origin", "*");

  ctx.response.status = 200;
  ctx.response.body = data;
});

app.use(router.allowedMethods());
app.use(router.routes());

app.use(
  oakCors({
    methods: ["POST", "PUT", "GET", "OPTIONS", "DELETE"],
    optionsSuccessStatus: 200,
    credentials: true,
    origin: "*",
  })
);

app.listen({
  port: 5009,
});

app.addEventListener("listen", (evt) => {
  console.log(`Steam server on port: ${evt.port}`);
});
