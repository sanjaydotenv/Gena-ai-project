import React from "react";
import { useSelector } from "react-redux";

const ChatMessages = ({messages}) => {


  return (
    <div className="flex flex-col gap-5 p-4  overflow-auto">
      {messages?.map((msg) => {
        return (
          <div
            key={msg._id}
            className={`w-fit max-w-[80%] p-4 rounded-xl break-words ${
              msg.role === "user"
                ? "self-end bg-[#173E76] text-white"
                : "self-start bg-black text-white/80"
            }`}
          >
            {msg.content}
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
