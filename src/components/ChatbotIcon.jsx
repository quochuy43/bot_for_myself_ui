import profileImg from "../assets/photo/profile_1.jpg";

const ChatbotIcon = () => {
    return (
        <img
            src={profileImg}
            alt="Chatbot Icon"
            width={43}
            height={43}
            style={{ borderRadius: "50%" }}
        />
    );
};

export default ChatbotIcon;
