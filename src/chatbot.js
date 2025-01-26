import React from "react";
import { useLocation } from "react-router-dom";
import "./chatbot.css";

function Chatbot() {
  const location = useLocation();
  const { selectedField, response } = location.state || {};  // Get initial field and response from state
  
  // Set up state for conversation
  const [messages, setMessages] = React.useState([
    { sender: "bot", content: response || "Loading..." },  // Initial message from bot
  ]);
  const [userInput, setUserInput] = React.useState("");  // To hold user input

  // Function to handle user input submission
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;  // Don't send if input is empty

    // Add user message to the conversation
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", content: userInput },
    ]);

    // Send user message to the server
    try {
      const response = await fetch("http://localhost:5000/get-chat-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from bot");
      }
      const data = await response.json();
      const botMessage = data.response || "Sorry, I couldn't understand that.";

      // Add bot response to the conversation
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: botMessage },
      ]);

      setUserInput("");  // Clear input field after sending message
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: "Something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <main>
      <nav className="outer-col-1">Navigation</nav>
      <div className="outer-col-2">
        <header>Header</header>
        <div className="inner-row">
          <div className="inner-col">
            <article>
              <h2>Chatbot: {selectedField || "None"}</h2>
              <div className="chat-container">
                {/* Display messages */}
                <div className="chat-history">
                  {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                      <p>{msg.content}</p>
                    </div>
                  ))}
                </div>

                {/* Input and send message section */}
                <div className="message-input">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button onClick={handleSendMessage}>Send</button>
                </div>
              </div>
            </article>
            <footer>Footer</footer>
          </div>
          <aside>Aside</aside>
        </div>
      </div>
    </main>
  );
}

export default Chatbot;
