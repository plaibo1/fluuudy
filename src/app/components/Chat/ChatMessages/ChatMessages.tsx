import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { setReplyingMessage, TMessage } from "../../../holeySocksSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { VariableSizeList as List } from "react-window";
import { useWindowResize } from "../../hooks/useWindowResize";
import RowMessage from "./RowMessage";
import { arrayObjectIndexOf } from "../../helpFunctions/helpFunctions";

const ChatMessages = () => {
  const dispatch = useAppDispatch();

  const messages = useAppSelector((state) => state.chat.messages);

  const messagesListRef = useRef<any>();

  const sizeMap = useRef<any>({});

  const innerMessagesRef = useRef<any>();

  const [showChatUpButton, setShowChatUpButton] = useState<boolean>(false);

  useEffect(() => {
    if (messages[messages.length - 1]?.isYour) {
      goDown();
    }
  }, [messages]);

  const setSize = useCallback((index: number, size: number) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    messagesListRef.current.resetAfterIndex(index);
  }, []);

  const getSize = (index: number) => {
    return sizeMap.current[index] + 10 || 65;
  };

  const [windowWidth] = useWindowResize();

  const reply = (msg: typeof messages[0]) => {
    dispatch(
      setReplyingMessage({
        replyMessageId: msg.id,
        replyMessageText: msg.text,
        replyMessageAvatar: msg.avatar,
        replyMessageUsername: msg.username,
      })
    );
  };

  const scrollToItem = (repliedMessage: TMessage["repliedMessage"]) => {
    const indexOfMessage = arrayObjectIndexOf(
      messages,
      repliedMessage?.replyMessageId || "",
      "id"
    );

    messagesListRef.current.scrollToItem(indexOfMessage, "top");
  };

  const getItemKey = (index: number) => messages[index].id;

  const onItemsRendered = ({
    visibleStartIndex,
    visibleStopIndex,
    overscanStopIndex,
  }: any) => {
    // console.log('messages.length: ', messages.length);

    // console.log("start: ", visibleStartIndex);
    // console.log("stop: ", visibleStopIndex);
    // console.log('oversscat stop: ', overscanStopIndex);

    if (
      visibleStopIndex < messages.length - 1 &&
      messages.length - 1 - visibleStopIndex >= 1
    ) {
      setShowChatUpButton((prev) => (prev = true));
    } else {
      setShowChatUpButton((prev) => (prev = false));
    }
  };

  console.log(messages.length)

  const goDown = () => {
    messagesListRef.current.scrollToItem(messages.length - 1);
  }

  console.log()

  return (
    <div className="relative">
      <List
        height={350}
        itemCount={messages.length}
        itemSize={getSize}
        width="100%"
        itemData={messages}
        itemKey={getItemKey}
        ref={messagesListRef}
        onItemsRendered={onItemsRendered}
        innerRef={innerMessagesRef}
      >
        {({ data, index, style }) => (
          <RowMessage
            data={data}
            index={index}
            style={style}
            scrollToItem={scrollToItem}
            reply={reply}
            setSize={setSize}
            windowWidth={windowWidth}
          />
        )}
      </List>

      {showChatUpButton ? (
        <button onClick={goDown} className="w-8 h-8 bg-indigo-500 rounded-full absolute right-0 bottom-0 text-white">
          ↓
        </button>
      ) : null}
    </div>
  );
};

export default ChatMessages;
