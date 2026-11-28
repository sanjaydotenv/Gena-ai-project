import React from "react";

const ChatMessages = ({ messages, aiLatestMessage }) => {

  console.log(messages)
  return (
    <div className="flex flex-col gap-5 p-4 min-h-118 overflow-auto">
      {messages?.map((msg, index) => {
        const isUser = msg.role === "user";

        // Last assistant message is currently streaming
        const isLastAssistant =
          msg.role === "assistant" && index === messages.length - 1;

        const content = isLastAssistant ? aiLatestMessage : msg.content;

        return (
          <div
            key={msg._id || index}
            className={`w-fit max-w-[80%] p-4 rounded-xl break-words whitespace-pre-wrap ${
              isUser
                ? "self-end bg-[#173E76] text-white"
                : "self-start bg-black text-white/80"
            }`}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
