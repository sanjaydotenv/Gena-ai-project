import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    messages: null,
  },
  reducers: {
    setAllConversation: (state, action) => {
      state.conversations = action.payload;
    },
    setAllMessagesByConversation: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setAllConversation , setAllMessagesByConversation} = chatSlice.actions;

export default chatSlice.reducer;
