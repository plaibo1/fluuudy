import React, { useState } from "react";
import { sendMessage, setReplyingMessage } from "../../../holeySocksSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ReplyingMessage from "../ChatMessages/ReplyingMessage";
import ChatAuthName from "./ChatAuthName";

const ChatInput = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.chat.user);
  const repliedMessage = useAppSelector((state) => state.chat.replyingMessage)

  const [msgText, setMsgText] = useState("");

  const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (msgText.trim().length === 0) return;

    const message = {
      id: new Date().toISOString(),
      text: msgText,
      username: user?.username as string,
      avatar: user?.avatar as string,
      repliedMessage: {
        replyMessageId: repliedMessage?.replyMessageId || '',
        replyMessageText: repliedMessage?.replyMessageText || '',
        replyMessageUsername: repliedMessage?.replyMessageUsername || ''
      }
    }

    dispatch(sendMessage(message));

    setMsgText("");
    dispatch(setReplyingMessage(null))
  };

  if (!user) return <ChatAuthName />;

  return (
    <div className="flex flex-col items-start">

      <ReplyingMessage />
      
      <form className="p-3 rounded-md shadow-md inline-flex" onSubmit={sendMsg}>
        <input
          placeholder="type here"
          className="outline-none"
          type="text"
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
        />
        <button
          className="px-5 py-3 bg-indigo-500 rounded-md text-sm font-mono font-bold hover:bg-indigo-400 text-white"
          type="submit"
        >
          send
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
