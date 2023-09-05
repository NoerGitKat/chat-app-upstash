import { FastifyInstance } from "fastify";
import { publisher, subscriber } from "../cache";
import {
  CONNECTION_COUNT_KEY,
  CONNECTION_COUNT_UPDATED_CHANNEL,
  NEW_MESSAGE_CHANNEL,
  PORT
} from "../constants";
import { randomUUID } from "crypto";

let connectedClients = 0;

export async function startSockets(app: FastifyInstance) {
  const currentChannelCount = await publisher.get(CONNECTION_COUNT_KEY);
  if (!currentChannelCount) await publisher.set(CONNECTION_COUNT_KEY, 0);

  app.io.on("connection", async (io) => {
    console.log("Client is connected!");
    const newConnection = await publisher.incr(CONNECTION_COUNT_KEY);
    connectedClients++;
    await publisher.publish(CONNECTION_COUNT_UPDATED_CHANNEL, String(newConnection));

    io.on(NEW_MESSAGE_CHANNEL, async ({ message }) => {
      if (!message) return;
      await publisher.publish(NEW_MESSAGE_CHANNEL, message);
    });

    io.on("disconnect", async () => {
      connectedClients--;
      const updatedCount = await publisher.decr(CONNECTION_COUNT_KEY);

      await publisher.publish(CONNECTION_COUNT_UPDATED_CHANNEL, String(updatedCount));
      console.log("Disconnected.");
    });
  });

  subscriber.subscribe(CONNECTION_COUNT_UPDATED_CHANNEL, (err, count) => {
    if (err) return console.error(`Error subscribing to ${CONNECTION_COUNT_UPDATED_CHANNEL}`);

    console.log(
      `${count} client${
        count !== 1 ? "s" : ""
      } connected to ${CONNECTION_COUNT_UPDATED_CHANNEL} channel`
    );
  });

  subscriber.subscribe(NEW_MESSAGE_CHANNEL, (err, count) => {
    if (err) return console.error(err);

    console.log(
      `${count} client${count !== 1 ? "s" : ""} connected to ${NEW_MESSAGE_CHANNEL} channel`
    );
  });

  subscriber.on("message", (channel, text) => {
    switch (channel) {
      case CONNECTION_COUNT_UPDATED_CHANNEL:
        app.io.emit(CONNECTION_COUNT_UPDATED_CHANNEL, {
          count: text
        });
        break;
      case NEW_MESSAGE_CHANNEL:
        app.io.emit(NEW_MESSAGE_CHANNEL, {
          message: text,
          id: randomUUID(),
          createdAt: new Date(),
          port: PORT
        });
        break;

      default:
        return;
    }
  });
}

export async function resetConnections() {
  if (connectedClients > 0) {
    console.log(`Removing ${connectedClients} from channel count...`);
    const currentCount = parseInt((await publisher.get(CONNECTION_COUNT_KEY)) || "0", 10);

    const newCount = Math.max(currentCount - connectedClients, 0);

    await publisher.set(CONNECTION_COUNT_KEY, newCount);
  }
}
