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
    avatar.src = 'logoOriginalno.png';
    avatar.alt = 'Botcho Bot';
    avatar.className = 'avatar bot-avatar';
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
    recognition.lang = "bg-BG";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        micBtn.disabled = true;
        micBtn.classList.add('recording');
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

// Language toggle system
const translations = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navProducts: "Products",
    navContact: "Contact",
    heroHeading: "Innovate with Botcho",
    heroText: "We offer modern solutions for today’s businesses.",
    heroBtn: "Our Products",
    featuresHeading: "Our Services",
    servicesDescription: "Botcho is an intelligent AI chatbot, created specifically for the needs of Bulgarian businesses. It automates customer service on your website, responds instantly to questions, saves time, and improves the user experience – all with a clean design tailored to your vision.",
    featureTitle1: "Fully tailored to your brand",
    featureText1: "Botcho looks and behaves exactly as you want – with colors, style, and tone that reflect your business's identity.",
    featureTitle2: "Effortless integration",
    featureText2: "Botcho integrates directly into your website with no technical knowledge needed. You get everything you need and we support you at every step.",
    featureTitle3: "More time, fewer questions",
    featureText3: "Botcho handles customer questions so that you and your team can focus on more important tasks.",
    aboutHeading: "About Botcho",
    aboutPara1: "<strong>Botcho</strong> is a small, independent project created with the aim of helping businesses automate their customer communication. Instead of wasting time answering the same questions every day, we offer a simple and effective chatbot that understands both Bulgarian and English, and can be trained specifically for your site and content.",
    aboutPara2: "We are not a big company or a software corporation. But we work fast, listen carefully, and strive to build real value with every integration. Our goal is not just to sell a product, but to save you time and effort by building something useful and tailored to your needs.",
    contactHeading: "Contact Us",
    contactIntro: "Have questions or comments? We’d be happy to hear from you. Fill out the form below to reach the Botcho team.",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "Send Message",
    addressLine: "Address: Sofia, 'Primerna' St. №1",
    emailLine: "Email: info@botcho.com",
    phoneLine: "Phone: +359 88 123 4567",
    productHeading: "Botcho Chatbot for Business",
    productIntro: "Botcho is an intelligent chatbot created specifically for small and medium businesses in Bulgaria. It automates communication with customers, understands Bulgarian and English, and is easily configured to your needs. The chatbot can integrate into your website and works 24/7, answering the most common questions on your behalf.",
    demoUser1: "<span>User:</span> Hello! What can your chatbot do?",
    demoBot1: "<span>Botcho:</span> Hello! I can answer questions, provide information about products, direct you to the right contacts, and much more. I’m available 24/7!",
    demoUser2: "<span>User:</span> Does it support the Bulgarian language?",
    demoBot2: "<span>Botcho:</span> Yes, I fully understand and can communicate in both Bulgarian and English!",
    demoNote: "* Demonstration of an actual chat",
    featuresTitle: "Key Features:",
    prodFeatureTitle1: "Bilingual support",
    prodFeatureText1: "Bulgarian and English, understands slang and formal language.",
    prodFeatureTitle2: "Easy integration",
    prodFeatureText2: "Installs on any site with just a few clicks.",
    prodFeatureTitle3: "Works 24/7",
    prodFeatureText3: "Your business is always accessible, even outside working hours.",
    prodFeatureTitle4: "Security",
    prodFeatureText4: "Customer data is protected according to all standards.",
    footerRights: "© 2025 Botcho. All rights reserved."
  }
};
translations.bg = {};
document.querySelectorAll("[data-key]").forEach(el => {
  translations.bg[el.dataset.key] = el.innerHTML;
});
let currentLang = localStorage.getItem("lang") || "bg";
function applyLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    el.innerHTML = translations[lang][el.dataset.key];
  });

  const toggleBtn = document.getElementById("langToggle");
  const nextLang = lang === 'en' ? 'bg' : 'en';
  const nextFlag = nextLang === 'en' ? 'en' : 'bg';
  toggleBtn.innerHTML = `
    <img src="flags${nextFlag}.png" alt="${nextLang.toUpperCase()} Flag" id="langFlag" style="width: 20px; height: auto; vertical-align: middle; margin-right: 6px;">
    ${nextLang.toUpperCase()}
  `;

  document.documentElement.lang = lang;
}
if (currentLang === "en") {
  applyLanguage("en");
} else {
	 applyLanguage("bg");
}
  document.getElementById("langToggle").textContent = "EN";
}
document.getElementById("langToggle").addEventListener("click", e => {
  e.preventDefault();
  let lang = localStorage.getItem("lang") || "bg";
  if (lang === "bg") {
    localStorage.setItem("lang", "en");
    applyLanguage("en");
  } else {
    localStorage.setItem("lang", "bg");
    applyLanguage("bg");
  }
});