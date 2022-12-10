import React from 'react'
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import ConnectedUsers from './ConnectedUsers';

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