import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  users: [],
  messages: [] as {id: string, text: string}[]
}

const holeySocksSlice = createSlice({
  name: 'holeySocks',
  initialState,

  reducers: {
    getMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
    sendMessage: (state, action: PayloadAction<{id: string, text: string}>) => {
    }
  }
})

export const { sendMessage } = holeySocksSlice.actions; 

export default holeySocksSlice.reducer;
