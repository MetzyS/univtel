let btnPrev = document.querySelector('#prev');
let btnNext = document.querySelector('#next');
let firstSlide = document.querySelector('.localisation-first');
let secondSlide = document.querySelector('.localisation-second');

let btnContact = document.querySelector('.btn-contact');

/* Conditions d'affichage du caroussel */
window.addEventListener('load', function () {
    if (window.innerWidth > 650) {
        removeHideSlide(firstSlide);
        removeHideSlide(secondSlide);
    } else {
        addHideSlide(secondSlide);
    }
})

window.addEventListener('resize', (e) => {
    const windowWidth = window.innerWidth;
    if (windowWidth > 650) {
        removeHideSlide(firstSlide);
        removeHideSlide(secondSlide);
    } else {
        addHideSlide(secondSlide);
    }
})


/* Afficher/Masquer les Slides */
function toggleHideSlide(HTMLElement) {
    HTMLElement.classList.toggle('none');
}

function removeHideSlide(HTMLElement) {
    HTMLElement.classList.remove('none');
}

function addHideSlide(HTMLElement) {
    HTMLElement.classList.add('none');
}

btnPrev.addEventListener('click', e => {
    toggleHideSlide(firstSlide);
    toggleHideSlide(secondSlide);
})

btnNext.addEventListener('click', e => {
    toggleHideSlide(firstSlide);
    toggleHideSlide(secondSlide);
})


/* Création du formulaire de contact */

let form = document.createElement('form');
let inputName = document.createElement('input');
let inputMail = document.createElement('input');
let inputSelect = document.createElement('select');
let inputMessage = document.createElement('input');