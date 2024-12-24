'use strict';

import getReviews from './goit-reviewsAPI.js';
import iziToast from 'izitoast';
import Swiper from 'swiper';
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules';

const cards = document.querySelector('.cards');

loadReviews();

const swiperRev = new Swiper('.reviews .swiper', {
    modules: [Navigation, Keyboard, Mousewheel],
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    loop: false,
    grabCursor: true,
    navigation: {
        nextEl: '.arrows .swiper-button-next',
        prevEl: '.arrows .swiper-button-prev',
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    mousewheel: true,

    on: {
        slideChange: function () {
            const prev = document.querySelector('.swiper-button-prev');
            const next = document.querySelector('.swiper-button-next');

            prev.disabled = swiperRev.isBeginning;
            next.disabled = swiperRev.isEnd;

            prev.classList.toggle(
                'swiper-button-disabled',
                swiperRev.isBeginning
            );
            next.classList.toggle('swiper-button-disabled', swiperRev.isEnd);
        },
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 16,
        },
        1440: {
            slidesPerView: 4,
            spaceBetween: 16,
        },
    },
});

async function loadReviews() {
    try {
        const result = await getReviews();
        cards.insertAdjacentHTML('beforeend', createMarkup(result));
    } catch (error) {
        iziToast.error({
            message: `Error: ${error.message}`,
            position: 'bottomRight',
        });
        cards.innerHTML = '<h2>Not found</h2>';
    }
}

function createMarkup(arr) {
    return arr
        .map(
            ({ author, avatar_url, review }) =>
                `<li class="swiper-slide review-card"><img  loading="lazy" src="${avatar_url}" class="review-card-img"><h3 class="card-title">${author}</h3><p class="card-paragraph">${review}</p></li>`
        )
        .join('');
}
