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
        })

        .catch(function (err) {
            console.log(err);
        })
}

/**
 * Crée la modale de prise de contact
 */
function createModal() {
    let modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    var html = `
        <div class="modal">
            <button class="close-modal" type="button">X</button>
            <form class="form" method="POST" action="/www/univtel/app/views/home/processing/contact.php">
                <p>Formulaire de contact</p>
                <label class="form-label" for="email">Votre adresse email</label>
                <input type="email" name="email" class="input-mail" maxlength="90" required="" placeholder="exemple@mail.com" pattern="^[w-.]+@([w-]+.)+[w-]{2,4}$" id="email">
                <label class="form-label" for="subject">Sujet de la demande</label>
                <select name="subject" id="subject">
                    <option value="1">Demande de devis</option>
                    <option value="2">Demande d'informations</option>
                    <option value="3">Autre, précisez dans le message</option>
                </select>
                <label class="form-label" for="message">Votre message</label>
                <textarea name="message" placeholder="Ecrivez votre message ici..." cols="10" rows="3" maxlength="500" required="" id="message"></textarea>
                <div class="policy-wrapper">
                    <input type="checkbox" value="policy" name="policy" required="">
                    <label class="confidentialite-text" for="policy">En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre de la demande de contact et de la relation commerciale qui peut en découler.</label>
                </div>
                <div class="modal-wrapper">
                    <input type="reset" value="Effacer">
                    <input type="submit" id="submit" value="Envoyer" disabled="">
                </div>
            </form>
        </div>
    `;

    modalContainer.innerHTML = html;
    body.prepend(modalContainer);

    let modalBtnClose = document.querySelector('.close-modal');
    modalBtnClose.addEventListener('click', e => {
        modalContainer.remove();
    })

    let modalInputEmail = document.querySelector('.input-mail');
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
            <span class="detail-title">Sujet :</span>
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
            let btnRead = document.getElementById(msgId);
            if (btnRead.classList.contains('unread')) {
                btnRead.classList.remove('unread');
                btnRead.classList.add('read');
            }
            let spanUnread = document.querySelector('.messages-unread-nb');
            if (spanUnread) {
                let nbUnread = spanUnread.textContent;
                if (nbUnread) {
                    nbUnread -= 1;
                    spanUnread.textContent = nbUnread;
                }
            }
        })
    })
}