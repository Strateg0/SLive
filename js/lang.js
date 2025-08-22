// let translations = {};
// let currentLang = localStorage.getItem('lang') || 'bg';

// function switchLang(lang) {
//   currentLang = lang;
//   localStorage.setItem('lang', lang);

//   fetch('../js/lang.json')
//     .then(res => res.json())
//     .then(data => {
//       translations = data;

//       // Update elements with data-i18n
//       document.querySelectorAll('[data-i18n]').forEach(el => {
//         const key = el.getAttribute('data-i18n');
//         el.textContent = translations[lang]?.[key] || key;
//       });

//       // Optional: simple list
//       const myList = document.getElementById('myList');
//       if (myList && translations[lang]?.myList) {
//         myList.innerHTML = '';
//         translations[lang].myList.forEach(item => {
//           const li = document.createElement('li');
//           li.textContent = item;
//           myList.appendChild(li);
//         });
//       }
//     })
//     .catch(err => console.error("Failed to load translations:", err));
// }

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.lang-option').forEach(item => {
//     item.addEventListener('click', e => {
//       e.preventDefault();
//       switchLang(e.currentTarget.getAttribute('data-lang'));
//     });
//   });

//   switchLang(currentLang);
// });



let currentLang = localStorage.getItem('lang') || 'bg';

const flagMap = {
  bg: 'fi-bg',
  en: 'fi-gb',
  es: 'fi-es',
  fr: 'fi-fr',
  hr: 'fi-hr'
};

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Update flag in dropdown button
  const flagSpan = document.getElementById('currentFlag');
  if (flagSpan) {
    // Remove previous flag classes
    Object.values(flagMap).forEach(cls => flagSpan.classList.remove(cls));
    // Add new flag class
    flagSpan.classList.add(flagMap[lang]);
  }

  // Update all elements with data-i18n
  fetch('../js/lang.json')
    .then(res => res.json())
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang]?.[key] || key;
      });
    })
    .catch(err => console.error('Failed to load translations:', err));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-option').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const lang = e.currentTarget.getAttribute('data-lang');
      switchLang(lang);
    });
  });

  switchLang(currentLang);
});
