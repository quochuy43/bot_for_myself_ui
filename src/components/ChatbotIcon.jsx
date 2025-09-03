import profileImg from "../assets/photo/huy.jpg";

const ChatbotIcon = () => {
    return (
        <img
            src={profileImg}
            alt="Chatbot Icon"
            width={43}
            height={43}
            style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #fbaa5f",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)", // Đổ bóng nhẹ
            }}
        />
    );
};

export default ChatbotIcon;
