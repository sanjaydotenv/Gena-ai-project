import ChatSideBar from "../components/ChatSideBar";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

const ChatPage = () => {
  return (
    <div className="h-screen bg-[#121212] text-white flex overflow-hidden">
      {/* Sidebar */}
      <ChatSideBar />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}

        <ChatHeader />
        {/* Messages */}

        <ChatMessages />
        {/* Message Input */}
        <ChatInput />
      </main>
    </div>
  );
};

export default ChatPage;
