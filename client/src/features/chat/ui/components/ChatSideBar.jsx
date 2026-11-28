import { Link } from "lucide-react";
import {
  ArrowLeft,
  Plus,
  MessageSquare,
  PanelLeftClose,
  Trash2,
} from "lucide-react";
import useChatHook from "../../hooks/chatHook";

const ChatSideBar = ({ conversations }) => {
  const { handleConversationMsg } = useChatHook();

  return (
    <aside className="w-[280px] shrink-0 bg-[#171717] border-r border-white/[0.06] flex flex-col">
      {/* Logo */}
      <div className="h-[76px] px-5 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-3xl font-bold"></Link>
          <p className="text-2xl font-bold">
            Provity<span className="text-orange-500">.</span>
          </p>
        </div>
        <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5">
          <PanelLeftClose size={19} />
        </button>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-medium transition">
          <Plus size={18} />
          New Conversation
        </button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-4">
        <p className="text-[11px] uppercase tracking-widest text-gray-600 font-semibold px-2 mb-3">
          Recent Conversations
        </p>

        <div className="space-y-1">
          {conversations.map((cnvs) => {
            return (
              <div
                onClick={() => {
                  handleConversationMsg(cnvs._id);
                }}
                key={cnvs._id}
                className="group flex items-center gap-2 rounded-lg px-3 py-3 bg-white/[0.07] text-white"
              >
                <MessageSquare size={16} />
                <span className="text-sm truncate flex-1">{cnvs.title}</span>
                <Trash2 size={15} className="text-gray-500" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/[0.06]">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>
      </div>
    </aside>
  );
};

export default ChatSideBar;
