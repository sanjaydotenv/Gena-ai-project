import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    conversations: [],
    messages: [],
    currentConversation: null,
    aiLatestMessage: null,
  },

  reducers: {
    setAllConversation: (state, action) => {
      state.conversations = action.payload;
    },

    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },

    setAllMessagesByConversation: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    setAiLatestMessage: (state, action) => {
      state.aiLatestMessage += action.payload;
    },

    resetAiLatestMessage: (state) => {
      state.aiLatestMessage = "";
    },

    clearMessages: (state) => {
      state.messages = [];
      state.currentConversation = null;
      state.aiLatestMessage = "";
    },
  },
});

export const {
  setAllConversation,
  setCurrentConversation,
  setAllMessagesByConversation,
  addMessage,
  setAiLatestMessage,
  resetAiLatestMessage,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
