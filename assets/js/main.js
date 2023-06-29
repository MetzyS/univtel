let btnPrev = document.querySelector('#prev');
let btnNext = document.querySelector('#next');
let firstSlide = document.querySelector('.localisation-first');
let secondSlide = document.querySelector('.localisation-second');
let body = document.querySelector('body');

let btnContact = document.querySelector('.btn-contact');
let btnContactHeader = document.querySelector('.btn-contact-tab');

let msgOpenIcon = document.querySelector('.messages-open-icon');
let msgGrid = document.querySelector('.messages-grid');
let msgRow = document.querySelectorAll('.message-grid-row');
let msgContactMail = document.querySelectorAll('.contact-mail');

let subMenuBtn = document.querySelectorAll('.default-btn');


/* Conditions d'affichage du caroussel */
if (firstSlide) {
    window.addEventListener('load', function () {
        if (window.innerWidth > 650) {
            removeHideSlide(firstSlide);
            removeHideSlide(secondSlide);
        } else {
            addHideSlide(secondSlide);
        }
    })
}

if (firstSlide) {
    window.addEventListener('resize', (e) => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 650) {
            removeHideSlide(firstSlide);
            removeHideSlide(secondSlide);
        } else {
            addHideSlide(secondSlide);
        }
    })
}



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

if (btnPrev) {
    btnPrev.addEventListener('click', e => {
        toggleHideSlide(firstSlide);
        toggleHideSlide(secondSlide);
    })
}

if (btnNext) {
    btnNext.addEventListener('click', e => {
        toggleHideSlide(firstSlide);
        toggleHideSlide(secondSlide);
    })
}

/**
 * Requête AJAX pour récupérer infos message via ID
 * @param {string} pathUrl 
 * @param {string} method 
 * @returns {json}
 */
function messageFetch(pathUrl, method = 'GET') {
    return fetch(pathUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })

        .then(function (data) {
            messageTemplate(data);
            // console.log(data);
        })

        .catch(function (err) {
            console.log(err);
        })
}


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
    let modalConfidentialiteWrapper = document.createElement('div');
    let modalConfidentialiteLabel = document.createElement('label');
    let modalConfidentialiteInput = document.createElement('input');


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
    modalConfidentialiteWrapper.classList.add('policy-wrapper');

    modalBtnClose.setAttribute('type', 'button');
    modalBtnClose.textContent = 'X';

    modalForm.setAttribute('method', 'POST');
    modalForm.setAttribute('action', '/www/univtel/app/views/home/processing/contact.php');

    modalLabelEmail.textContent = 'Votre adresse email';
    modalInputEmail.setAttribute('type', 'email');
    modalInputEmail.setAttribute('name', 'email');
    modalInputEmail.setAttribute('maxlength', '90');
    modalInputEmail.setAttribute('required', '');
    modalInputEmail.setAttribute('placeholder', 'exemple@mail.com');
    modalInputEmail.setAttribute('pattern', '^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
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
    modalInputTextArea.setAttribute('rows', '3');
    modalInputTextArea.setAttribute('maxlength', '500');
    modalInputTextArea.setAttribute('required', '');
    modalInputTextArea.id = 'message';

    modalBtnReset.setAttribute('type', 'reset');
    modalBtnReset.setAttribute('value', 'Effacer');
    modalBtnSubmit.setAttribute('type', 'submit');
    modalBtnSubmit.id = 'submit';
    modalBtnSubmit.setAttribute('value', 'Envoyer');
    modalBtnSubmit.setAttribute('disabled', '');

    modalConfidentialiteInput.setAttribute('type', 'checkbox');
    modalConfidentialiteInput.setAttribute('value', 'policy');
    modalConfidentialiteInput.setAttribute('name', 'policy');
    modalConfidentialiteInput.setAttribute('required', '');
    modalConfidentialiteLabel.classList.add('confidentialite-text');
    modalConfidentialiteLabel.textContent = "En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre de la demande de contact et de la relation commerciale qui peut en découler.";


    /* Ajout 'for' label */
    // modalLabelName.htmlFor = 'name';
    modalLabelEmail.htmlFor = 'email';
    modalLabelSelect.htmlFor = 'subject';
    modalLabelTextArea.htmlFor = 'message';
    modalConfidentialiteLabel.htmlFor = 'policy';

    /* Insertion des élements */
    body.prepend(modalContainer);
    modalContainer.appendChild(modal);
    modal.append(modalBtnClose, modalForm);
    modalConfidentialiteWrapper.append(modalConfidentialiteInput, modalConfidentialiteLabel);
    // modalForm.append(modalTitle, modalLabelName, modalInputName, modalLabelEmail, modalInputEmail, modalLabelSelect, modalSelect, modalLabelTextArea, modalInputTextArea, modalBtnWrapper);
    modalForm.append(modalTitle, modalLabelEmail, modalInputEmail, modalLabelSelect, modalSelect, modalLabelTextArea, modalInputTextArea, modalConfidentialiteWrapper, modalBtnWrapper);
    modalSelect.append(modalFirstOption, modalSecondOption, modalThirdOpion);
    modalBtnWrapper.append(modalBtnReset, modalBtnSubmit);

    modalBtnClose.addEventListener('click', e => {
        modalContainer.remove();
    })

    modalInputEmail.addEventListener('input', e => {
        let submitBtn = document.querySelector('#submit');
        if (modalInputEmail.value.match(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,5})$/)) {
            modalInputEmail.classList.remove('input-error');
            submitBtn.disabled = false;
        } else {
            modalInputEmail.classList.add('input-error');
            submitBtn.disabled = true;
        }
    })
}

/**
 * Template submenu status messages (lu, non lu, traîté, supprimer)
 * @param {int} id 
 * @param {HTMLElement} HTMLElement 
 */
