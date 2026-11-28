import React from "react";
import { Send, Paperclip } from "lucide-react";
import useChatHook from "../../hooks/chatHook";

const ChatInput = () => {
  const { setUserMsg , handleUserMsgSend , userMsg} = useChatHook();
  return (
    <div className="px-4 md:px-8 pb-5 pt-3 shrink-0 ">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#1c1c1c] border border-white/[0.09] rounded-2xl p-3">
          <textarea
          value={userMsg}
          onInput={(e) => {
            setUserMsg(e.target.value)
          }}
            placeholder="Message Provity AI..."
            rows={2}
            className="w-full bg-transparent resize-none outline-none text-sm text-white placeholder:text-gray-600 px-2 py-2"
          />

          <div className="flex items-center justify-between mt-2">
            <button className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition">
              <Paperclip size={19} />
            </button>

            <button onClick={handleUserMsgSend} className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-600 transition">
              <Send size={17} />
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-gray-600 mt-3">
          Provity AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
