import { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { v4 as uuidv4 } from "uuid";
import TextType from "./react-bits/TextType";

const App = () => {
  // user id for tracking user sessions 
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    // Kiểm tra xem đã có user_id lưu trong localStorage chưa
    let storedId = localStorage.getItem("user_id");
    if (!storedId) {
      storedId = uuidv4(); // Tạo ID mới
      localStorage.setItem("user_id", storedId);
    }
    setUserId(storedId);
  }, []);

  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef()

  const generateBotResponse = async (history) => {

    // Helper function to update chat history
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter(msg => msg.text !== "Đợi một xíu..."),
        { role: "model", text, isError }]
      )
    }

    // get latest user message
    const lastUserMessage = history.filter(msg => msg.role === "user").pop()?.text || ""

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        message: lastUserMessage
      })
    }

    try {
      const response = await fetch("https://chat-about-lvqh.onrender.com/chat", requestOptions);
      const data = await response.json()
      if (!response.ok) throw new Error(data.error?.message || "Something went wrong")

      const apiResponseText = data.answer?.trim() || "No answer received"
      updateHistory(apiResponseText)
    } catch (error) {
      updateHistory(error.message, true)
    }
  }

  useEffect(() => {
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" })
  }, [chatHistory])

  return (
    <div className="container">
      <div className="chatbot-popup">

        {/* Header */}
        <div className="chatbot-header">
          <div className="header-info">
            <ChatbotIcon />
            <TextType
              className="logo-text"
              text={["Hi fennnnn", "I'm Cúc Huyyyyy", "Ask me anything you wonder..."]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </div>
        </div>

        {/* Body */}
        <div ref={chatBodyRef} className="chat-body">
          {/* Render chat history */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Footer*/}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  )
}

export default App;