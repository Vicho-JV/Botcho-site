// Language switcher script with localStorage support
document.addEventListener('DOMContentLoaded', () => {
  // Read whichever key is already set, default to 'bg'
  let currentLang = localStorage.getItem('siteLang') || localStorage.getItem('lang') || 'bg';

  const toggleLink = document.getElementById('langToggle');
  // func.js usually injects an <img> into #langToggle; guard in case it's not there
  let flagIcon = toggleLink ? toggleLink.querySelector('img') : null;

  function setLanguage(lang) {
    if (lang === 'en') {
      document.querySelectorAll('.lang-bg').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.lang-en').forEach(el => el.style.display = '');
      if (flagIcon) {
        flagIcon.src = 'flag-bg.png';
        flagIcon.alt = 'Bulgarian';
      }
      document.documentElement.lang = 'en';
    } else {
      document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.lang-bg').forEach(el => el.style.display = '');
      if (flagIcon) {
        flagIcon.src = 'flag-en.png';
        flagIcon.alt = 'English';
      }
      document.documentElement.lang = 'bg';
    }

    // Update placeholder of the main site chat (bottom-right widget)
    const chatInput = document.getElementById('userInput');
    if (chatInput) {
      chatInput.placeholder = (lang === 'en')
        ? 'Ask anything you want'
        : 'Попитайте каквото желаете';
    }

    // Update placeholder of the Products page demo chat
    const customInput = document.getElementById('customInput');
    if (customInput) {
      customInput.placeholder = (lang === 'en')
        ? 'Type a message...'
        : 'Напиши съобщение...';
    }

    // Update tooltips (main widget)
    const sendBtnEl = document.getElementById('sendBtn');
    if (sendBtnEl) sendBtnEl.title = (lang === 'en' ? 'Send' : 'Изпрати');
    const micBtnEl = document.getElementById('micBtn');
    if (micBtnEl) micBtnEl.title = (lang === 'en' ? 'Speak' : 'Говори');
    const bookBtnEl = document.getElementById('bookBtn');
    if (bookBtnEl) bookBtnEl.title = (lang === 'en' ? 'Book Appointment' : 'Запази час');

    // Keep both keys in sync so func.js and this file agree
    localStorage.setItem('siteLang', lang);
    localStorage.setItem('lang', lang);
    currentLang = lang;

    // Re-grab flagIcon in case func.js just injected it
    if (!flagIcon && toggleLink) {
      flagIcon = toggleLink.querySelector('img');
    }
  }

  // Apply saved preference on page load
  setLanguage(currentLang);

  // Toggle on click
  if (toggleLink) {
    toggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage(currentLang === 'bg' ? 'en' : 'bg');
    });
  }
});