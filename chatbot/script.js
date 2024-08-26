const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const botMessage = document.getElementById('bot-message');
const closeBtn = document.querySelector('.close-btn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		sendMessage();
	}
});

closeBtn.addEventListener('click', () => {
	document.querySelector('.chat-container').style.display = 'none';
});

function sendMessage() {
	const userText = userInput.value;
	if (userText !== '') {
		// Display user message
		const userMessage = document.createElement('div');
		userMessage.classList.add('message');
		userMessage.textContent = userText;
		document.querySelector('.chat-messages').appendChild(userMessage);

		// Get bot response
		const botResponse = getBotResponse(userText);
		botMessage.textContent = botResponse;

		// Display bot message
		const botMessageDiv = document.createElement('div');
		botMessageDiv.classList.add('message');
		botMessageDiv.textContent = botResponse;
		document.querySelector('.chat-messages').appendChild(botMessageDiv);

		// Clear user input
		userInput.value = '';
	}
}

function getBotResponse(userText) {
	// Simple bot response logic
	if (userText.includes('hello')) {
		return 'Hi! How can I help you?';
	} else if (userText.includes('help')) {
		return 'I can assist you with any questions or concerns.';
	} else if (userText.includes('how are you')) {
		return 'I\'m doing well, thanks for asking!';
	} else if (userText.includes('what is your name')) {
		return 'I\'m an AI chatbot, you can call me Assistant!';
	} else if (userText.includes('thank you')) {
		return 'You\'re welcome! It was my pleasure to assist you.';
	} else if (userText.includes('goodbye')) {
		return 'Goodbye! Have a great day!';
	} else if (userText.includes('joke')) {
		return 'Why couldn\'t the bicycle stand up by itself? Because it was two-tired!';
	} else if (userText.includes('weather')) {
		window.open('https://www.accuweather.com/', '_blank');
		return 'Opening weather website...';
	} else if (userText.includes('google')) {
		window.open('https://www.google.com/', '_blank');
		return 'Opening Google...';
	} else if (userText.includes('youtube')) {
		window.open('https://www.youtube.com/', '_blank');
		return 'Opening YouTube...';
	} else if (userText.includes('facebook')) {
		window.open('https://www.facebook.com/', '_blank');
		return 'Opening Facebook...';
	} else if (userText.includes('twitter')) {
		window.open('https://www.twitter.com/', '_blank');
		return 'Opening Twitter...';
	} else if (userText.includes('instagram')) {
		window.open('https://www.instagram.com/', '_blank');
		return 'Opening Instagram...';
	} else if (userText.includes('linkedin')) {
		window.open('https://www.linkedin.com/', '_blank');
		return 'Opening LinkedIn...';
	} else {
		return 'I didn\'t understand that. Can you please rephrase?';
	}
}