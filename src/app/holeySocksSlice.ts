import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TMessage = {
  id: string;
  text: string;
  username: string;
  isYour?: boolean;
  avatar: string;
  repliedMessage?: Omit<repliedMessage, 'replyMessageAvatar'> | null
}

export type repliedMessage = {
  replyMessageText: string;
  replyMessageId: string;
  replyMessageAvatar: string;
  replyMessageUsername: string;
} 

type TInitialState = {
  user: { username: string; connectionId: string; avatar: string } | null;
  users: Record<
    string,
    { connectionId: string; username?: string; avatar?: string }
  >;

  messages: TMessage[];

  replyingMessage: repliedMessage | null;
}; 

const initialState: TInitialState = {
  user: null,
  users: {},
  messages: [],
  replyingMessage: null,
}

const holeySocksSlice = createSlice({
  name: 'holeySocks',
  initialState,

  reducers: {
    login: (state, action: PayloadAction<{username: string, userImg: string}>) => {},
    
    getOnlineUsers: (state, action) => {
      state.users = action.payload;
    },

    getUser: (state, action) => {
      state.user = action.payload
    },

    getHistory: (state, action) => {
      state.messages = action.payload
    },

    getMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
    
    sendMessage: (state, action: PayloadAction<TMessage>) => {
    },

    setReplyingMessage: (state, action:PayloadAction<TInitialState['replyingMessage']>) => {
      state.replyingMessage = action.payload;
    }
  }
})

// const test = Object.keys(holeySocksSlice.actions)

export const { sendMessage, login, setReplyingMessage } = holeySocksSlice.actions;

export default holeySocksSlice.reducer;
