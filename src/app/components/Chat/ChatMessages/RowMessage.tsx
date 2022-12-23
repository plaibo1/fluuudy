import { useEffect, useRef } from "react";
import { TMessage } from "../../../holeySocksSlice";
import RepliedMessage from "./RepliedMessage";

type TRow = {
  data: TMessage[];
  index: number;
  style: any;
  scrollToItem: (repliedMessage: TMessage["repliedMessage"]) => void;
  reply: (repliedMessage: TMessage) => void;
  windowWidth: number;
  setSize: (item: any, item2: any) => void;
};

const RowMessage = ({
  data: msg,
  index,
  style,
  scrollToItem,
  reply,
  windowWidth,
  setSize,
}: TRow) => {
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSize(index, rowRef?.current?.getBoundingClientRect().height);
  }, [setSize, index, windowWidth]);

  return (
    <div style={style}>
      <div ref={rowRef}>
        <div
          className={`flex items-end ${
            msg[index].isYour ? "justify-end mt-[1px]" : "mt-1"
          }`}
        >
          {!msg[index].isYour ? (
            <div className="flex flex-col items-center mr-2">
              <div className="w-8 h-8 flex rounded-full overflow-hidden">
                <img
                  className="w-full m-auto"
                  src={msg[index].avatar}
                  alt={msg[index].username + " avatar"}
                />
              </div>
            </div>
          ) : null}

          <div className="flex flex-col items-start">
            <span
              className="text-xs text-[#3c60ff]"
              onClick={() => console.log(index)}
            >
              {!msg[index].isYour ? msg[index].username : null}
            </span>

            <div className={`msg ${msg[index].isYour ? "my" : ""}`}>
              <div>
                <RepliedMessage
                  repliedMessage={msg[index].repliedMessage}
                  scrollToMessage={() =>
                    scrollToItem(msg[index].repliedMessage)
                  }
                />
                {msg[index].text}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => reply(msg[index])}
          className="text-xs ml-2 bg-slate-100 p-1 rounded-md"
        >
          reply
        </button>
      </div>
    </div>
  );
};

export default RowMessage;