document.addEventListener('DOMContentLoaded', () => {
  initElementsManipulation();
  initFooterDate();
  initAccordionMore();
  initRulesTabs();
});

/* Маніпуляція елементами
   1) Знаходить елементи за класом (.service-card, .stat-item) і змінює їм стилі.
   2) Додає новий елемент <p> із графіком роботи клубу у кінець <main>.
*/
function initElementsManipulation() {
  // На index.html це картки послуг (.service-card), на about.html — статистичні картки (.stat-item)
  const targetElements = document.querySelectorAll('.service-card, .stat-item');

  targetElements.forEach((el) => {
    el.style.backgroundColor = '#F5EBDF';
    el.style.borderBottom = '4px solid #8D86C9';
    el.style.transition = 'background-color 0.3s ease, border-color 0.3s ease';
  });

  // Додаємо <p> із графіком роботи клубу в кінець <main>
  const mainContainer = document.querySelector('main');
  const isAdminPage =
    window.location.pathname.includes('admin_login') ||
    window.location.pathname.includes('admin_dashboard');

  if (mainContainer && !isAdminPage) {
    const scheduleParagraph = document.createElement('p');
    scheduleParagraph.className = 'club-schedule-info';
    scheduleParagraph.textContent =
      'Графік роботи клубу «Racquet»: щодня з 07:00 до 22:00 (без вихідних).';

    scheduleParagraph.style.backgroundColor = '#F5EBDF';
    scheduleParagraph.style.color = '#1E1E24';
    scheduleParagraph.style.padding = '14px 20px';
    scheduleParagraph.style.margin = '24px auto';
    scheduleParagraph.style.maxWidth = '1200px';
    scheduleParagraph.style.borderRadius = '8px';
    scheduleParagraph.style.textAlign = 'center';
    scheduleParagraph.style.fontWeight = '700';

    mainContainer.append(scheduleParagraph);
  }
}

/* Автоматичне виведення поточної дати у <footer> */
function initFooterDate() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  const formattedDate = new Date().toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const dateParagraph = document.createElement('p');
  dateParagraph.className = 'footer-date';
  dateParagraph.textContent = `Поточна дата: ${formattedDate}`;
  dateParagraph.style.textAlign = 'center';
  dateParagraph.style.marginTop = '8px';
  dateParagraph.style.color = '#555555';
  dateParagraph.style.fontSize = '14px';

  footer.append(dateParagraph);
}

/* Кнопка «Показати більше» (акордеон) на about.html */
function initAccordionMore() {
  const toggleBtn = document.getElementById('toggle-more-btn');
  const moreTextBlock = document.getElementById('club-more-text');

  if (!toggleBtn || !moreTextBlock) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = moreTextBlock.classList.toggle('visually-hidden');
    toggleBtn.textContent = isHidden ? 'Показати більше' : 'Приховати';
    toggleBtn.setAttribute('aria-expanded', String(!isHidden));
  });
}

/* Перемикання вкладок у розділі «Правила» на about.html */
function initRulesTabs() {
  const tabButtons = document.querySelectorAll('.rules-tabs-nav .tab-link');
  const tabPanels = document.querySelectorAll('.rules-panels .tab-panel');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetPanelId = button.getAttribute('aria-controls');

      tabButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      tabPanels.forEach((panel) => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
          panel.classList.remove('visually-hidden');
        } else {
          panel.classList.remove('active');
          panel.classList.add('visually-hidden');
        }
      });
    });
  });
}
