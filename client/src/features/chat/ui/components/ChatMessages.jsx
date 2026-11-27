import React from 'react'

const ChatMessages = () => {
  return (
    <div className="flex-1 overflow-y-auto ">
          {/* Chat Messages */}
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 space-y-8">
            {/* User Message */}
            <div className="flex gap-4 flex-row-reverse"></div>

            {/* AI Message */}
            <div className="flex gap-4"></div>
          </div>
        </div>
  )
}

export default ChatMessages
