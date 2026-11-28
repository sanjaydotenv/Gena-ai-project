import ChatSideBar from "../components/ChatSideBar";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { useSelector } from "react-redux";
import useChatHook from "../../hooks/chatHook";
import { useEffect } from "react";

const ChatPage = () => {
  const { handleAllChatConversation } = useChatHook();
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) return;

    handleAllChatConversation(accessToken);
  }, [accessToken]);

  const { conversations } = useSelector((state) => state.chat);

  const { messages } = useSelector((state) => state.chat);

  return (
    <div className="h-screen bg-[#121212] text-white flex overflow-hidden">
      {/* Sidebar */}
      <ChatSideBar conversations={conversations} />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}

        <ChatHeader conversations={conversations} />
        {/* Messages */}

        <ChatMessages messages={messages} />
        {/* Message Input */}
        <ChatInput />
      </main>
    </div>
  );
};

export default ChatPage;
