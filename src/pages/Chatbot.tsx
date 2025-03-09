import { useState, useEffect, useRef } from "react";
import TypingIndicator from "../Indicator";
import Markdown from "react-markdown";
import { url } from "../api/clientApi";

interface Message {
    text: string;
    sender: "bot" | "user";
}

const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef<any>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const startStream = () => {
        if (!input.trim()) return;

        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");
        setTyping(true);

        let botResponse = "";
        const eventSource = new EventSource(`${url}/stream?input=${input}`);

        eventSource.onmessage = (event) => {
            if (event.data === "[DONE]") {
                eventSource.close();
                setTyping(false);
                return;
            }

            try {
                const responseData = JSON.parse(event.data);
                botResponse += responseData.answer;

                setMessages((prev) => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage?.sender === "bot") {
                        return [
                            ...prev.slice(0, -1),
                            { text: botResponse, sender: "bot" },
                        ];
                    } else {
                        return [...prev, { text: botResponse, sender: "bot" }];
                    }
                });

                setTyping(false);
            } catch (err) {
                console.error("Invalid JSON:", event.data);
            }
        };

        eventSource.onerror = () => {
            console.error("Stream error!");
            eventSource.close();
            setTyping(false);
        };
    };

    return (
        <div className="w-full h-screen pt-10 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl h-[85vh] bg-white shadow-xl rounded-md flex flex-col px-5 py-3">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom">
                    {messages?.length === 0 ? (
                        <div className="flex justify-center items-center h-full text-2xl text-gray-400">
                            <p>How can I assist you?</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        msg.sender === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-xs p-3 rounded-lg shadow-md ${
                                            msg.sender === "user"
                                                ? "bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-br-none"
                                                : "bg-gray-100 text-gray-800 rounded-bl-none"
                                        }`}
                                    >
                                        <Markdown>{msg.text}</Markdown>
                                    </div>
                                </div>
                            ))}
                            {typing && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input and Send Button */}
                <div className="mt-4 flex gap-3 items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && startStream()}
                        className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-gray-700"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={startStream}
                        className="bg-gradient-to-br from-purple-600 to-blue-500 text-white py-3 px-4 rounded-full hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg"
                    >
                        Ask
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
