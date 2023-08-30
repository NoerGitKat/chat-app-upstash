import fastify from "fastify";
import { CORS_ORIGIN, HOST, PORT } from "./constants";
import fastifyCors from "@fastify/cors";
import { globalRouter } from "./routes";
import fastifyIO from "fastify-socket.io";
import closeWithGrace from "close-with-grace";
import { resetConnections, startSockets } from "./sockets";

async function buildServer() {
  const app = fastify();

  // Register plugins
  await app.register(fastifyCors, {
    origin: CORS_ORIGIN
  });
  await app.register(fastifyIO);

  // Routes
  await app.register(globalRouter, { prefix: "/api/v1" });

  // Web Sockets
  await startSockets(app);

  return app;
}

async function main() {
  const app = await buildServer();

  try {
    await app.listen({
      port: PORT,
      host: HOST
    });

    closeWithGrace({ delay: 2000 }, async function ({ signal, err }) {
      console.log("Gracefully shutting down...");
      await resetConnections();

      await app.close();
    });

    console.log(`Server started on http://${HOST}:${PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
