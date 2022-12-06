import React, { useEffect, useState } from 'react'
import { sendMessage } from '../../holeySocksSlice';
import { useAppDispatch, useAppSelector } from '../../hooks'

const Chat = () => {

  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.chat.messages);

  const [msgText, setMsgText] = useState('');

  const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (msgText.trim().length === 0) return;

    dispatch(sendMessage({id: new Date().toISOString() ,text: msgText}))
    setMsgText('');
  }

  return (
    <div className="flex justify-center">
      <div>
        <div className="flex flex-col-reverse h-[350px] overflow-auto">
          {messages.map((msg) => {
            return (
              <div key={msg.id}>
                <div className="p-3 shadow-md rounded-md inline-flex">
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        <form
          className="p-3 rounded-md shadow-md inline-flex"
          onSubmit={sendMsg}
        >
          <input
            placeholder="type here"
            className="outline-none"
            type="text"
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat