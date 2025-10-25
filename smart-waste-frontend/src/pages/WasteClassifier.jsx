// src/pages/WasteClassifier.jsx
import React, { useState, useRef, useEffect } from "react";
import "./WasteClassifier.css";
import botGif from "./chatbot.gif"; // ✅ Place chatbot.gif inside src/assets/

const WasteClassifier = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I am WasteBot 🤖. Upload a waste image or ask me anything about recycling!",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // ✅ Auto-scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name);
      addMessage("user", `📂 Uploaded: ${file.name}`);
    }
  };

  const handleSend = async () => {
    if (!input && !image) return;
    if (input) addMessage("user", input);

    const formData = new FormData();
    if (image) formData.append("file", image);
    if (input) formData.append("message", input);

    addMessage("bot", "Analyzing... ⏳");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/classify", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();

      if (data.error) {
        addMessage("error", `❌ ${data.error}`);
      } else {
        addMessage("bot", `✅ Detected: **${data.class}** ♻️`);
        // addMessage("bot", `📊 Confidence: ${data.confidence}`);
        addMessage("bot", `💡 Recycling Tip: ${data.tip}`);
      }
    } catch (err) {
      console.error("Error:", err);
      addMessage("error", "❌ Could not connect to backend. Check Flask.");
    }

    setInput("");
    setImage(null);
    setFileName("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-layout">
      {/* Left: Chatbot GIF */}
      <div className="chatbot-side">
        <img src={botGif} alt="Chatbot" className="chatbot-img" />
      </div>

      {/* Right: Chat UI */}
      <div className="classifier-container">
        <h2>Waste Classifier & Chatbot</h2>

        <div className="chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          {/* File Upload */}
          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="fileUpload" className="upload-btn">📂 Upload</label>
          {fileName && <span className="file-name">{fileName}</span>}

          {/* Text input */}
          <input
            type="text"
            placeholder="Ask me about recycling..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default WasteClassifier;
