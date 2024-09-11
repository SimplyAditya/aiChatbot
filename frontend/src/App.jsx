import { useState, useEffect } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);

    let newChats = [...chats];
    newChats.push({ role: "user", content: message });
    setChats(newChats);

    setMessage("");

    await fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats: newChats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.output === "string") {
          let updatedChats = [...newChats];
          updatedChats.push({ role: "bot", content: data.output });
          setChats(updatedChats);
        } else {
          console.error("Expected a string in the response, received:", data.output);
        }
        setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <h1>Welcome to AI Chat Bot</h1>

      {}
      <button className="theme-toggle" onClick={toggleTheme}>
        Switch to {theme === "dark" ? "Light" : "Dark"} Theme
      </button>

      {}
      <section>
        {Array.isArray(chats) && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                {chat.role === "bot" ? (
                  <ReactMarkdown>{chat.content}</ReactMarkdown>
                ) : (
                  <span>{chat.content}</span>
                )}
              </p>
            ))
          : ""}
      </section>

      {}
      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing..." : ""}</i>
        </p>
      </div>

      {}
      <form onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default App;