function subMenuTemplate(id, HTMLElement) {
    const html = `
    <ul class="submenu-list">
        <li class="submenu-item">
            <a href="/www/univtel/message/changeStatus/${id}/read" class="read-${id}">
                <span>Lu</span>
                <span class="read"></span>
            </a>
        </li>
        <li class="submenu-item">
            <a href="/www/univtel/message/changeStatus/${id}/unread" class="unread-${id}">
                <span>Non lu</span>
                <span class="unread"></span>
            </a>
        </li>
        <li class="submenu-item">
            <a href="/www/univtel/message/changeStatus/${id}/answered" class="ok-${id}">
                <span>Traîté</span>
                <span class="answered"></span>
            </a>
        </li>
        <li class="submenu-delete">
            <button type="button" id="delete-${id}" class="delete-btn">
                <span class="delete">Supprimer</span>
            </button>
        </li>
    </ul>
    `;

    let subMenuContainer = document.createElement('div');
    subMenuContainer.classList.add('submenu');
    subMenuContainer.innerHTML = html;
    HTMLElement.append(subMenuContainer);


    const deleteModalHtml = `
    <p class="delete-modal-text">Voulez-vous vraiment supprimer ce message ?</p>
    <div class="delete-btn-wrapper">
        <a href="/www/univtel/message/deleteMessage/${id}" class="btn-confirm-delete">Oui</a>
        <button type="button" class="btn-close-delete">Non</button>
    </div>
    `;

    let deleteModal = document.createElement('div');
    deleteModal.classList.add('delete-modal');
    deleteModal.classList.add('focus');
    deleteModal.innerHTML = deleteModalHtml;


    let subMenuItemDelete = document.querySelector('.submenu-delete');
    subMenuItemDelete.addEventListener('click', e => {
        let section = document.querySelector('section');
        let header = document.querySelector('header');
        let footer = document.querySelector('footer');
        section.classList.add('blur');
        header.classList.add('blur');
        footer.classList.add('blur');
        document.body.insertBefore(deleteModal, document.body.firstChild);

        let deleteModalClose = document.querySelector('.btn-close-delete');
        deleteModalClose.addEventListener('click', e => {
            deleteModal.remove();
            section.classList.remove('blur');
            header.classList.remove('blur');
            footer.classList.remove('blur');
        })
    })
}


/**
 * Template affichage message
 * @param {JSON} msgJson 
 */
function messageTemplate(msgJson) {
    const html = `
        <button class="close-msg">X</button>
        <div class="detail-grid">
            <span class="detail-title">Email :</span>
            <span>${msgJson['mail']}</span>
        </div>
        <div class="detail-grid">
            <span class="detail-title">Date :</span>
            <span>${msgJson['sent_at']}</span>
        </div>
        <div class="detail-grid">
            <span>Sujet :</span>
            <span>${msgJson['subject']}</span>
        </div>
        <p class="detail-msg">${decodeURIComponent(msgJson['message'])}</p>
        <div class="reply-container">
            <button class="reply-btn">Répondre</button>
        </div>
    `;
    let modal = document.createElement('div');
    modal.classList.add('msg-modal');
    modal.classList.add('margin');



    modal.innerHTML = html;
    let footer = document.querySelector('footer');
    let sectionMessage = document.querySelector('.messages');
    sectionMessage.classList.toggle('none');
    body.insertBefore(modal, footer);


    let msgClose = document.querySelector('.close-msg')
    msgClose.addEventListener('click', e => {
        msgClose.parentNode.remove();
        sectionMessage.classList.toggle('none')
    })
}


/* Event Listener => boutons contact (page d'accueil) */
if (btnContact) {
    btnContact.addEventListener('click', e => {
        createModal();
    })
}
if (btnContactHeader) {
    btnContactHeader.addEventListener('click', e => {
        createModal();
    })
}

/* Event Listener => dérouler la liste des messages (page messages) */
if (msgOpenIcon) {
    msgOpenIcon.addEventListener('click', e => {
        msgOpenIcon.classList.toggle('icon-rotate');
        msgGrid.classList.toggle('none');
    })
}

/* Event Listener => menu message (lu, non lu, supprimer..) */
if (subMenuBtn) {
    subMenuBtn.forEach((element, index) => {
        let btn = subMenuBtn[index];
        messageId = btn.parentElement.id.replace(/\D/g, "");
        btn.id = messageId;
        btn.addEventListener('click', e => {
            let subMenu = document.querySelectorAll('.submenu');
            if (subMenu) {
                for (let x = 0; x < subMenu.length; x++) {
                    subMenu[x].remove();
                }
            }
            // createSubMenu(btn.id, btn.parentElement);
            subMenuTemplate(btn.id, btn.parentElement);
        })
    });
    document.addEventListener('click', e => {
        let isInArray = false;
        for (let i = 0; i < subMenuBtn.length; i++) {
            if (subMenuBtn[i] == e.target) {
                isInArray = true;
                break;
            }
        }
        if (!isInArray) {
            let subMenu = document.querySelectorAll('.submenu');
            if (subMenu) {
                for (let x = 0; x < subMenu.length; x++) {
                    subMenu[x].remove();
                }
            }
        }
    })
}

if (msgContactMail) {
    msgContactMail.forEach(element => {
        element.addEventListener('click', e => {
            let msgId = element.parentElement.id.replace('message-', '');
            messageFetch('http://localhost/www/univtel/app/views/message/processing/message.php?id=' + msgId);

            // Changement statut 'non-lu' => 'lu'
            btnRead = document.getElementById(msgId);
            if (btnRead.classList.contains('unread')) {
                btnRead.classList.remove('unread');
                btnRead.classList.add('read');
            }
        })
    })
}