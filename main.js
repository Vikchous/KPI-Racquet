
document.addEventListener('DOMContentLoaded', function () {

    /* 1. Бургер-меню */
    var navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        document.querySelectorAll('.main-nav a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.checked = false;
            });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') navToggle.checked = false;
        });
    }

    /* 2. Каруселі */
    var arrows = document.querySelectorAll('.carousel-btn, .carousel-arrow');
    arrows.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var scope = btn.closest('.services-block, section');
            if (!scope) return;
            var track = scope.querySelector('.trainers-track, .services-track, .carousel-track');
            if (!track || !track.firstElementChild) return;

            var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
            var step = track.firstElementChild.getBoundingClientRect().width + gap;
            var isPrev = btn.classList.contains('prev-btn') || btn.classList.contains('prev');
            var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
            var atStart = track.scrollLeft <= 2;

            if (!isPrev && atEnd) {
                track.scrollTo({ left: 0 });               // з останньої — на початок
            } else if (isPrev && atStart) {
                track.scrollTo({ left: track.scrollWidth }); // з першої — в кінець
            } else {
                track.scrollBy({ left: isPrev ? -step : step });
            }
        });
    });

    /* 3. Вкладки правил */
    var tabs = document.querySelectorAll('.rules-tabs-nav .tab-link');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) {
                var panel = document.getElementById(t.getAttribute('aria-controls'));
                var isCurrent = t === tab;
                t.classList.toggle('active', isCurrent);
                t.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
                if (panel) {
                    panel.classList.toggle('active', isCurrent);
                    panel.classList.toggle('visually-hidden', !isCurrent);
                }
            });
        });
    });
});
