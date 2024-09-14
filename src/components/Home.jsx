import React , {useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import UseThemeContext from "./context/ThemeContext";

const Home = () => {
    const [prompt, setPrompt]= useState("");
    const textarearef = useRef(null)
  const navigate = useNavigate();
  const { theme, switchTheme } = UseThemeContext();

    const handleInput=(e)=>{
        const textarea=textarearef.current
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 8 * 24)}px`;    
        setPrompt(e.target.value)
    }

  return (
    <div className="w-screen h-screen flex flex-col dark:bg-[#212121]">
      <div className="w-screen flex items-center justify-between p-8 py-4 dark:text-[#B4B4AF]">
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
            onClick={() => navigate("/login")}
          >
            SignOut
          </button>
        </div>
      </div>
      <div className="flex-grow w-full h-full px-8 py-4 flex flex-col items-center">
        <div className="w-5/6 h-full flex-grow flex justify-center"></div>
      </div>
      <div className="w-full px-8 py-4 bottom-0 flex flex-col gap-2 items-center">
        <div className="w-full flex justify-center">
          <div className="w-5/6 p-4 rounded-2xl bg-gray-100 dark:bg-[#2F2F2F] flex items-center">
            <form className="flex items-center justify-between w-full">
              <textarea
              ref= {textarearef}
                placeholder="Enter your prompt Here"
                rows={1}
                value={prompt}
                onInput={handleInput}
                className="focus:outline-none flex-grow bg-transparent dark:text-[#B4B4AF] resize-none overflow-y-auto"
                style={{maxHeight:`192px`, lineHeight: '24px'}}
              />
              <button>
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
