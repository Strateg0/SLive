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

  // Update ALL flags
  const flagSpans = document.querySelectorAll('.currentFlag');
  flagSpans.forEach(flagSpan => {
    Object.values(flagMap).forEach(cls => flagSpan.classList.remove(cls));
    flagSpan.classList.add(flagMap[lang]);
  });

  // Update ALL elements with data-i18n
  fetch('./js/lang.json')
    .then(res => res.json())
    .then(translations => {
      // Update all data-i18n elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang]?.[key] || key;
      });

      // ✅ Update breadcrumbs ONLY if it exists
      const breadcrumb = document.getElementById('breadcrumb');
      if (breadcrumb) {
        renderBreadcrumb(lang, translations);
      }

    // ✅ Update images for this lang
      document.querySelectorAll('img[data-img-bg]').forEach(img => {
        const newSrc = img.getAttribute(`data-img-${lang}`);
        if (newSrc) img.src = newSrc;
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
