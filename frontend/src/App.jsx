// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [message, setMessage] = useState("");
//   const [chats, setChats] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);

//   const chat = async (e, message) => {
//     e.preventDefault();

//     if (!message) return;
//     setIsTyping(true);
//     scrollTo(0, 1e10);

//     let msgs = chats;
//     msgs.push({ role: "user", content: message });
//     setChats(msgs);

//     setMessage("");

//     await fetch("http://localhost:8000/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         chats,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // msgs.push(data.output[1]);
//         console.log(data.output);
//         setChats(data.output);
//         setIsTyping(false);
//         scrollTo(0, 1e10);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <main>
//       <h1>FullStack Chat AI</h1>

//       <section>
//         {chats && chats.length
//           ? {chat}
//           : ""}
//       </section>

//       <div className={isTyping ? "" : "hide"}>
//         <p>
//           <i>{isTyping ? "Typing" : ""}</i>
//         </p>
//       </div>

//       <form action="" onSubmit={(e) => chat(e, message)}>
//         <input
//           type="text"
//           name="message"
//           value={message}
//           placeholder="Type a message here and hit Enter..."
//           onChange={(e) => setMessage(e.target.value)}
//         />
//       </form>
//     </main>
//   );
// }

// export default App;


import { useState } from "react";
import "./App.css";
import ReactMarkdown from 'react-markdown';

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();
  
    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);
  
    let newChats = [...chats]; // Create a new array with the current chats
    newChats.push({ role: "user", content: message }); // Push user message
    setChats(newChats); // Set the state immediately so that the message appears
  
    setMessage("");
  
    await fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats: newChats, // Send the updated chats array
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.output === 'string') {
          let updatedChats = [...newChats]; // Copy the updated chats array
          updatedChats.push({ role: "bot", content: data.output }); // Add bot response
          setChats(updatedChats); // Update chats with the bot's message
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

      
<section>
  {Array.isArray(chats) && chats.length
    ? chats.map((chat, index) => (
        <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
          <span>
            <b>{chat.role.toUpperCase()}</b>
          </span>
          <span>:</span>
          {/* If it's the bot's response, render it as markdown */}
          {chat.role === 'bot' ? (
            <ReactMarkdown>{chat.content}</ReactMarkdown>
          ) : (
            <span>{chat.content}</span>
          )}
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
