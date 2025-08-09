// Language switcher for Products page customizer
// Works alongside func.js (which controls [data-key] text & #langToggle)
document.addEventListener('DOMContentLoaded', () => {
  const toggleLink = document.getElementById('langToggle');
  let flagIcon = toggleLink ? toggleLink.querySelector('img') : null;

  // Show/hide .lang-bg / .lang-en and update placeholders/tooltips
  function setLanguageVisuals(lang) {
    const showBG = (lang !== 'en');
    document.querySelectorAll('.lang-bg').forEach(el => el.style.display = showBG ? '' : 'none');
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = showBG ? 'none' : '');

    // Update html lang
    document.documentElement.lang = showBG ? 'bg' : 'en';

    // Update flag icon only if it exists (some pages don’t have it)
    if (flagIcon) {
      if (showBG) {
        flagIcon.src = 'flag-en.png';
        flagIcon.alt = 'English';
      } else {
        flagIcon.src = 'flag-bg.png';
        flagIcon.alt = 'Bulgarian';
      }
    }

    // Main floating chat widget placeholder & titles
    const chatInput = document.getElementById('userInput');
    if (chatInput) {
      chatInput.placeholder = showBG ? 'Попитайте каквото желаете' : 'Ask anything you want';
    }
    const sendBtnEl = document.getElementById('sendBtn');
    if (sendBtnEl) sendBtnEl.title = showBG ? 'Изпрати' : 'Send';
    const micBtnEl = document.getElementById('micBtn');
    if (micBtnEl) micBtnEl.title = showBG ? 'Говори' : 'Speak';
    const bookBtnEl = document.getElementById('bookBtn');
    if (bookBtnEl) bookBtnEl.title = showBG ? 'Запази час' : 'Book Appointment';

    // Products demo chat input placeholder
    const customInput = document.getElementById('customInput');
    if (customInput) {
      customInput.placeholder = showBG ? 'Напиши съобщение...' : 'Type a message...';
    }
  }

  // Read whichever key func.js uses; fall back to 'bg'
  function getCurrentLang() {
    return localStorage.getItem('lang') || localStorage.getItem('siteLang') || 'bg';
  }

  // Initial render
  setLanguageVisuals(getCurrentLang());

  // IMPORTANT: do NOT toggle here. Let func.js handle the toggle,
  // then we sync *after* its handler runs.
  if (toggleLink) {
    toggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      // Give func.js a tick to flip localStorage('lang') and update [data-key] text
      setTimeout(() => {
        setLanguageVisuals(getCurrentLang());
        // Re-grab a flag icon if func.js just injected it
        if (!flagIcon) flagIcon = toggleLink.querySelector('img');
      }, 0);
    });
  }

  // Also resync when returning to this page (e.g., from another page that changed the lang)
  window.addEventListener('pageshow', () => setLanguageVisuals(getCurrentLang()));
});