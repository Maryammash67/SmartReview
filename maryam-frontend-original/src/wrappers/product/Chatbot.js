import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { id } = useParams();
  const location = useLocation();

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessage = { role: "user", content: userInput };
    const updatedChatHistory = [...chatHistory, newMessage];
    setChatHistory(updatedChatHistory);
    setUserInput("");

    // alert(`Answer: ${id}`);

    const productData = await axios.get(
      `http://localhost:5005/api/v1/product/getproduct/${id}`
    );

    // alert(productData: ${productData.data.});
    // alert(
    //   `Full response: ${JSON.stringify(
    //     productData.data.full_description,
    //     null,
    //     2
    //   )}`
    // );

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/chatbot",
        {
          description: productData.data.full_description,
          question: userInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from the backend:", response);

      // Alert the answer only
      // alert(`Answer: ${response.data.answer}`);

      // Alert the entire response data (formatted)
      // alert(`Full response: ${JSON.stringify(response.data, null, 2)}`);

      const botMessage = response.data.answer;
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "bot", content: botMessage },
      ]);
    } catch (error) {
      console.error("Error calling chatbot API:", error);
    }
  };

  useEffect(() => {
    try {

      axios.post("http://127.0.0.1:5000/clear-history");
      

      // console.log("Request successful:", backendHistoryClearStatus);
    } catch (error) {
      console.error("Error during request:", error);
    }
  }, [location.pathname]); // Effect runs whenever id changes

  return (
    <div
      style={{
        backgroundColor: "#e0f7fa",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <h4>Chat with Us About This Product</h4>
      <p>
        Have questions about the product? Ask us directly based on the reviews
        and we'll assist you promptly!
      </p>
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          textAlign: "left",
        }}
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "10px 0",
            }}
          >
            <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your question..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;