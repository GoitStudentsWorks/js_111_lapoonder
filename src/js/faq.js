'use strict';

import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const accordion = new Accordion('.accordion-container', { showMultiple: true });

const arrows = document.querySelectorAll('.faq-ac-trigger');

for (const arrow of arrows) {
    arrow.addEventListener('click', changeDirectionArrow);
}

function changeDirectionArrow(e) {
    const arrowDown = e.currentTarget.querySelector('.faq-arrow-down');
    const arrowUp = e.currentTarget.querySelector('.faq-arrow-up');
    if (e.currentTarget.getAttribute('aria-expanded') === 'true') {
        arrowDown.classList.add('visually-hidden');
        arrowUp.classList.remove('visually-hidden');
    } else if (e.currentTarget.getAttribute('aria-expanded') === 'false') {
        arrowDown.classList.remove('visually-hidden');
        arrowUp.classList.add('visually-hidden');
    }
}
