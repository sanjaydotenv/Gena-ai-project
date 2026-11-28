import { useEffect } from "react";
import { useSelector } from "react-redux";

import ChatSideBar from "../components/ChatSideBar";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

import useChatHook from "../../hooks/chatHook";

const ChatPage = () => {
  const {
    handleAllChatConversation,
    handleConversationMsg,
    handleUserMsgSend,
    setUserMsg,
    userMsg,
  } = useChatHook();

  const { accessToken } = useSelector((state) => state.auth);

  const { conversations, currentConversation, messages, aiLatestMessage } =
    useSelector((state) => state.chat);

  useEffect(() => {
    if (!accessToken) return;

    handleAllChatConversation();
  }, [accessToken]);

  return (
    <div className="h-screen bg-[#121212] text-white flex overflow-hidden">
      <ChatSideBar
        conversations={conversations}
        handleConversationMsg={handleConversationMsg}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader currentConversation={currentConversation} />

        <ChatMessages messages={messages} aiLatestMessage={aiLatestMessage} />

        <ChatInput
          userMsg={userMsg}
          setUserMsg={setUserMsg}
          handleUserMsgSend={handleUserMsgSend}
        />
      </main>
    </div>
  );
};

export default ChatPage;
