import React from 'react'
import { setReplyingMessage } from '../../../holeySocksSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

const ReplyingMessage = () => {
  const dispatch = useAppDispatch();
  const replyingMessage = useAppSelector((state) => state.chat.replyingMessage);

  return (
    <>
      {replyingMessage ? (
        <div
          onClick={() => {}}
          className="text-sm bg-slate-100 rounded-md p-2 w-full"
        >

          <div className="mb-2 text-xs flex justify-between">
            <span>
              replied {" "}
              <span className="text-indigo-500">{replyingMessage.replyMessageUsername}</span>
            </span>
            <button className="text-red-500" onClick={() => dispatch(setReplyingMessage(null))}>x</button>
          </div>

          <div className="flex justify-between">
            <div className="flex">
              <div className="w-6 h-6 overflow-hidden flex rounded-md mr-2">
                <img
                  className="w-full m-auto"
                  src={replyingMessage.replyMessageAvatar}
                  alt={replyingMessage.replyMessageUsername + "avatar"}
                />
              </div>
              {replyingMessage.replyMessageText}
            </div>

            <span>⤴</span>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ReplyingMessage