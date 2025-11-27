
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
function applyLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    el.innerHTML = translations[lang][el.dataset.key];
  });

  const toggleBtn = document.getElementById("langToggle");
  const nextLang = lang === 'en' ? 'bg' : 'en';
  const nextFlag = nextLang === 'en' ? 'flagsen' : 'flagsbg';

  toggleBtn.innerHTML = `
    <img src="${nextFlag}.png" alt="${nextLang.toUpperCase()} Flag" id="langFlag" style="width: 20px; height: auto; vertical-align: middle; margin-right: 6px;">
    ${nextLang.toUpperCase()}
  `;

  document.documentElement.lang = lang;
}
let currentLang = localStorage.getItem("lang") || "bg";
applyLanguage(currentLang);  // Ensure it applies on first load

document.getElementById("langToggle").addEventListener("click", e => {
  e.preventDefault();
  let lang = localStorage.getItem("lang") || "bg";
  lang = lang === "bg" ? "en" : "bg";
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
});

// ── CUSTOMIZATION CHATBOT DEMO ──qwfq

function hideAllOptionPanels() {
  const panels = [
    'colorOptions',
    'fontOptions',
    'layoutOptions',
    'icon-options',
    'bubbleShapeOptions',
    'avatarShapeOptions',
    'shadowOptions'
  ];
  panels.forEach(id => document.getElementById(id)?.classList.add('hidden'));

  document.querySelectorAll('.customization-buttons button').forEach(btn => {
    btn.classList.remove('active');
  });
}

function highlightActiveButton(id) {
  document.getElementById(id)?.classList.add('active');
}

function toggleColor() {
  const panel = document.getElementById('colorOptions');
  const isHidden = panel.classList.contains('hidden');
  hideAllOptionPanels();
  if (isHidden) {
    panel.classList.remove('hidden');
    highlightActiveButton('colorBtn');
  }
}

function toggleFont() {
  const panel = document.getElementById('fontOptions');
  const isHidden = panel.classList.contains('hidden');
  hideAllOptionPanels();
  if (isHidden) {
    panel.classList.remove('hidden');
    highlightActiveButton('fontBtn');
  }
}

function toggleLayout() {
  const panel = document.getElementById('layoutOptions');
  const isHidden = panel.classList.contains('hidden');
  hideAllOptionPanels();
  if (isHidden) {
    panel.classList.remove('hidden');
    highlightActiveButton('layoutBtn');
  }
}

function toggleSendIcon() {
  const panel = document.getElementById('icon-options');
  const isHidden = panel.classList.contains('hidden');
  hideAllOptionPanels();
  if (isHidden) {
    panel.classList.remove('hidden');
    highlightActiveButton('sendIconBtn');
  }
}

function toggleShape() {
  const panel = document.getElementById('bubbleShapeOptions');
  const isHidden = panel.classList.contains('hidden');
  hideAllOptionPanels();
  if (isHidden) {
    panel.classList.remove('hidden');
    highlightActiveButton('shapeBtn');
  }
}

function toggleAvatar() {
  const panel = document.getElementById('avatarShapeOptions');
  const isHidden = panel.classList.contains('hidden');
  hideAllOptionPanels();
  if (isHidden) {
    panel.classList.remove('hidden');
    highlightActiveButton('avatarBtn');
  }
}

function toggleShadow() {
  const panel = document.getElementById('shadowOptions');
  const isHidden = panel.classList.contains('hidden');
  hideAllOptionPanels();
  if (isHidden) {
    panel.classList.remove('hidden');
    highlightActiveButton('shadowBtn');
  }
}

function selectColor(color) {
  const demo = document.getElementById('customDemo');
  demo.classList.remove('theme-blue', 'theme-green', 'theme-red', 'theme-dark');
  demo.classList.add('theme-' + color);
  document.getElementById('colorOptions').classList.add('hidden');
  document.getElementById('colorBtn').classList.remove('active');
}

function selectFont(font) {
  document.getElementById('customDemo').style.fontFamily = font;
  document.getElementById('fontOptions').classList.add('hidden');
  document.getElementById('fontBtn').classList.remove('active');
}

function selectLayout(layout) {
  const demo = document.getElementById('customDemo');
  demo.classList.remove('layout-rounded', 'layout-compact');
  if (layout === 'rounded') demo.classList.add('layout-rounded');
  if (layout === 'compact') demo.classList.add('layout-compact');
  document.getElementById('layoutOptions').classList.add('hidden');
  document.getElementById('layoutBtn').classList.remove('active');
}

function setSendIcon(type) {
  const sendBtn = document.querySelector('#customDemo .send-btn');
  const icons = {
    plane: '<i class="fas fa-paper-plane"></i>',
    arrow: '<i class="fas fa-arrow-right"></i>',
    bolt: '<i class="fas fa-bolt"></i>'
  };
  if (icons[type]) {
    sendBtn.innerHTML = icons[type];
  }
}

function selectShape(shape) {
  const demo = document.getElementById('customDemo');
  demo.classList.remove('bubble-rounded', 'bubble-square', 'bubble-pill');
  demo.classList.add('bubble-' + shape);
  document.getElementById('bubbleShapeOptions').classList.add('hidden');
  document.getElementById('shapeBtn').classList.remove('active');
}

function selectAvatar(style) {
  const demo = document.getElementById('customDemo');
  demo.classList.remove('avatar-round', 'avatar-square', 'avatar-hidden');
  demo.classList.add('avatar-' + style);
  document.getElementById('avatarShapeOptions').classList.add('hidden');
  document.getElementById('avatarBtn').classList.remove('active');
}

function selectShadow(level) {
  const demo = document.getElementById('customDemo');
  demo.classList.remove('shadow-none', 'shadow-soft', 'shadow-deep');
  demo.classList.add('shadow-' + level);
  document.getElementById('shadowOptions').classList.add('hidden');
  document.getElementById('shadowBtn').classList.remove('active');
}

function toggleCustomChat() {
  const demo = document.getElementById("customDemo");
  const body = document.getElementById("customChatBody");
  const isMinimized = demo.classList.toggle("minimized");
  body.classList.toggle("hidden", isMinimized);
  demo.querySelector(".minimize-btn").textContent = isMinimized ? '+' : '–';
}

document.getElementById("customDemo").addEventListener("click", (e) => {
  const demo = document.getElementById("customDemo");
  if (!demo.classList.contains("minimized")) return;
  if (e.target.closest(".minimize-btn")) return;
  toggleCustomChat();
});

function sendCustomMessage() {
  const input = document.getElementById("customInput");
  const messages = document.getElementById("customMessages");
  const text = input.value.trim();
  if (!text) return;

  const userRow = document.createElement("div");
  userRow.className = "message-row user";
  userRow.innerHTML = `<div class="message user">${text}</div>`;
  messages.appendChild(userRow);

  const botRow = document.createElement("div");
  botRow.className = "message-row bot";
  botRow.innerHTML = `
    <img src="logoOriginalno.png" class="avatar">
    <div class="message bot">Chatbot response</div>
  `;
  messages.appendChild(botRow);

  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}
