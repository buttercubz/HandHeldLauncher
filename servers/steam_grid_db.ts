import { Application } from "https://deno.land/x/oak@v13.2.5/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const app = new Application();

app.use(async (ctx) => {
  console.log(ctx.request.url.pathname, ctx.request.method);

  const response = await fetch(
    "https://www.steamgriddb.com/api/v2" + ctx.request.url.pathname,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer 38799058f978733279591eb51916c358`,
      },
    }
  );

  const data = await response.json();

  ctx.response.headers.append("Access-Control-Allow-Origin", "*");

  ctx.response.status = 200;
  ctx.response.body = data;
});

app.use(
  oakCors({
    methods: ["POST", "PUT", "GET", "OPTIONS", "DELETE"],
    optionsSuccessStatus: 200,
    credentials: true,
    origin: "*",
  })
);

app.listen({
  port: 5010,
});

app.addEventListener("listen", (evt) => {
  console.log(`Steam grid db server on port: ${evt.port}`);
});
