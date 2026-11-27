import React from "react";
import { MoreHorizontal } from "lucide-react";

const ChatHeader = () => {
  return (
    <header className="h-[76px] px-5 md:px-8 flex items-center justify-between border-b border-white/[0.06] shrink-0">
      <div>
        <h2 className="font-semibold text-sm md:text-base">
          Understanding JavaScript Closures
        </h2>

        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Provity AI Assistant
        </p>
      </div>

      <button className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/5">
        <MoreHorizontal size={21} />
      </button>
    </header>
  );
};

export default ChatHeader;
