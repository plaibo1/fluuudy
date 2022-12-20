import React from 'react'
import ChatInput from './ChatFroms/ChatInput';
import ChatMessages from './ChatMessages/ChatMessages';
import ConnectedUsers from './ChatUsers/ConnectedUsers';

import "./chat.css";

const Chat = () => {
  return (
    <div className="flex justify-center mt-[100px]">
      <div className='flex items-start'>

        <div className='mr-10 w-[200px] border p-3 rounded-lg'>
          <ConnectedUsers />
        </div>

        <div className='border p-2 rounded-xl'>
          <ChatMessages />
          <ChatInput />
        </div>

      </div>
    </div>
  );
}

export default Chat