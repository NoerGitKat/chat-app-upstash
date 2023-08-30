import { FastifyInstance, FastifyRegisterOptions } from "fastify";
import { checkServerHealth } from "../controllers";

function globalRouter(fastify: FastifyInstance, _: FastifyRegisterOptions<{}>, done: () => void) {
  fastify.get("/healthcheck", checkServerHealth);
  done();
}

export default globalRouter;
