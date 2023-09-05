import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MutableRefObject,
  SetStateAction,
} from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Socket } from "socket.io-client";
import { NEW_MESSAGE_CHANNEL } from "@/constants";

interface ChatFormProps {
  socket: Socket;
  setNewMessage: Dispatch<SetStateAction<string>>;
  textMessage: string;
}

function ChatForm({ socket, setNewMessage, textMessage }: ChatFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    socket?.emit(NEW_MESSAGE_CHANNEL, {
      message: textMessage,
    });

    setNewMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <Textarea
        className="rounded-lg mr-4"
        placeholder="Say something..."
        value={textMessage}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setNewMessage(event.target.value)
        }
        maxLength={255}
      />
      <Button
        disabled={textMessage.length === 0}
        className="h-full"
        type="submit"
      >
        Send message
      </Button>
    </form>
  );
}

export default ChatForm;
