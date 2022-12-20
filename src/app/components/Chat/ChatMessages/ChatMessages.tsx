import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { setReplyingMessage, TMessage } from "../../../holeySocksSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const ChatMessages = () => {
  const dispatch = useAppDispatch();

  const messages = useAppSelector((state) => state.chat.messages);

  const chatWrapper = useRef<HTMLDivElement | null>(null);

  const messageRef = useRef<Record<string, HTMLDivElement | null>>({})
  const buttonReplyRef = useRef<Record<string, {divMessageElement: HTMLButtonElement | null, msg: TMessage}>>({})

  useEffect(() => {
    Object.keys(buttonReplyRef.current).forEach(item => {
      messagesObserve.observe(buttonReplyRef.current[item]['divMessageElement'] as Element);
    })
 }, [messages]);

 console.log(buttonReplyRef.current)


  // const messageElement = useCallback((node: HTMLDivElement) => {
  //   if (node !== null) {
  //     messagesObserve.observe(node)
  //   }
  // }, []);

  const messagesObserve = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry)
        }
        else {
          
        }
      });
    },
    {
      root: chatWrapper?.current,
    }
  );

  const reply = (msg: typeof messages[0]) => {
    dispatch(
      setReplyingMessage({
        replyMessageId: msg.id,
        replyMessageText: msg.text,
        replyMessageAvatar: msg.avatar,
        replyMessageUsername: msg.username
      })
    );
  };

  const messageItems = messages.map((msg) => {
    return (
      <div key={msg.id} id={msg.id} ref={el => {
        messageRef.current[msg.id] = el
      }}>
        <div
          className={`flex items-end ${
            msg.isYour ? "justify-end mt-[1px]" : "mt-1"
          }`}
        >
          {!msg.isYour ? (
            <div className="flex flex-col items-center mr-2">
              <div className="w-8 h-8 flex rounded-full overflow-hidden">
                <img
                  className="w-full m-auto"
                  src={msg.avatar}
                  alt={msg.username + " avatar"}
                />
              </div>
            </div>
          ) : null}

          <div className="flex flex-col items-start">
            <span className="text-xs text-[#3c60ff]">
              {!msg.isYour ? msg.username : null}
            </span>

            <div className={`msg ${msg.isYour ? "my" : ""}`}>      
              <div>
                <RepliedMessage repliedMessage={msg.repliedMessage} />
                {msg.text}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => reply(msg)}
          className="text-xs ml-2 bg-slate-100 p-1 rounded-md"
        >
          reply
        </button>
      </div>
    );
  });

  return (
    <div
      ref={chatWrapper}
      className={`h-[350px] flex flex-col-reverse overflow-auto py-2`}
    >
      {messageItems}
    </div>
  );
};

export default ChatMessages;

const RepliedMessage: FC<{repliedMessage: TMessage['repliedMessage']}> = ({repliedMessage}) => {

  if (repliedMessage?.replyMessageText === '') return null;

  return (
    <>
      <a
        onClick={(e) => e.stopPropagation()}
        href={`#${repliedMessage?.replyMessageId}`}
        className="bg-green-300 w-full block"
      >
        {repliedMessage?.replyMessageText}
      </a>
    </>
  );
}
