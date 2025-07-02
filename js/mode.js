
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleDesk = document.getElementById('themeToggleDesk');
  const logo = document.getElementById('logo');
  const body = document.body;

  const icon = themeToggle?.querySelector('.icon');
  const iconDesk = themeToggleDesk?.querySelector('.icon');

  function setTheme(mode) {
    if (mode === 'dark') {
      body.classList.add('dark-mode');
      if (icon) icon.textContent = '☀️';
      if (iconDesk) iconDesk.textContent = '☀️';
      logo.src = './img/logo.png';
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      if (icon) icon.textContent = '🌙';
      if (iconDesk) iconDesk.textContent = '🌙';
      logo.src = './img/logo.png';
      localStorage.setItem('theme', 'light');
    }
  }

  function toggleTheme() {
    const isDark = body.classList.contains('dark-mode');

    // Animate icons out
    if (icon) icon.style.transform = 'scale(0)';
    if (iconDesk) iconDesk.style.transform = 'scale(0)';

    setTimeout(() => {
      setTheme(isDark ? 'light' : 'dark');

      // Animate icons in
      if (icon) icon.style.transform = 'scale(1)';
      if (iconDesk) iconDesk.style.transform = 'scale(1)';
    }, 150);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (themeToggleDesk) {
    themeToggleDesk.addEventListener('click', toggleTheme);
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

