import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import "./styles/recommender.css"; // You can create this CSS file for styling
import axios from 'axios';

const About = () => {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [responding, setResponding] = useState(false);

	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = () => {
		const position = window.scrollY || window.pageYOffSet;
		setScrollPosition(position);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleSendMessage = async () => {
		if (input.trim() && !responding) {
			// Add the user's message
			setMessages((prevMessages) => [...prevMessages, { text: input, sender: "user" }]);
			setInput(""); // Clear input after sending

			// Scroll to the bottom after sending the message
			setTimeout(() => {
				window.scrollTo(0, document.body.scrollHeight);
			}, 0);

			// Start API request
			setResponding(true);

			console.log(window.location.origin + '/api/messages');
			console.log(input);

			try {
				
				const response = await fetch(window.location.origin + '/api/messages', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ message: input }), // Adjust based on your API structure
				});
	
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
	
				const data = await response.json();
				const aiResponse = data; // Adjust based on your API response structure
	
				setMessages((prevMessages) => {
					const newMessages = [
						...prevMessages,
						{ text: aiResponse, sender: "bot" },
					];
					return newMessages.length > 6 ? newMessages.slice(newMessages.length - 6) : newMessages;
				});
			} catch (error) {
				console.error('Error calling AI API:', error);
				setMessages((prevMessages) => [
					...prevMessages,
					{ text: "Sorry, I couldn't process your request. Please try again.", sender: "bot" }
				]);
			} finally {
				setInput(''); // Clear input field
				setResponding(false);
			}
		}
	};



	return (
		<React.Fragment>
			<Helmet>
				<title>Chatbot</title>
			</Helmet>
			<div className="page-content">
				<NavBar active="chatbot" />
				<div className="chatbot-container">
					<h1 className="chatbot-title">Chat Bot</h1>
					<img
						src="MovieBot.png" // Replace with your image path
						alt="Chatbot"
						className="chatbot-image"
					/>
					<div className="chatbox">
						<div className="messages">
							{messages.map((msg, index) => (
								<div key={index} className={`message ${msg.sender}`}>
									{msg.text}
								</div>
							))}
						</div>
						<div className="input-container">
							<input
								type="text"
								value={input}
								onChange={handleInputChange}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleSendMessage();
									}
								}}
								className="chat-input"
								placeholder="Type your message..."
							/>
							<button onClick={handleSendMessage} className="send-button">
								Send
							</button>
						</div>
					</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default About;
