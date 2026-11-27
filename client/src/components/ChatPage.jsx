import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router";
import {
  ArrowLeft,
  Plus,
  Search,
  MessageSquare,
  Send,
  Paperclip,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  MoreHorizontal,
  Trash2,
  Bot,
  User,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";

const STORAGE_KEY = "provity_chat_history";

const suggestions = [
  "Explain JavaScript closures",
  "Help me debug my code",
  "Write a professional email",
  "Generate creative ideas",
];

const ChatPage = () => {
  
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  const [chats, setChats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const currentChat = chats.find((chat) => chat.id === activeChat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [currentChat?.messages]);

  const createNewChat = () => {
    setActiveChat(null);
    setMessage("");
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    let chatId = activeChat;

    const newMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    if (!chatId) {
      chatId = Date.now().toString();

      const newChat = {
        id: chatId,
        title: trimmedMessage.slice(0, 35),
        messages: [newMessage],
        createdAt: new Date().toISOString(),
      };

      setChats((prev) => [newChat, ...prev]);
      setActiveChat(chatId);
    } else {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, newMessage],
              }
            : chat,
        ),
      );
    }

    setMessage("");
  };

  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));

    if (activeChat === chatId) {
      setActiveChat(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-[#121212] text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-[280px]" : "w-0"
        } shrink-0 bg-[#171717] border-r border-white/[0.06] flex flex-col transition-all duration-300 overflow-hidden`}
      >
        {/* Logo */}
        <div className="h-[76px] px-5 flex items-center justify-between border-b border-white/[0.06] min-w-[280px]">
          <Link to="/" className="text-2xl font-bold">
            Provity<span className="text-orange-500">.</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5"
          >
            <PanelLeftClose size={19} />
          </button>
        </div>

        {/* New Chat */}
        <div className="p-4 min-w-[280px]">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-medium transition"
          >
            <Plus size={18} />
            New Conversation
          </button>

          <button className="w-full mt-3 flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition">
            <Search size={17} />
            Search Conversations
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-4 min-w-[280px]">
          <p className="text-[11px] uppercase tracking-widest text-gray-600 font-semibold px-2 mb-3">
            Recent Conversations
          </p>

          <div className="space-y-1">
            {chats.length === 0 ? (
              <p className="text-sm text-gray-600 px-2 py-4">
                No conversations yet.
              </p>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`group flex items-center gap-2 rounded-lg px-3 py-3 transition ${
                    activeChat === chat.id
                      ? "bg-white/[0.07] text-white"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <button
                    onClick={() => setActiveChat(chat.id)}
                    className="flex-1 flex items-center gap-3 min-w-0 text-left"
                  >
                    <MessageSquare size={16} className="shrink-0" />

                    <span className="text-sm truncate">{chat.title}</span>
                  </button>

                  <button
                    onClick={() => deleteChat(chat.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/[0.06] min-w-[280px]">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-[76px] px-5 md:px-8 flex items-center justify-between border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <PanelLeftOpen size={20} />
              </button>
            )}

            <div>
              <h2 className="font-semibold text-sm md:text-base">
                {currentChat?.title || "New Conversation"}
              </h2>

              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Provity AI Assistant
              </p>
            </div>
          </div>

          <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5">
            <MoreHorizontal size={21} />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {!currentChat ? (
            /* Welcome Screen */
            <div className="min-h-full flex flex-col items-center justify-center px-5 py-12">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                <Sparkles size={30} className="text-orange-500" />
              </div>

              <p className="text-orange-500 text-xs font-semibold tracking-[0.2em] mb-4">
                YOUR PERSONAL AI
              </p>

              <h1 className="text-3xl md:text-4xl font-semibold text-center mb-4">
                How can I help you
                <span className="text-orange-500"> today?</span>
              </h1>

              <p className="text-gray-500 text-sm text-center max-w-md leading-6">
                Ask questions, explore ideas, solve problems or create something
                amazing. Your AI workspace is ready.
              </p>

              {/* Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12 w-full max-w-xl">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setMessage(item);
                      textareaRef.current?.focus();
                    }}
                    className="text-left p-4 rounded-xl bg-[#1a1a1a] border border-white/[0.07] hover:border-orange-500/40 hover:bg-[#202020] transition group"
                  >
                    <p className="text-sm text-gray-400 group-hover:text-white transition">
                      {item}
                    </p>

                    <ArrowLeft
                      size={15}
                      className="rotate-[135deg] mt-3 text-gray-600 group-hover:text-orange-500 transition"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 space-y-8">
              {currentChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${
                      msg.role === "user"
                        ? "bg-[#292929] text-gray-300"
                        : "bg-orange-500/10 text-orange-500"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={18} />
                    ) : (
                      <Bot size={19} />
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] min-w-0 ${
                      msg.role === "user" ? "text-right" : ""
                    }`}
                  >
                    <p className="text-xs text-gray-500 mb-2">
                      {msg.role === "user" ? "You" : "Provity AI"}
                    </p>

                    <div
                      className={`inline-block text-left text-sm leading-7 whitespace-pre-wrap break-words rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-orange-500 text-white rounded-tr-sm"
                          : "bg-[#1d1d1d] border border-white/[0.06] text-gray-300 rounded-tl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="px-4 md:px-8 pb-5 pt-3 shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1c1c1c] border border-white/[0.09] rounded-2xl p-3 focus-within:border-orange-500/40 transition">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Provity AI..."
                rows={2}
                className="w-full bg-transparent resize-none outline-none text-sm text-white placeholder:text-gray-600 px-2 py-2 max-h-40"
              />

              <div className="flex items-center justify-between mt-2">
                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition">
                  <Paperclip size={19} />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <Send size={17} />
                </button>
              </div>
            </div>

            <p className="text-center text-[11px] text-gray-600 mt-3">
              Provity AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
