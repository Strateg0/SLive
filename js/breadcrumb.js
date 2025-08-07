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
      'organizational': 'Организационна оценка и планиране на подобрения',
      'analyze': 'Консолидиран анализ на организационното състояние на Министерство на отбраната',
      'actual_standarts': 'Актуализирани стандарти за провеждане на граждански консултации',
      'nfk': 'Анализ и оценка на въздействието на действащото законодателство за НФК',
      'impact_assessment': 'Проекти МС регулации, МЕУ Оценка на въздействието на Закон за данните, НФК Оценка на въздействието на действащото законодателство',
      'preliminary': 'Цялостна предварителна оценка на въздействието във връзка с регулиране на основни икономически сектори',
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
    'consulting_services.html': ['home', 'sectors', 'consulting_services'],
    'organizational.html': ['home', 'sectors', 'organizational'],
    'analyze.html': ['home', 'offer', 'analyze'],
    'actual_standarts.html': ['home', 'offer', 'actual_standarts'],
    'nfk.html': ['home', 'offer', 'nfk'],
    'impact_assessment.html': ['home', 'offer', 'impact_assessment'],
    'preliminary.html': ['home', 'offer', 'preliminary'],

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
        offer:'offer.html',
        sectors: 'sectors.html',
        structural_reform: 'structural_reform.html',
        NAMRB: 'NAMRB.html',
        consulting_services: 'consulting_services.html',
        organizational: 'organizational.html',
        analyze: 'analyze.html',
        actual_standarts: 'actual_standarts.html',
        nfk: 'nfk.html',
        impact_assessment: 'impact_assessment.html',
        preliminary: 'impact_assessment.html'
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
