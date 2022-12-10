import { io } from "socket.io-client";
import { Middleware } from "@reduxjs/toolkit";
// import { sendChatMessage } from "../holeySocksSlice";

const createMySocketMiddleware = (
  url: string,
  reducerName: string,
  events: string[],
  emitEvents: string[]
): Middleware => {
  return (storeAPI) => {
    const socket = io(url);

    events.forEach((event: string) => {
      socket.on(event, (message: any) => {
        storeAPI.dispatch({
          type: `${reducerName}/${event}`,
          payload: message,
        });
      });
    });

    return (next) => (action) => {
      const eventName = action.type.replace(reducerName + "/", "")

      if (emitEvents.includes(eventName)) {
        socket.emit(eventName, action.payload);
        return;
      }

      return next(action);
    };
  };
};

export const wsLocalhostConnect = createMySocketMiddleware(
  "ws://localhost:8000",
  "holeySocks",
  ["getMessage", "getHistory", "getUser", "getOnlineUsers"],
  ["sendMessage", "login"]
);
