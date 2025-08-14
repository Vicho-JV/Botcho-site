// Language switcher that cooperates with func.js
// If func.js doesn't toggle localStorage('lang'), we do it as a fallback.
document.addEventListener('DOMContentLoaded', () => {
  const toggleLink = document.getElementById('langToggle');

  function getCurrentLang() {
    return localStorage.getItem('lang') || localStorage.getItem('siteLang') || 'bg';
  }

  function renderFlagLabel(lang) {
    // Use emoji flags as a safe fallback if no <img> is injected by func.js
    if (!toggleLink) return;
    const hasImg = !!toggleLink.querySelector('img');
    if (!hasImg) {
      toggleLink.innerHTML = (lang === 'en') ? '🇬🇧 EN' : '🇧🇬 BG';
    }
    toggleLink.setAttribute('aria-label', lang === 'en' ? 'Switch to Bulgarian' : 'Превключи на английски');
  }

  function setLanguageVisuals(lang) {
    const showBG = (lang !== 'en');
    document.querySelectorAll('.lang-bg').forEach(el => el.style.display = showBG ? '' : 'none');
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = showBG ? 'none' : '');
    document.documentElement.lang = showBG ? 'bg' : 'en';
    // Placeholders / titles (only if elements exist on the current page)
    const chatInput = document.getElementById('userInput');
    if (chatInput) chatInput.placeholder = showBG ? 'Попитайте каквото желаете' : 'Ask anything you want';
    const sendBtnEl = document.getElementById('sendBtn'); if (sendBtnEl) sendBtnEl.title = showBG ? 'Изпрати' : 'Send';
    const micBtnEl  = document.getElementById('micBtn');  if (micBtnEl)  micBtnEl.title  = showBG ? 'Говори'  : 'Speak';
    const bookBtnEl = document.getElementById('bookBtn'); if (bookBtnEl) bookBtnEl.title = showBG ? 'Запази час' : 'Book Appointment';
    const customInput = document.getElementById('customInput');
    if (customInput) customInput.placeholder = showBG ? 'Напиши съобщение...' : 'Type a message...';
    renderFlagLabel(showBG ? 'bg' : 'en');
  }

  // Initial render based on stored preference
  setLanguageVisuals(getCurrentLang());

  // Click handling: let func.js run; if it didn't toggle, we will.
  if (toggleLink) {
    toggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      const before = getCurrentLang();
      setTimeout(() => {
        const after = getCurrentLang();
        if (after === before) {
          // func.js didn’t change it — flip ourselves
          const flipped = (before === 'en') ? 'bg' : 'en';
          localStorage.setItem('lang', flipped);
        }
        setLanguageVisuals(getCurrentLang());
      }, 0);
    });
  }

  // Resync when navigating back to this page
  window.addEventListener('pageshow', () => setLanguageVisuals(getCurrentLang()));
});