import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Css/ChatBot.css";

export default function ChatBot() {
    
    const [faqData, setFaqData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/faqs')
        .then(response => response.json())
        .then(data => setFaqData(data))
        .catch(error => console.error('Error:', error));
    }, [])

    const [messages, setMessages] = useState([
        { type: "bot", text: "Hello! How Can I Help You" },
    ]);
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() !== "") {
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: "user", text: input },
            ]);

            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: "bot", text: "Thanks for reaching out! I will check your question and get back to you as soon as possible." },
                ]);
            }, 1000);

            setInput("");
        }
    };

    const handleFaqClick = (question, answer) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: "user", text: question },
        ]);

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: "bot", text: answer },
            ]);
        }, 500);
    };

    const handleClick = () => {
        window.history.back();
    };

    return (
        <div className="chatbot-container">
            <div className="faq-section">
                <div className='row p-1 fixed-top justify-content-start align-items-center position-relative'>
                    <button className="goBack col-lg-1 col-md-2 text-center p-2" onClick={handleClick}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                </div>
                <hr />
                <h3>Frequently Asked Questions</h3>
                <motion.ul>
                    {faqData.map((item, index) => (
                        <motion.li
                            key={index}
                            className="faq-item"
                            onClick={() => handleFaqClick(item.ques, item.answer)}
                            whileHover={{ scale: 1.05 }} // Add hover effect
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            {item.ques}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>

            <div className="chat-section">
                <h2>Chat Bot</h2>
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            className={`message ${msg.type === "bot" ? "bot-message" : "user-message"}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }} // Delay each message appearance
                        >
                            {msg.text}
                        </motion.div>
                    ))}
                </div>

                <form className="chat-form" onSubmit={handleSubmit}>
                    <motion.input
                        type="text"
                        placeholder="Write Your Message Here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="chat-input"
                        whileFocus={{ scale: 1.05 }} // Slight scaling when focused
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.button
                        type="submit"
                        className="send-button"
                        whileHover={{ scale: 1.1 }} // Hover effect on send button
                        whileTap={{ scale: 0.95 }} // Tap effect on send button
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </motion.button>
                </form>
            </div>
        </div>
    );
}