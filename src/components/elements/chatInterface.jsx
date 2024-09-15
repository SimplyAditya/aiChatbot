import React from "react";

const ChatInterface = (prop) => {
  const design =
    "p-4 dark:text-[#B4B4AF] text-xl max-w-3/4 bg-gray-200 dark:bg-[#2F2F2F] rounded-2xl";
  return (
    <div className="w-full h-full flex flex-col">
      {prop.chat.map((chat, index) => (
        <div key={index} className="flex flex-col ">
          {chat.prompt && (
            <div className="w-full flex justify-end">
              <h1 className={`flex justify-end ${design}`}>{chat.prompt}</h1>
            </div>
          )}
          {chat.response ? (
            <div className="w-full flex justify-start">
              <h1 className={`flex justify-start ${design}`}>
                {chat.response}
              </h1>
            </div>
          ) : (
            <div className="w-full flex justify-start">
              <h1 className={`flex justify-start ${design} animate-bounce`}>
                ...
              </h1>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatInterface;
