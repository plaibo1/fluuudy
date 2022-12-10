import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  user: null as {username: string, connectionId: string, avatar: string} | null,
  users: {} as Record<string, {connectionId: string, username?: string, avatar?: string}>,
  messages: [] as {id: string, text: string, username: string, isYour?: boolean, avatar: string}[],
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
    
    sendMessage: (state, action: PayloadAction<{id: string, text: string, username: string, avatar: string}>) => {
    }
  }
})

// const test = Object.keys(holeySocksSlice.actions)

export const { sendMessage, login } = holeySocksSlice.actions;

export default holeySocksSlice.reducer;
