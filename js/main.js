document.addEventListener('DOMContentLoaded', () => {
  initElementsManipulation();
  initFooterDate();
  initAccordionMore();
  initRulesTabs();
});

/**
 * Маніпуляція елементами:
 * 1) Додаємо тінь на картки тренерів (.trainer-card) і бульбашки запитань у «Дитячому тенісі».
 * 2) Розміщуємо заголовок «Поширені питання» по центру.
 * 3) Додаємо новий елемент <p> із графіком роботи клубу у кінець <main>.
 */
function initElementsManipulation() {
  const cardsWithShadow = document.querySelectorAll(
    '.trainer-card, .faq-item, .faq-card, .faq-bubble, .question-card'
  );
  cardsWithShadow.forEach((card) => {
    card.style.boxShadow = '0 8px 20px rgba(30, 30, 36, 0.12)';
    card.style.transition = 'box-shadow 0.25s ease';
  });

  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach((heading) => {
    if (heading.textContent.trim() === 'Поширені питання') {
      heading.style.textAlign = 'center';
    }
  });

  const mainContainer = document.querySelector('main');
  const isAdminPage =
    window.location.pathname.includes('admin_login') ||
    window.location.pathname.includes('admin_dashboard');

  if (mainContainer && !isAdminPage) {
    const scheduleParagraph = document.createElement('p');
    scheduleParagraph.className = 'club-schedule-info';
    scheduleParagraph.textContent =
      'Графік роботи клубу «Racquet»: щодня з 08:00 до 21:00 (без вихідних).';

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

/**
 * Автоматичне виведення поточної дати у <footer>
 */
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

/**
 * Кнопка «Показати більше» / «Приховати» (акордеон) на about.html
 */
function initAccordionMore() {
  const toggleBtn = document.getElementById('toggle-more-btn');
  const moreTextBlock = document.getElementById('club-more-text');

  if (!toggleBtn || !moreTextBlock) return;

  toggleBtn.style.display = 'block';
  toggleBtn.style.width = 'fit-content';
  toggleBtn.style.marginLeft = 'auto';

  toggleBtn.addEventListener('click', () => {
    const isHidden = moreTextBlock.classList.toggle('visually-hidden');
    toggleBtn.textContent = isHidden ? 'Показати більше' : 'Приховати';
    toggleBtn.setAttribute('aria-expanded', String(!isHidden));
  });
}

/**
 * Перемикання вкладок у розділі «Правила» на about.html
 */
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
