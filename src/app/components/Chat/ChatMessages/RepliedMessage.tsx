import { FC } from "react";
import { TMessage } from "../../../holeySocksSlice";

type TRepliedMessage = {
  repliedMessage: TMessage["repliedMessage"];
  scrollToMessage: () => void;
}

const RepliedMessage: FC<TRepliedMessage> = ({ repliedMessage, scrollToMessage }) => {

  if (repliedMessage?.replyMessageText === "") return null;

  return (
    <>
      <span
        onClick={scrollToMessage}
        // href={`#${repliedMessage?.replyMessageId}`}
        className="bg-green-300 w-full block"
      >
        {repliedMessage?.replyMessageText}
      </span>
    </>
  );
};

export default RepliedMessage;