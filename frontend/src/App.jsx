import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState("light"); // State to handle the theme

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const chat = async (e, message) => {
    e.preventDefault();
    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);

    let msgs = [...chats];
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    await fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats: msgs,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.output === "string") {
          let updatedChats = [...chats];
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
      <h1>FullStack Chat AI</h1>

      {/* Theme toggle button */}
      <button onClick={toggleTheme} className="theme-toggle">
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>

      <section>
        {Array.isArray(chats) && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
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
