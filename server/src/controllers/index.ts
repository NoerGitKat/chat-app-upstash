import { PORT } from "../constants";

export async function checkServerHealth() {
  return {
    status: "ok",
    port: PORT
  };
}
