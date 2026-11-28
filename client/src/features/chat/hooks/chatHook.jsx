import { useDispatch, useSelector } from "react-redux";
import {
  getAllConversationAPI,
  getMessagesByConversationIdAPI,
} from "../api/chatAPI";
import { setAllConversation, setAllMessagesByConversation } from "../slice/chat.slice";

const useChatHook = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  const handleAllChatConversation = async (accessToken) => {
    const response = await getAllConversationAPI(accessToken);

    dispatch(setAllConversation(response.data.conversations));
  };

  const handleConversationMsg = async (id) => {
    const response = await getMessagesByConversationIdAPI(id, accessToken);
    dispatch(setAllMessagesByConversation(response.data.messages))
  };

  return { handleAllChatConversation, handleConversationMsg };
};

export default useChatHook;
