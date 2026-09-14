// Collapses the primary navigation behind a button on narrow screens.
// The stylesheet decides at which width the button appears; this only tracks open state.
(function () {
    'use strict';

    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    function setOpen(open) {
        links.toggleAttribute('data-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        toggle.firstElementChild.textContent = open ? '✕' : '☰';
    }

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    // Following a link and pressing Escape both leave the menu closed for the next page.
    links.addEventListener('click', (event) => {
        if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setOpen(false);
    });
}());
