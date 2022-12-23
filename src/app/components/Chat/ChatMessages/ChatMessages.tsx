import React, { useCallback, useRef } from "react";
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

  const setSize = useCallback((index: number, size: number) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    messagesListRef.current.resetAfterIndex(index);
  }, []);

  const getSize = (index: number) => {
    return (sizeMap.current[index] + 10) || 65;
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
    console.log(messagesListRef.current)
  };

  const getItemKey = (index: number) => messages[index].id;

  return (
    <List
        height={350}
        itemCount={messages.length}
        itemSize={getSize}
        width="100%"
        itemData={messages}
        itemKey={getItemKey}
        ref={messagesListRef}
        className={'myTestClasssss'}
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
  );
};

export default ChatMessages;
