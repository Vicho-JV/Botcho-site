const chatContainer = document.getElementById('chatBox');
const minimizeBtn = document.getElementById('minimizeBtn');
const chatBody = document.getElementById('chatBody');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const userInput = document.getElementById('userInput');
const messages = document.getElementById('messages');

function toggleChat() {
    const isNowMin = chatContainer.classList.toggle('minimized');
    chatBody.classList.toggle('hidden', isNowMin);
    minimizeBtn.textContent = isNowMin ? '+' : '–';
}

minimizeBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleChat();
});
chatContainer.addEventListener('click', () => {
    if (chatContainer.classList.contains('minimized')) {
        toggleChat();
    }
});

function typeEffect(el, text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        const iv = setInterval(() => {
            if (i < text.length) {
                el.textContent += text.charAt(i++);
                messages.scrollTop = messages.scrollHeight;
            } else {
                clearInterval(iv);
                resolve();
            }
        }, speed);
    });
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Show user message
    const uRow = document.createElement('div');
    uRow.className = 'message-row user';
    const uMsg = document.createElement('div');
    uMsg.className = 'message user';
    uMsg.textContent = text;
    uRow.appendChild(uMsg);
    messages.appendChild(uRow);
    messages.scrollTop = messages.scrollHeight;
    userInput.value = '';

    // Show bot typing indicator
    const row = document.createElement('div');
    row.className = 'message-row bot';
	const avatar = document.createElement('img');
	avatar.src = 'logoOriginalno.png';         // Your Botcho logo
	avatar.alt = 'Botcho Bot';
	avatar.className = 'avatar bot-avatar';    // Add bot-avatar for styling
    const b = document.createElement('div');
    b.className = 'message bot';
    row.appendChild(avatar);
    row.appendChild(b);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;

    try {
        const page_url = window.location.href;
        let sessionId = sessionStorage.getItem("chat_session_id");

        let userId = localStorage.getItem("chat_user_id");
        if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem("chat_user_id", userId);
        }

        if (!sessionId) {
            sessionId = crypto.randomUUID();
            sessionStorage.setItem("chat_session_id", sessionId);
        }

        const res = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: text,
                page_url: page_url,
                session_id: sessionId,
                user_id: userId
            })
        });
        const data = await res.json();
        const reply = data.response || 'Unable to get response from server';
        await typeEffect(b, reply, 40);
    } catch (err) {
        console.error(err);
        await typeEffect(b, 'Sorry, something went wrong.', 40);
    }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

// --------- Web Speech API Integration for Bulgarian ---------
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "bg-BG";          // Bulgarian
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        micBtn.disabled = true;
        micBtn.classList.add('recording'); // optional, to style “listening” state
    };

    recognition.onresult = (event) => {
        const lastIndex = event.results.length - 1;
        const transcript = event.results[lastIndex][0].transcript;
        userInput.value = transcript;
    };

    recognition.onerror = (err) => {
        console.error("Recognition error:", err.error);
        micBtn.disabled = false;
        micBtn.classList.remove('recording');
    };

    recognition.onend = () => {
        micBtn.disabled = false;
        micBtn.classList.remove('recording');
        if (userInput.value.trim()) {
            sendMessage();
        }
    };

    micBtn.addEventListener('click', () => {
        userInput.placeholder = "Говорете сега…";
        recognition.start();
    });
} else {
    micBtn.disabled = true;
    micBtn.title = "Този браузър не поддържа разпознаване на говор.";
}