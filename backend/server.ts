import { CORS } from "https://deno.land/x/oak_cors@v0.1.1/mod.ts";
import { Application } from "jsr:@oak/oak";
import { router } from "./router.ts";
import { storage } from "./local-storage.ts";

const application = new Application();

application.use(async ({ response }, next) => {
    response.headers.append("Access-Control-Allow-Origin", "*");
    response.headers.append(
        "Access-Control-Allow-Methods",
        "DELETE, PUT, GET, POST",
    );

    await next();
});

application.use(CORS());

application.use(router.allowedMethods());
application.use(router.routes());

if (import.meta.main) {
    application.listen({
        port: 1414,
        hostname: "0.0.0.0",
    });

    application.addEventListener("listen", ({ port, hostname }) => {
        console.log("Server on port: " + port + " and host: " + hostname);
    });

    application.addEventListener("close", () => {
        console.log("closed");
        storage.clear();
    });
}
