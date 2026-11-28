import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatMessages = ({ messages }) => {
  const { aiLatestMessage } = useSelector((state) => state.chat);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, aiLatestMessage]);

  return (
    <div className="flex flex-col gap-5 p-4 min-h-118 max-h-[70vh] overflow-y-auto scrollbar-hide">

      {messages?.map((msg, index) => {
        const isUser = msg.role === "user";

        const isLastAssistant =
          msg.role === "assistant" && index === messages.length - 1;

        const content = isLastAssistant
          ? aiLatestMessage || msg.content
          : msg.content;

        return (
          <div
            key={msg._id || index}
            className={`w-fit max-w-[90%] p-4 rounded-2xl break-words ${
              isUser
                ? "self-end bg-[#173E76] text-white"
                : "self-start bg-[#171717] text-gray-200"
            }`}
          >
            {isUser ? (
              <p className="whitespace-pre-wrap">{content}</p>
            ) : (
              <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300 prose-a:text-blue-400">

                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(
                        className || "",
                      );

                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            borderRadius: "12px",
                            padding: "18px",
                            fontSize: "14px",
                            marginTop: "12px",
                            marginBottom: "12px",
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-800 text-pink-400 px-1.5 py-1 rounded text-sm"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },

                    table({ children }) {
                      return (
                        <div className="overflow-x-auto my-4">
                          <table className="border-collapse border border-gray-700 w-full">
                            {children}
                          </table>
                        </div>
                      );
                    },

                    th({ children }) {
                      return (
                        <th className="border border-gray-700 bg-gray-800 px-4 py-2 text-left">
                          {children}
                        </th>
                      );
                    },

                    td({ children }) {
                      return (
                        <td className="border border-gray-700 px-4 py-2">
                          {children}
                        </td>
                      );
                    },
                  }}
                >
                  {content || ""}
                </ReactMarkdown>

              </div>
            )}
          </div>
        );
      })}

      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatMessages;