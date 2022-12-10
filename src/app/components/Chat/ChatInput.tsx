import React, { useState } from "react";
import { sendMessage } from "../../holeySocksSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ChatAuthName from "./ChatAuthName";

const ChatInput = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.chat.user);

  const [msgText, setMsgText] = useState('');

  const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (msgText.trim().length === 0) return;

    dispatch(
      sendMessage({
        id: new Date().toISOString(),
        text: msgText,
        username: user?.username as string,
        avatar: user?.avatar as string
      })
    );

    setMsgText('');
  }

  if (!user)
    return (
      <ChatAuthName />
    );

  return (
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
  );
};

export default ChatInput;
