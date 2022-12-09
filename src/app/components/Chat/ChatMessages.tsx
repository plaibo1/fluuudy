import React, { useCallback, useRef, useState } from 'react'
import { useAppSelector } from '../../hooks';

import './chat.css';

const ChatMessages = () => {
  const messages = useAppSelector(state => state.chat.messages)

  const chatWrapper = useRef<HTMLDivElement | null>(null)
  // const [notReadingMessages, setNotReadingMessages] = useState<Element[]>([]);

  // const messageElement = useCallback((node: HTMLDivElement) => {
  //   if (node !== null) {
  //     messagesObserve.observe(node)
  //   }
  // }, []);

  // const messagesObserve = new IntersectionObserver(
  //   (entries, observer) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         observer.unobserve(entry.target)
  //       }
  //       else {
  //         // entry.target.scrollIntoView({ behavior: 'smooth' });
  //         // setNotReadingMessages((prev) => [...prev, entry.target])
  //         // console.log(entry)
  //       }
  //     })
  //   },
  //   {
  //     root: chatWrapper?.current
  //   }
  // ) 

  // console.log(notReadingMessages)

  const messageItems = messages.map((msg) => {
    return (
      <div key={msg.id}>
        <div className={`flex items-end ${msg.isYour ? "justify-end mt-[1px]" : "mt-1"}`}>
          {!msg.isYour ? (
              <div className='flex flex-col items-center mr-2'>
                <div className="w-8 h-8 flex rounded-full overflow-hidden">
                  <img
                    className="w-full m-auto"
                    src={msg.avatar}
                    alt={msg.username + " avatar"}
                  />
                </div>
              </div>
            ) : null}

          <div className='flex flex-col items-start'>
            <span className="text-xs text-[#3c60ff]">
              {
                !msg.isYour ? 
                msg.username
                :
                null
              }
            </span>
          
            <div className={`msg ${msg.isYour ? "my" : ""}`}>
              {msg.text}
            </div>
          </div>
        </div>
      </div>
    );
  })

  return (
    <div
      ref={chatWrapper}
      className="flex flex-col-reverse h-[350px] overflow-auto py-2"
    >
      {messageItems}
    </div>
  );
}

export default ChatMessages