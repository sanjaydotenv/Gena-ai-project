import { useDispatch, useSelector } from "react-redux";

import {
  getAllConversationAPI,
  getMessagesByConversationIdAPI,
  handleConversationAPI,
} from "../api/chatAPI";

import {
  addMessage,
  setAiLatestMessage,
  setAllConversation,
  setAllMessagesByConversation,
  setCurrentConversation,
  resetAiLatestMessage,
} from "../slice/chat.slice";

import { useState } from "react";

const useChatHook = () => {
  const [userMsg, setUserMsg] = useState("");

  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const {currentConversation} = useSelector(state => state.chat)


  const handleAllChatConversation = async () => {
    const response = await getAllConversationAPI(accessToken);

    dispatch(setAllConversation(response.data.conversations));
  };

  const handleConversationMsg = async (conversation) => { 
    dispatch(setCurrentConversation(conversation));

    const response = await getMessagesByConversationIdAPI(conversation, accessToken);

    dispatch(setAllMessagesByConversation(response.data.messages));
  };


  const handleUserMsgSend = async () => {
    if (!userMsg.trim()) return;

    const content = userMsg;

    setUserMsg("")

    // Show user message immediately
    dispatch(
      addMessage({
        role: "user",
        content,
      }),
    );

    // Reset AI response
    dispatch(resetAiLatestMessage());

    // Add empty assistant message
    dispatch(
      addMessage({
        role: "assistant",
        content: "",
      }),
    );

    setUserMsg("");

    try {
      const response = await handleConversationAPI(
        content,
        currentConversation._id,
        accessToken,
      );

      const reader = response.body.getReader();

      const decoder = new TextDecoder();

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");

        buffer = events.pop() || "";

        for (const event of events) {
          if (!event.startsWith("data: ")) continue;

          const data = JSON.parse(event.slice(6));

          console.log(data)

          // First response: conversation information
          if (data.conversationId) {
            const newConversation = {
              _id: data.conversationId,
              title: data.title,
            };

            dispatch(setCurrentConversation(newConversation));

            await handleAllChatConversation();
          }

          // AI streaming chunks
          if (data.chunk) {
            dispatch(setAiLatestMessage(data.chunk));
          }
        }
      }

      // Save complete AI response in Redux messages
      // The actual database save is already done by backend.
    } catch (error) {
      console.log("Chat Error:", error.message);
    }
  };

  return {
    handleAllChatConversation,
    handleConversationMsg,
    handleUserMsgSend,
    setUserMsg,
    userMsg,
  };
};

export default useChatHook;
