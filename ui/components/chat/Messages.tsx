import { SocketMessage } from "@/types";

interface ChatMessagesProps {
  messages: SocketMessage[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <ol className="flex-1">
      {messages.map((msg) => (
        <li key={msg.id} className="bg-gray-100 rounded-lg p-4 mb-2 break-all">
          <p className="text-small text-right text-gray-500">
            {msg.createdAt.toString()} on port {msg.port}
          </p>

          <p className="text-small">{msg.message}</p>
        </li>
      ))}
    </ol>
  );
}

export default ChatMessages;
