import { useDispatch, useSelector } from "react-redux";
import {
  getAllConversationAPI,
  getMessagesByConversationIdAPI,
  handleConversationAPI,
} from "../api/chatAPI";
import {
  setAllConversation,
  setAllMessagesByConversation,
} from "../slice/chat.slice";
import { useState } from "react";

const useChatHook = () => {
  const [userMsg, setUserMsg] = useState("");
  const [conversationId, setConversationId] = useState(null);

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  const handleAllChatConversation = async (accessToken) => {
    const response = await getAllConversationAPI(accessToken);
    dispatch(setAllConversation(response.data.conversations));
  };

  const handleConversationMsg = async (id) => {
    const response = await getMessagesByConversationIdAPI(id, accessToken);
    dispatch(setAllMessagesByConversation(response.data.messages));
  };

  const handleUserMsgSend = async () => {
    const response = await handleConversationAPI(
      userMsg,
      conversationId,
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

      events.forEach((event) => {
        if (event.startsWith("data: ")) {
          const data = JSON.parse(event.slice(6));

          if (data.conversationId) {
            setConversationId(data.conversationId);
          }

          if (data.chunk) {
            console.log(data.chunk);
          }
        }
      });
    }
  };

  return {
    handleAllChatConversation,
    handleConversationMsg,
    setUserMsg,
    userMsg,
    handleUserMsgSend,
  };
};

export default useChatHook;
