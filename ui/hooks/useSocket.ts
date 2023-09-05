import { SOCKET_URL } from "@/constants";
import { SocketMessage } from "@/types";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [textMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<SocketMessage[]>([]);

  useEffect(() => {
    const socketIO = io(SOCKET_URL, {
      reconnection: true,
      upgrade: true,
      transports: ["websocket", "polling"],
    });

    setSocket(socketIO);

    return () => {
      socketIO.disconnect();
    };
  }, []);

  return { socket, messages, setMessages, setNewMessage, textMessage };
}

export default useSocket;
