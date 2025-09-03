import profileImg from "../assets/photo/huy.jpg";

const ChatbotIcon = ({ size = "large" }) => {
    const sizeConfig = {
        large: { width: 43, height: 43 },
        small: { width: 33, height: 33 }
    };

    const currentSize = sizeConfig[size];

    return (
        <img
            src={profileImg}
            alt="Chatbot Icon"
            width={currentSize.width}
            height={currentSize.height}
            style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #fbaa5f",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                flexShrink: 0
            }}
        />
    );
};

export default ChatbotIcon;