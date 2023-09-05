"use client";

import { ChatForm, ChatMessages } from "@/components/chat";
import { NEW_MESSAGE_CHANNEL } from "@/constants";
import { useSocket } from "@/hooks";
import { SocketMessage } from "@/types";

import { useEffect, useRef } from "react";

export default function Home() {
  const { socket, messages, setMessages, setNewMessage, textMessage } =
    useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to socket!");
      });

      socket.on(NEW_MESSAGE_CHANNEL, (message: SocketMessage) => {
        setMessages((prevState: SocketMessage[]) => [...prevState, message]);
      });
    }
  }, [socket, setMessages]);

  return (
    <main className="flex flex-col p-4 w-full max-w-3xl m-auto">
      <h1 className="text-4xl font-bold my-4">Chats</h1>
      <ChatMessages messages={messages} />
      {socket && (
        <ChatForm
          socket={socket}
          setNewMessage={setNewMessage}
          textMessage={textMessage}
        />
      )}
    </main>
  );
}
