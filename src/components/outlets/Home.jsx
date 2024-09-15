import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faPaperPlane,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import UseThemeContext from "../../context/ThemeContext";
import ChatInterface from "../elements/chatInterface";
import apiContext from "../../context/apiContext";
import axios from "axios";
import { useData } from "../../hooks/chatHook";


const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const textarearef = useRef(null);
  const navigate = useNavigate();
  const { theme, switchTheme } = UseThemeContext();
  const token = localStorage.getItem("token");

  const [chat, setChat] = useState([]);
  const handleInput = (e) => {
    const textarea = textarearef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 8 * 24)}px`;
    setPrompt(e.target.value);
  };
  useEffect(() => {
    const fetchChatData = async () => {
      const data = await useData(token); // Load data using your chatHook
      if (data) {
        console.log(data)
        setChat(data);
      } else {
        setChat([]); // Set chat as empty array if no data
      }
    };

    fetchChatData();
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt === "") {
      return;
    } else {
      setLoading(true);
      console.log(chat, prompt);
      const chatsTill = chat;
      setChat([...chat, { prompt: `${prompt}` }]);
      const promptToSend = prompt;
      setPrompt("");
      console.log(promptToSend, chatsTill);
      const response = await axios.post(
        apiContext.chatUrl,
        {
          prompt: promptToSend,
          chats: chatsTill,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      const val = [
        ...chatsTill,
        { prompt: promptToSend, response: response.data.message },
      ];
      setLoading(false);
      setChat(val);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        // Find the button by its ID and trigger a click event
        const submitButton = document.getElementById("submitButton");
        if (submitButton) {
          submitButton.click();
        }
      }
    };
    document.addEventListener("keypress", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="w-full fixed flex items-center justify-between  p-8 py-4 bg-white dark:bg-[#212121] dark:text-[#B4B4AF]">
        <h1 className="text-xl shrink-0">AI Chatbot</h1>
        <div className="flex gap-2">
          <button
            className="p-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2F2F2F]"
            onClick={() => switchTheme()}
          >
            {theme === "light" ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={faSun} />
            )}
          </button>
          <button
            className="py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-[#2F2F2F]"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      </div>
      <div className="py-8 text-transparent">Hello</div>
      <div className=" flex-grow h-full px-8 py-4 flex flex-col items-center">
        <div className=" flex-grow w-5/6 h-full flex justify-center overflow-y-auto">
          {chat && <ChatInterface chat={chat} />}
        </div>
      </div>
      <div className="py-10 bottom-0 text-4xl text-transparent">Hello</div>
      <div className="w-full px-8 py-4 fixed bottom-0 flex flex-col gap-2 items-center bg-white dark:bg-[#212121]">
        <div className="w-full flex justify-center">
          <div className="w-5/6 p-4 rounded-2xl bg-gray-200 dark:bg-[#2F2F2F] flex items-center">
            <form
              className="flex items-center justify-between w-full"
              onSubmit={handleSubmit}
            >
              <textarea
                ref={textarearef}
                placeholder={
                  loading
                    ? "Your answer is being generated"
                    : "Enter your prompt Here"
                }
                rows={1}
                disabled={loading}
                value={prompt}
                onInput={handleInput}
                className="focus:outline-none flex-grow bg-transparent dark:text-[#B4B4AF] resize-none overflow-y-auto"
                style={{ maxHeight: `192px`, lineHeight: "24px" }}
              />
              <button disabled={loading} id="submitButton">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="dark:text-[#B4B4AF]"
                />
              </button>
            </form>
          </div>
        </div>
        <h1 className="dark:text-[#B4B4AF] text-sm shrink-0">
          This AI is powered by Gemini, Please confirm your answers before using
        </h1>
      </div>
    </div>
  );
};

export default Home;
