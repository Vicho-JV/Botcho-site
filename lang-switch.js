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

   // Don't touch the flag icon here; func.js manages it.
// Optional: keep an accessible label on the link.
if (toggleLink) {
  toggleLink.setAttribute('aria-label', showBG ? 'Switch to English' : 'Превключи на български');
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

    const before = (localStorage.getItem('lang') || localStorage.getItem('siteLang') || 'bg');

    // 1) Flip the flag here (so we don't depend on func.js to toggle it)
    const after = (before === 'en') ? 'bg' : 'en';
    localStorage.setItem('lang', after);           // your key
    localStorage.setItem('siteLang', after);       // legacy/other pages

    // 2) If func.js is alive, let it translate all [data-key] text
    if (typeof window.applyLanguage === 'function') {
      try { window.applyLanguage(after); } catch (_) {}
    }

    // 3) Always sync visuals (.lang-bg/.lang-en, <html lang>, titles/placeholders)
    setLanguageVisuals(after);

    // 4) (Optional) if the button uses flag+text injected by func.js, refresh it
    if (!flagIcon) flagIcon = toggleLink.querySelector('img');
  });
}

  // Also resync when returning to this page (e.g., from another page that changed the lang)
  window.addEventListener('pageshow', () => setLanguageVisuals(getCurrentLang()));
});