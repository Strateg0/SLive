const translations = {
    en: {
      'home': 'Home',
      'sectors': 'Sectors',
      'aboutUs': 'About Us',
      'offer': 'What we offer',
      'new': 'News',
      'blog': 'Blog',
      'contact': 'Contacts',
    },
    es: {
      'home': 'Inicio',
      'sectors': 'Sectores',
      'about-us': 'Sobre Nosotros',
      'contact': 'Contacto',
    },
    bg: {
      'home': 'Начало',
      'sectors': 'Сектори',
      'aboutUs': 'За нас',
      'offer': 'Какво предлагаме',
      'new': 'Новости',
      'blog': 'Блог',
      'contact': 'Контакт',
      'structural_reform': 'Оценка на организационния модел на централната администрация на изпълнителната власт',
      'NAMRB': 'Примерни модели за административни структури на седем групи общини и проекти на документи за организационното им развитие',
      'consulting_services': 'Подобряване на ефективността и оптимизиране на структурата на администрацията на Министерството на външните работи',
    }
  };

 const lang = 'bg'; // 'en' or 'bg' as needed

  // breadcrumb trails for each page
  const breadcrumbMap = {
    'index.html': ['home'],
    'aboutUs.html': ['home', 'aboutUs'],
    'offer.html': ['home', 'offer'],
    'new.html': ['home', 'new'],
    'blog.html': ['home', 'blog'],
    'sectors.html': ['home', 'sectors'],
    'structural_reform.html': ['home', 'sectors', 'structural_reform'],
    'NAMRB.html': ['home', 'sectors', 'NAMRB'],
    'consulting_services.html': ['home', 'sectors', 'consulting_services']
  };

  const currentPath = window.location.pathname.split('/').pop();
  const trail = breadcrumbMap[currentPath];

  const breadcrumb = document.getElementById('breadcrumb');
  let html = `<ol class="breadcrumb-list">`; 

  if (trail && trail.length > 0) {
    trail.forEach((key, index) => {
      const label = translations[lang][key] || key;
      const isLast = index === trail.length - 1;

      const hrefMap = {
        home: 'index.html',
        sectors: 'sectors.html',
        structural_reform: 'structural_reform.html',
        NAMRB: 'NAMRB.html',
        consulting_services: 'consulting_services.html'
      };

      if (isLast) {
        html += `<li aria-current="page">${label}</li>`;
      } else {
        html += `<li><a href="${hrefMap[key]}">${label}</a></li>`;
      }
    });
  }

  html += `</ol>`;
  breadcrumb.innerHTML = html;
