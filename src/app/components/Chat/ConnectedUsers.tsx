import React from 'react'
import { useAppSelector } from '../../hooks'

const ConnectedUsers = () => {
  const onlineUsers = useAppSelector(state => state.chat.users);
  const user = useAppSelector(state => state.chat.user)

  console.log(onlineUsers);

  const randomColor = () => {
    const bgColors = ['bg-indigo-500', 'bg-green-300', 'bg-orange-400', 'bg-orange-300', 'bg-blue-500'];

    return bgColors[Math.floor(Math.random() * bgColors.length)]
  }

  return (
    <div>
      <span className="text-sm block mb-2">
        You are login as <span className='font-bold'>{user?.username}</span>{" "}
      </span>

      <span className="inline-block rounded-lg bg-indigo-500 text-white px-3 py-1 text-sm mb-3">
        Online
        <span className="text-xs">({Object.keys(onlineUsers).length})</span> :
      </span>

      {Object.keys(onlineUsers).map((onlineUser) => {
        return onlineUsers[onlineUser].username !== undefined ? (
          <div
            key={onlineUser}
            className="flex items-center py-4 px-1 border-t"
          >
            <div className={`w-10 h-10 rounded-xl shadow-md overflow-hidden mr-2 flex ${randomColor()}`}>
                {
                  onlineUsers[onlineUser].avatar !== undefined ? 
                  <img className='m-auto' src={onlineUsers[onlineUser].avatar} alt='user avatar' />
                  :
                  <span className="m-auto text-white font-black text-2xl">
                    String(onlineUsers[onlineUser].username)[0].toUpperCase()
                  </span>
                }
            </div>
            <div>
              {onlineUsers[onlineUser].username}
              {user?.connectionId === onlineUsers[onlineUser].connectionId ? (
                <span className="text-xs ml-1">(you)</span>
              ) : null}
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
}

export default ConnectedUsers