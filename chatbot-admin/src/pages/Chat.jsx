import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatTest = () => {
  const [chatbotId, setChatbotId] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchChatbot = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/chatbot/client/${import.meta.env.VITE_TEST_CLIENT_ID}`);
      if (res.data.length > 0) {
        setChatbotId(res.data[0]._id);
      }
    };
    fetchChatbot();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { role: "user", content: message };
    setHistory((prev) => [...prev, userMsg]);
    setMessage("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/chat/${chatbotId}`, { message });
      const botReply = { role: "bot", content: res.data.reply };
      setHistory((prev) => [...prev, botReply]);
    } catch {
      setHistory((prev) => [...prev, { role: "bot", content: "❌ Server error." }]);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    inputRef.current?.focus();
  }, [history]);

  return (
    <div style={wrapper}>
      <h3 style={heading}>🤖 Your Chat Assistant</h3>

      <div ref={chatRef} style={chatContainer}>
        {history.map((msg, idx) => (
          <div key={idx} style={{ ...bubbleBase, ...(msg.role === "user" ? bubbleUser : bubbleBot) }}>
            <div style={msg.role === "user" ? avatarRight : avatarLeft}>
              {msg.role === "user" ? "🧑" : "🤖"}
            </div>
            <div style={text}>{msg.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={inputBox}>
        <input
          ref={inputRef}
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          style={input}
        />
        <button type="submit" style={button}>➤</button>
      </form>
    </div>
  );
};

// Fixed dimensions
const wrapper = {
  width: "400px",
  height: "600px",
  margin: "40px auto",
  padding: "20px",
  fontFamily: "Segoe UI, sans-serif",
  borderRadius: "16px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  background: "#fff",
  border: "1px solid #eaeaea",
  display: "flex",
  flexDirection: "column"
};

const heading = {
  textAlign: "center",
  marginBottom: "12px"
};

const chatContainer = {
  flex: 1,
  overflowY: "auto",
  backgroundColor: "#f9f9f9",
  padding: "16px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "12px"
};

const bubbleBase = {
  display: "flex",
  maxWidth: "80%",
  marginBottom: "12px"
};

const bubbleUser = {
  alignSelf: "flex-end",
  marginLeft: "auto",
  flexDirection: "row-reverse"
};

const bubbleBot = {
  alignSelf: "flex-start"
};

const avatarLeft = {
  marginRight: "10px",
  fontSize: "20px"
};

const avatarRight = {
  marginLeft: "10px",
  fontSize: "20px"
};

const text = {
  padding: "12px",
  borderRadius: "12px",
  backgroundColor: "#e0f7fa",
  fontSize: "15px",
  lineHeight: "1.4",
  whiteSpace: "pre-wrap"
};

const inputBox = {
  display: "flex",
  borderTop: "1px solid #eee",
  paddingTop: "10px"
};

const input = {
  flex: 1,
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px"
};

const button = {
  padding: "0 16px",
  marginLeft: "10px",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "20px",
  cursor: "pointer"
};

export default ChatTest;
