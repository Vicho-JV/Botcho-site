// Language switcher script: toggles between Bulgarian and English text
document.addEventListener('DOMContentLoaded', () => {
  let currentLang = 'bg'; // current language state ('bg' or 'en'), default Bulgarian
  const toggleLink = document.getElementById('langToggle');
  const flagIcon = toggleLink.querySelector('img');

  // Toggle content language on icon click
  toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentLang === 'bg') {
      // Switch to English: hide Bulgarian text and show English text
      document.querySelectorAll('.lang-bg').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.lang-en').forEach(el => el.style.display = '');
      // Update flag icon to Bulgarian flag
      flagIcon.src = 'flag-bg.png';
      flagIcon.alt = 'Bulgarian';
      // Update page language attribute for accessibility
      document.documentElement.lang = 'en';
      currentLang = 'en';
    } else {
      // Switch to Bulgarian: hide English text and show Bulgarian text
      document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.lang-bg').forEach(el => el.style.display = '');
      // Update flag icon back to English flag
      flagIcon.src = 'flag-en.png';
      flagIcon.alt = 'English';
      // Update page language attribute
      document.documentElement.lang = 'bg';
      currentLang = 'bg';
    }
  });
});