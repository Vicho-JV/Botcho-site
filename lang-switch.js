// Language switcher script with localStorage support

document.addEventListener('DOMContentLoaded', () => {
  // Helper function to set language
  function setLanguage(lang) {
    if (lang === 'en') {
      document.querySelectorAll('.lang-bg').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.lang-en').forEach(el => el.style.display = '');
      flagIcon.src = 'flag-bg.png';
      flagIcon.alt = 'Bulgarian';
      document.documentElement.lang = 'en';
    } else {
      document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.lang-bg').forEach(el => el.style.display = '');
      flagIcon.src = 'flag-en.png';
      flagIcon.alt = 'English';
      document.documentElement.lang = 'bg';
    }
    // Update placeholder text for chatbot input if present
    const chatInput = document.getElementById('userInput');
    if (chatInput) {
      chatInput.placeholder = (lang === 'en') ? 'Ask anything you want' : 'Попитайте каквото желаете';
    }
    localStorage.setItem('siteLang', lang);
    currentLang = lang;
  }

  let currentLang = localStorage.getItem('siteLang') || 'bg';
  const toggleLink = document.getElementById('langToggle');
  const flagIcon = toggleLink.querySelector('img');

  // Apply saved language preference on page load
  setLanguage(currentLang);

  // Toggle language on click
  toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    setLanguage(currentLang === 'bg' ? 'en' : 'bg');
  });
});