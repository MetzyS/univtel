let btnPrev = document.querySelector('#prev');
let btnNext = document.querySelector('#next');
let firstSlide = document.querySelector('.localisation-first');
let secondSlide = document.querySelector('.localisation-second');
let body = document.querySelector('body');

let btnContact = document.querySelector('.btn-contact');
let btnContactHeader = document.querySelector('.btn-contact-tab');


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


/**
 * Crée les élements HTML pour le formulaire de contact et les insère dans le DOM
 */
function createModal() {
    /* Création du formulaire de contact */
    let modalContainer = document.createElement('div');
    let modal = document.createElement('div');
    let modalBtnClose = document.createElement('button');
    let modalForm = document.createElement('form');
    let modalTitle = document.createElement('p');
    let modalLabelEmail = document.createElement('label');
    let modalInputEmail = document.createElement('input');
    let modalLabelSelect = document.createElement('label');
    let modalSelect = document.createElement('select');
    let modalFirstOption = document.createElement('option');
    let modalSecondOption = document.createElement('option');
    let modalThirdOpion = document.createElement('option');
    let modalLabelTextArea = document.createElement('label');
    let modalInputTextArea = document.createElement('textarea');
    let modalBtnWrapper = document.createElement('div');
    let modalBtnReset = document.createElement('input');
    let modalBtnSubmit = document.createElement('input');


    /* Ajout des styles et attributs modal */
    modalContainer.classList.add('modal-container');
    modal.classList.add('modal');
    modalBtnClose.classList.add('close-modal');
    modalForm.classList.add('form');
    modalBtnWrapper.classList.add('modal-wrapper')
    modalTitle.textContent = 'Formulaire de contact';
    // modalLabelName.classList.add('form-label')
    modalLabelEmail.classList.add('form-label')
    modalLabelSelect.classList.add('form-label')
    modalLabelTextArea.classList.add('form-label')

    modalBtnClose.setAttribute('type', 'button');
    modalBtnClose.textContent = 'X';

    modalForm.setAttribute('method', 'POST');
    modalForm.setAttribute('action', 'traitement/contact.php');

    // modalLabelName.textContent = 'Votre nom';
    // modalInputName.setAttribute('type', 'text');
    // modalInputName.setAttribute('name', 'name');
    // modalInputName.setAttribute('placeholder', 'Nom...');
    // modalInputName.id = 'name';

    modalLabelEmail.textContent = 'Votre adresse email';
    modalInputEmail.setAttribute('type', 'email');
    modalInputEmail.setAttribute('name', 'email');
    modalInputEmail.setAttribute('maxlength', '90');
    modalInputEmail.setAttribute('placeholder', 'exemple@mail.com');
    modalInputEmail.id = 'email';

    modalLabelSelect.textContent = 'Sujet de la demande';
    modalSelect.setAttribute('name', 'subject');
    modalSelect.id = 'subject';

    modalFirstOption.setAttribute('value', '1');
    modalFirstOption.textContent = 'Demande de devis';
    modalSecondOption.setAttribute('value', '2');
    modalSecondOption.textContent = "Demande d'informations";
    modalThirdOpion.setAttribute('value', '3');
    modalThirdOpion.textContent = 'Autre, précisez dans le message';

    modalLabelTextArea.textContent = 'Votre message';

    modalInputTextArea.setAttribute('name', 'message');
    modalInputTextArea.setAttribute('placeholder', 'Ecrivez votre message ici...');
    modalInputTextArea.setAttribute('cols', '10');
    modalInputTextArea.setAttribute('rows', '8');
    modalInputTextArea.setAttribute('maxlength', '500');
    modalInputTextArea.id = 'message';

    modalBtnReset.setAttribute('type', 'reset');
    modalBtnReset.setAttribute('value', 'Effacer');
    modalBtnSubmit.setAttribute('type', 'submit');
    modalBtnSubmit.setAttribute('value', 'Envoyer');


    /* Ajout 'for' label */
    // modalLabelName.htmlFor = 'name';
    modalLabelEmail.htmlFor = 'email';
    modalLabelSelect.htmlFor = 'subject';
    modalLabelTextArea.htmlFor = 'message';

    /* Insertion des élements */
    body.prepend(modalContainer);
    modalContainer.appendChild(modal);
    modal.append(modalBtnClose, modalForm);
    // modalForm.append(modalTitle, modalLabelName, modalInputName, modalLabelEmail, modalInputEmail, modalLabelSelect, modalSelect, modalLabelTextArea, modalInputTextArea, modalBtnWrapper);
    modalForm.append(modalTitle, modalLabelEmail, modalInputEmail, modalLabelSelect, modalSelect, modalLabelTextArea, modalInputTextArea, modalBtnWrapper);
    modalSelect.append(modalFirstOption, modalSecondOption, modalThirdOpion);
    modalBtnWrapper.append(modalBtnReset, modalBtnSubmit);

    modalBtnClose.addEventListener('click', e => {
        modalContainer.remove();
    })
}


/* Event Listener boutons contact */
btnContact.addEventListener('click', e => {
    createModal();
})

btnContactHeader.addEventListener('click', e => {
    createModal();
})