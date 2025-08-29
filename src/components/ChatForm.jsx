import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        // Tạo history mới để dùng cho cả UI và API
        const newHistory = [...chatHistory, { role: "user", text: userMessage }];

        // Cập nhật UI (user + thinking)
        setChatHistory([
            ...newHistory,
            { role: "model", text: "Thinking..." },
        ]);

        // Gọi API với history mới
        generateBotResponse(newHistory);
    };

    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Message..."
                className="message-input"
                required
            />
            <button class="material-symbols-outlined">send</button>
        </form>
    );
};

export default ChatForm;
