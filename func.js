// --- keep your existing element lookups ---
const chatContainer = document.getElementById('chatBox');
const minimizeBtn   = document.getElementById('minimizeBtn');
const chatBody      = document.getElementById('chatBody');
const sendBtn       = document.getElementById('sendBtn');
const micBtn        = document.getElementById('micBtn');
const userInput     = document.getElementById('userInput');
const messages      = document.getElementById('messages');

// Safeguard chat toggle
function toggleChat() {
  if (!chatContainer || !chatBody || !minimizeBtn) return;
  const isNowMin = chatContainer.classList.toggle('minimized');
  chatBody.classList.toggle('hidden', isNowMin);
  minimizeBtn.textContent = isNowMin ? '+' : '–';
}

// Attach listeners ONLY if the elements exist on this page
if (minimizeBtn && chatContainer) {
  minimizeBtn.addEventListener('click', e => { e.stopPropagation(); toggleChat(); });
  chatContainer.addEventListener('click', () => {
    if (chatContainer.classList.contains('minimized')) toggleChat();
  });
}

if (sendBtn && userInput && messages) {
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
}

// Speech recognition: guard too
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (micBtn && SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "bg-BG";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => { micBtn.disabled = true; micBtn.classList.add('recording'); };
  recognition.onresult = (event) => {
    const lastIndex = event.results.length - 1;
    const transcript = event.results[lastIndex][0].transcript;
    if (userInput) userInput.value = transcript;
  };
  recognition.onerror = () => { micBtn.disabled = false; micBtn.classList.remove('recording'); };
  recognition.onend = () => {
    micBtn.disabled = false; micBtn.classList.remove('recording');
    if (userInput && userInput.value.trim()) sendMessage();
  };
  micBtn.addEventListener('click', () => {
    if (userInput) userInput.placeholder = "Говорете сега…";
    recognition.start();
  });
} else if (micBtn) {
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
       (function () {
    const N = 7;  // minimum days before booking
    const bookBtn = document.getElementById('bookBtn');
    let appointmentForm = null;

    bookBtn.addEventListener('click', async () => {
        // 0️⃣ show instructions to user
        const instRow = document.createElement('div');
        instRow.className = 'message-row bot';
        const instAvatar = document.createElement('img');
        instAvatar.src = 'logoOriginalno.png'; instAvatar.className = 'avatar';
        const instMsg = document.createElement('div');
        instMsg.className = 'message bot';
        instRow.append(instAvatar, instMsg);
        messages.appendChild(instRow);
        await typeEffect(
          instMsg,
          `You can check if a date is available with the calendar button on the right. If you want to cancel, click the cancel button. Appointments must be booked at least ${N} days before the actual date.`,
          40
        );

        if (appointmentForm) return;  // already open

        // 1️⃣ Build the date/time picker form
        appointmentForm = document.createElement('div');
        appointmentForm.style.display = 'flex';
        appointmentForm.style.flexDirection = 'column';
        appointmentForm.style.gap = '8px';
        appointmentForm.style.margin = '8px';
        appointmentForm.style.padding = '12px';
        appointmentForm.style.background = '#fff';
        appointmentForm.style.borderRadius = '12px';
        appointmentForm.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';

        // Date input
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.id = 'apptDate';
        dateInput.style.padding = '8px';
        dateInput.style.fontSize = '14px';
        dateInput.style.border = '1px solid #ccc';
        dateInput.style.borderRadius = '8px';
        dateInput.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';
        // enforce at least N days in advance
        const today = new Date();
        const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + N);
        dateInput.min = minDate.toISOString().slice(0,10);

        // Time select
        const timeSelect = document.createElement('select');
        timeSelect.id = 'apptTime';
        timeSelect.style.padding = '8px';
        timeSelect.style.fontSize = '14px';
        timeSelect.style.border = '1px solid #ccc';
        timeSelect.style.borderRadius = '8px';
        timeSelect.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';
        for (let h = 8; h <= 18; h++) {
            const hh = `${h.toString().padStart(2,'0')}:00`;
            const opt = document.createElement('option');
            opt.value = hh;
            opt.textContent = hh;
            timeSelect.appendChild(opt);
        }

        // Check Availability button
        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Check Availability';
        confirmBtn.style.padding = '8px 12px';
        confirmBtn.style.fontSize = '14px';
        confirmBtn.style.color = '#fff';
        confirmBtn.style.background = '#007bff';
        confirmBtn.style.border = 'none';
        confirmBtn.style.borderRadius = '8px';
        confirmBtn.style.cursor = 'pointer';
        confirmBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
        confirmBtn.addEventListener('mouseenter', () => confirmBtn.style.background = '#0056b3');
        confirmBtn.addEventListener('mouseleave', () => confirmBtn.style.background = '#007bff');

        const cancelBtn = document.createElement('button');
        cancelBtn.innerHTML = '✖';
        cancelBtn.title = 'Cancel';
        cancelBtn.style.fontSize = '18px';
        cancelBtn.style.color = 'red';
        cancelBtn.style.background = 'transparent';
        cancelBtn.style.border = 'none';
        cancelBtn.style.cursor = 'pointer';

        appointmentForm.append(dateInput, timeSelect, confirmBtn, cancelBtn);
        messages.appendChild(appointmentForm);
        dateInput.focus();

        // Cancel hides the form
        cancelBtn.addEventListener('click', () => {
            appointmentForm.remove();
            appointmentForm = null;
        });

        // Confirm → two‐step flow
        confirmBtn.addEventListener('click', async () => {
            const date = dateInput.value;
            const time = timeSelect.value;
            if (!date || !time) {
                alert('Please select both date and time.');
                return;
            }
            appointmentForm.remove();
            appointmentForm = null;

            // show “Checking availability…” in chat
            const checkRow = document.createElement('div');
            checkRow.className = 'message-row bot';
            const avatar = document.createElement('img');
            avatar.src = 'logoOriginalno.png'; avatar.className = 'avatar';
            const checkMsg = document.createElement('div');
            checkMsg.className = 'message bot';
            checkRow.append(avatar, checkMsg);
            messages.appendChild(checkRow);
            await typeEffect(checkMsg, 'Checking availability…', 40);

            // call backend to check
            const page_url = window.location.href;
            let session_id = sessionStorage.getItem("chat_session_id");
            let user_id    = localStorage.getItem("chat_user_id");
            if (!user_id) {
              user_id = crypto.randomUUID();
              localStorage.setItem("chat_user_id", user_id);
            }
            if (!session_id) {
              session_id = crypto.randomUUID();
              sessionStorage.setItem("chat_session_id", session_id);
            }

            const payload = {
              action: 'checkAvailability',
              date, time,
              page_url, session_id, user_id
            };
            const res = await fetch('https://wuabap3usaf2xfac6cxzayesva0phcsq.lambda-url.eu-north-1.on.aws/chat', {
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (!data.available) {
                await typeEffect(checkMsg,
                   `Sorry, ${date} at ${time} is not available.`, 40);
                return;
            }

            // Slot is free → ask for client info
            const infoRow = document.createElement('div');
            infoRow.className = 'message-row bot';
            const infoMsg = document.createElement('div');
            infoMsg.className = 'message bot';
            infoRow.append(avatar.cloneNode(), infoMsg);
            messages.appendChild(infoRow);
            await typeEffect(infoMsg,
              'Great! Please enter your name and phone number.', 40);

            // Show name/phone form
            showClientForm(date, time);
        });
    });

    // Helper to collect name & phone, then finalize booking
           async function showClientForm(date, time) {
               // 1) Build the form container
               const form = document.createElement('div');
               form.style.display = 'flex';
               form.style.flexDirection = 'column';
               form.style.gap = '8px';
               form.style.margin = '8px';
               form.style.padding = '12px';
               form.style.background = '#fff';
               form.style.borderRadius = '12px';
               form.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';

               // 2) Name input
               const nameInput = document.createElement('input');
               nameInput.id = 'clientName';
               nameInput.placeholder = 'Your name';
               nameInput.style.padding = '8px';
               nameInput.style.fontSize = '14px';
               nameInput.style.border = '1px solid #ccc';
               nameInput.style.borderRadius = '8px';
               nameInput.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';

               // 3) Phone input: digits only, max length 10
               const phoneInput = document.createElement('input');
               phoneInput.id = 'clientPhone';
               phoneInput.placeholder = 'Phone number';
               phoneInput.setAttribute('maxlength', '10');
               phoneInput.style.padding = '8px';
               phoneInput.style.fontSize = '14px';
               phoneInput.style.border = '1px solid #ccc';
               phoneInput.style.borderRadius = '8px';
               phoneInput.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';
               phoneInput.addEventListener('input', () => {
                   phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
               });

               // 4) Confirm button
               const submitBtn = document.createElement('button');
               submitBtn.textContent = 'Confirm Booking';
               submitBtn.style.padding = '8px 12px';
               submitBtn.style.fontSize = '14px';
               submitBtn.style.color = '#fff';
               submitBtn.style.background = '#007bff';
               submitBtn.style.border = 'none';
               submitBtn.style.borderRadius = '8px';
               submitBtn.style.cursor = 'pointer';
               submitBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
               submitBtn.addEventListener('mouseenter', () => submitBtn.style.background = '#0056b3');
               submitBtn.addEventListener('mouseleave', () => submitBtn.style.background = '#007bff');


               // 5) Assemble and insert into chat
               form.append(nameInput, phoneInput, submitBtn);
               messages.appendChild(form);
               nameInput.focus();

               // 6) Handle submission
               submitBtn.addEventListener('click', async () => {
                   const name = nameInput.value.trim();
                   const phone = phoneInput.value.trim();

                   if (!name) {
                       alert('Name is required.');
                       return;
                   }
                   if (!/^\d{10}$/.test(phone)) {
                       alert('Phone number must be exactly 10 digits.');
                       return;
                   }

                   // Remove form
                   form.remove();

                   // Rebuild context
                   const page_url = window.location.href;
                   let session_id = sessionStorage.getItem('chat_session_id');
                   let user_id = localStorage.getItem('chat_user_id');
                   if (!user_id) {
                       user_id = crypto.randomUUID();
                       localStorage.setItem('chat_user_id', user_id);
                   }
                   if (!session_id) {
                       session_id = crypto.randomUUID();
                       sessionStorage.setItem('chat_session_id', session_id);
                   }

                   // Send booking request
                   const bookPayload = {
                       action: 'bookAppointment',
                       date, time, name, phone,
                       page_url, session_id, user_id
                   };
                   const res = await fetch('https://wuabap3usaf2xfac6cxzayesva0phcsq.lambda-url.eu-north-1.on.aws/chat', {
                       method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify(bookPayload)
                   });
                   const d2 = await res.json();

                   // Show result фдбдфбфдбфдб
                   const row2 = document.createElement('div');
                   row2.className = 'message-row bot';
                   const avatar2 = document.createElement('img');
                   avatar2.src = 'logoOriginalno.png'; avatar2.className = 'avatar';
                   const resultMsg = document.createElement('div');
                   resultMsg.className = 'message bot';
                   row2.append(avatar2, resultMsg);
                   messages.appendChild(row2);

                   if (d2.booked) {
                       await typeEffect(
                           resultMsg,
                           `All set—see you on ${date} at ${time}, ${name}!`,
                           40
                       );
                   } else {
                       await typeEffect(
                           resultMsg,
                           `Sorry, could not book your slot.`,
                           40
                       );
                   }
               });
           }
})();
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
